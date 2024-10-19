import { Budget } from "../dto/response/budget.base.dto";

const BudgetStub = (id: number): Budget => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000
});

export const mockBudgetWithoutExpenses = () => BudgetStub(1);
export const mockBudgetsWithoutExpenses = (count: number = 5) => [...Array(count)].map(BudgetStub);