export const BudgetEvent = {
    ON_EXPENSE_ADDED: 'user.on.expense-added'
}

export class OnBudgetEventExpenseAdded {
    constructor(
        public readonly budget: number
    ) { }
}
