import { mockExpenses } from "src/expense/stub/expense.stub";
import { BudgetWithExpenses } from "../dto/response/budget-with-expenses.dto";

const BudgetStub = (id: number): BudgetWithExpenses => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000,
    expenses: mockExpenses(5)
});

export const mockBudget = () => BudgetStub(1);
export const mockBudgets = (count: number = 5) => [...Array(count)].map(BudgetStub);