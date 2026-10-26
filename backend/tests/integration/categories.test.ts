import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { prisma } from '../../src/shared/database/prisma-client';
import {
    createAuthenticatedUser,
    createTestBankAccount,
    createTestCategory,
    createTestTransaction,
    createTestUser,
} from '../factories';
import { Category, User } from '../../src/shared/entities';
import { buildTestServer } from '../helpers';
import { buildCreateCategoryDto } from '../builders';

describe('Categories Module', () => {
    const server = buildTestServer();
    let user: User, authHeader: string, category: Category;

    beforeEach(async () => {
        ({ user, authHeader } = await createAuthenticatedUser());
        category = await createTestCategory({}, user.id);
    });

    describe('GET /categories', () => {
        it('should return the authenticated user categories', async () => {
            const { status, body } = await request(server).get('/categories').set('Authorization', authHeader);

            expect(status).toBe(200);
            expect(body).toEqual([
                expect.objectContaining({
                    id: category.id,
                    name: category.name,
                }),
            ]);
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).get('/categories');

            expect(status).toBe(401);
        });
    });

    describe('POST /categories', () => {
        it('should create a category and return 201', async () => {
            const payload = buildCreateCategoryDto();

            const { status, body } = await request(server)
                .post('/categories')
                .send(payload)
                .set('Authorization', authHeader);
            const saved = await prisma.category.findUnique({ where: { id: body.id } });

            expect(status).toBe(201);
            expect(body).toMatchObject({
                name: payload.name,
            });
            expect(body.id).toEqual(expect.any(Number));
            expect(saved).not.toBeNull();
            expect(saved!.userId).toBe(user.id);
        });

        it('should return validation error when invalid data is provided', async () => {
            const payload = {
                name: '',
            };

            const { status, body } = await request(server)
                .post('/categories')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
        });

        it('should return unauthorized when no token is provided', async () => {
            const payload = buildCreateCategoryDto();

            const { status } = await request(server).post('/categories').send(payload);

            expect(status).toBe(401);
        });
    });

    describe('PATCH /categories/:id', () => {
        it('should update a category and return 200', async () => {
            const payload = {
                name: 'Updated Category',
            };

            const { status, body } = await request(server)
                .patch('/categories/' + category.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(200);
            expect(body).toMatchObject({
                id: category.id,
                name: payload.name,
            });
        });

        it('should return validation error when invalid data is provided', async () => {
            const payload = {
                name: '',
            };

            const { status, body } = await request(server)
                .patch('/categories/' + category.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid body');
        });

        it('should return not found error when the user is not the owner of the provided category', async () => {
            const { user: owner } = await createTestUser({ email: 'owner@email.com' });
            const ownerCategory = await createTestCategory({}, owner.id);
            const payload = {
                name: 'Updated Category',
            };

            const { status, body } = await request(server)
                .patch('/categories/' + ownerCategory.id)
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('category not found!');
        });

        it('should return validation error when invalid params is provided', async () => {
            const payload = {
                name: 'Updated Category',
            };

            const { status, body } = await request(server)
                .patch('/categories/abc')
                .send(payload)
                .set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid params');
        });

        it('should return unauthorized when no token is provided', async () => {
            const payload = buildCreateCategoryDto();

            const { status } = await request(server)
                .patch('/categories/' + category.id)
                .send(payload);

            expect(status).toBe(401);
        });
    });

    describe('DELETE /categories/:id', () => {
        it('should delete a category and return 204', async () => {
            const { status, body } = await request(server)
                .delete('/categories/' + category.id)
                .set('Authorization', authHeader);

            expect(status).toBe(204);
            expect(body).toEqual({});

            const persist = await prisma.category.findUnique({ where: { id: category.id } });
            expect(persist).toBeNull();
        });

        it('should return not found error when the user is not the owner of the provided category', async () => {
            const { user: owner } = await createTestUser({ email: 'owner@email.com' });
            const ownerCategory = await createTestCategory({}, owner.id);

            const { status, body } = await request(server)
                .delete('/categories/' + ownerCategory.id)
                .set('Authorization', authHeader);

            expect(status).toBe(404);
            expect(body.error).toBe('category not found!');
        });

        it('should return validation error when invalid params is provided', async () => {
            const { status, body } = await request(server).delete('/categories/abc').set('Authorization', authHeader);

            expect(status).toBe(400);
            expect(body.error).toBe('Invalid params');
        });

        it('should return unauthorized when no token is provided', async () => {
            const { status } = await request(server).delete('/categories/' + category.id);

            expect(status).toBe(401);
        });

        it('should set transactions category to null', async () => {
            const bankAccount = await createTestBankAccount({}, user.id);
            const transaction = await createTestTransaction({}, bankAccount.id, category.id);

            const { status } = await request(server)
                .delete('/categories/' + category.id)
                .set('Authorization', authHeader);

            const persistedTransaction = await prisma.transaction.findUnique({ where: { id: transaction.id } });

            expect(status).toBe(204);
            expect(transaction.category?.id).toBe(category.id);
            expect(persistedTransaction).toMatchObject({ categoryId: null });
        });
    });
});
