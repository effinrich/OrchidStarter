export type Employee = { id: string; firstName: string; lastName: string }

export type Transaction = {
  id: string
  amount: number
  employee: Employee
  merchant: string
  date: string
  approved: boolean
}

export type PaginatedResponse<T> = { data: T; nextPage: number | null }

export type PaginatedRequestParams = { page: number | null }
export type TransactionsByEmployeeParams = { employeeId: string }
export type SetTransactionApprovalParams = { transactionId: string; value: boolean }
