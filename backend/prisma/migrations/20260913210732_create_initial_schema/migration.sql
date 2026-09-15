-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('CHECKING', 'SAVING', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT', 'DEBIT', 'PIX', 'CASH');

-- CreateTable
CREATE TABLE "users" (
    "pk_user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("pk_user_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "pk_category_id" SERIAL NOT NULL,
    "fk_user_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("pk_category_id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "pk_bank_account_id" SERIAL NOT NULL,
    "fk_user_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "initial_balance" DECIMAL(10,2) NOT NULL,
    "current_balance" DECIMAL(10,2) NOT NULL,
    "color" VARCHAR(9) NOT NULL,
    "type" "BankAccountType" NOT NULL,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("pk_bank_account_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "pk_transaction_id" SERIAL NOT NULL,
    "fk_bank_account_id" INTEGER NOT NULL,
    "fk_category_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "type" "TransactionType" NOT NULL,
    "method" "PaymentMethod" NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("pk_transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("pk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("pk_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "categories"("pk_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk_bank_account_id_fkey" FOREIGN KEY ("fk_bank_account_id") REFERENCES "bank_accounts"("pk_bank_account_id") ON DELETE CASCADE ON UPDATE CASCADE;
