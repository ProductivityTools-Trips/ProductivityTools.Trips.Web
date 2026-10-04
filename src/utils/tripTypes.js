/**
 * Trip types and the expense-field rules that depend on them.
 * Mirrors TripTypes.cs in the API.
 */
export const TRIP_TYPES = ['Family', 'Friends', 'Company']

export const DEFAULT_TRIP_TYPE = 'Family'

/**
 * Which amount fields are editable for a given trip type.
 *  - Family:  Value, Expensed. Family cost mirrors Expensed; Friends debit off.
 *  - Friends: everything.
 *  - Company: Value, Expensed only.
 */
export const expenseFieldRules = (tripType) => {
    switch (tripType) {
        case 'Friends':
            return { familyCost: true, friendsDebit: true, familyMirrorsExpensed: false }
        case 'Company':
            return { familyCost: false, friendsDebit: false, familyMirrorsExpensed: false }
        case 'Family':
        default:
            return { familyCost: false, friendsDebit: false, familyMirrorsExpensed: true }
    }
}

/** Force an expense into the shape required by its trip type. */
export const applyTripTypeRules = (expense, tripType) => {
    const r = expenseFieldRules(tripType)
    const next = { ...expense }
    if (r.familyMirrorsExpensed) next.familyCost = expense.expensed ?? ''
    else if (!r.familyCost) next.familyCost = 0
    if (!r.friendsDebit) next.friendsDebit = 0
    return next
}
