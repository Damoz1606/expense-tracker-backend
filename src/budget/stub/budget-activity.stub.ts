import { BudgetWithExpenses } from "../dto/response/budget-with-expenses.dto";

const ExpenseStub = (id: number) => ({
    id: id,
    name: "Stub expense",
    amount: Math.random() * 5000,
    createAt: new Date('2024-01-01')
})

const BudgetStub = (id: number): BudgetWithExpenses => ({
    id: id,
    name: "Stub budget",
    budget: Math.random() * 1000,
    expenses: [...Array(Math.floor(Math.random() * 5))].map(ExpenseStub)
});

export const mockBudgetActivity = () => BudgetStub(1);
export const mockBudgetActivities = (count: number = 5) => [...Array(count)].map(BudgetStub);