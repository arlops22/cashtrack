import { createTestBankAccount } from './create-test-bank-account';
import { createTestCategory } from './create-test-category';
import { createTestTransaction } from './create-test-transaction';

const getDateByDay = (day: number) => new Date(2026, 5, day).toISOString();

export const createMetricsScenario = async (userId: number) => {
    const bankAccount = await createTestBankAccount({}, userId);
    const foodCategory = await createTestCategory({}, userId);
    const transportCategory = await createTestCategory({}, userId);
    const salaryCategory = await createTestCategory({}, userId);

    await createTestTransaction(
        { type: 'EXPENSE', amount: 100, createdAt: getDateByDay(10) },
        bankAccount.id,
        foodCategory.id,
    );
    await createTestTransaction(
        { type: 'EXPENSE', amount: 250, createdAt: getDateByDay(20) },
        bankAccount.id,
        transportCategory.id,
    );
    await createTestTransaction(
        { type: 'INCOME', amount: 1000, createdAt: getDateByDay(15) },
        bankAccount.id,
        salaryCategory.id,
    );
    await createTestTransaction(
        { type: 'EXPENSE', amount: 999, createdAt: new Date(2025, 5, 15).toISOString() },
        bankAccount.id,
        foodCategory.id,
    );
    const otherAccount = await createTestBankAccount({}, userId);
    await createTestTransaction(
        { type: 'INCOME', amount: 777, createdAt: getDateByDay(12) },
        otherAccount.id,
        salaryCategory.id,
    );

    return { bankAccount, foodCategory, transportCategory };
};
