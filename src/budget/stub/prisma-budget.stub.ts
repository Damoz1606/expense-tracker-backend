import { Budget } from "@prisma/client";

const PrismaBudgetStub = (id: number): Budget => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000,
    userId: 1
});

export const mockPrismaBudget = () => PrismaBudgetStub(1);
export const mockPrismaBudgets = (count: number = 5) => [...Array(count)].map(PrismaBudgetStub);