import { Expense } from "@prisma/client";

const PrismaExpenseStub = (id: number): Expense => ({
    id: id,
    name: "Stub expense",
    amount: Math.floor(Math.random() * 100),
    createAt: new Date('2024-01-01'),
    budgetId: 1
});

export const mockPrismaExpense = () => PrismaExpenseStub(1);
export const mockPrismaExpenses = (count: number = 5) => [...Array(count)].map(PrismaExpenseStub);