import { Budget } from "@prisma/client";

const BudgetStub = (id: number): Budget => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000,
    userId: 1
});

export const mockBudget = () => BudgetStub(1);
export const mockBudgets = (count: number = 5) => [...Array(count)].map(BudgetStub);