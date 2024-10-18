import { Expense } from "../dto/response/expense.base.dto";

const ExpenseStub = (id: number): Expense => ({
    id: id,
    name: "Stub expense",
    amount: Math.floor(Math.random() * 100),
    createAt: new Date('2024-01-01'),
    budget: "Stub budget"
});

export const mockExpense = () => ExpenseStub(1);
export const mockExpenses = (count: number = 5) => [...Array(count)].map(ExpenseStub);