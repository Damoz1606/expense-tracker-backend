import { Budget } from "../dto/response/budget.base.dto";

const BudgetStub = (id: number): Budget => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000
});

export const mockBudget = () => BudgetStub(1);
export const mockBudgets = (count: number = 5) => [...Array(count)].map(BudgetStub);