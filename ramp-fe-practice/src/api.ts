import {
  Employee,
  PaginatedRequestParams,
  PaginatedResponse,
  SetTransactionApprovalParams,
  Transaction,
  TransactionsByEmployeeParams,
} from "./types"

const employees: Employee[] = [
  { id: "e1", firstName: "James", lastName: "Bond" },
  { id: "e2", firstName: "Ada", lastName: "Lovelace" },
  { id: "e3", firstName: "Grace", lastName: "Hopper" },
  { id: "e4", firstName: "Alan", lastName: "Turing" },
]

const merchants = ["Amazon", "Delta", "Uber", "Notion", "AWS", "Figma", "Slack", "Datadog", "Stripe", "Vercel"]

// `let` so approval toggles persist across fetches (mirrors a real backend).
let transactions: Transaction[] = Array.from({ length: 18 }, (_, i) => {
  const employee = employees[i % employees.length]
  return {
    id: "t" + (i + 1),
    amount: Math.round((20 + Math.random() * 480) * 100) / 100,
    employee,
    merchant: merchants[i % merchants.length],
    date: new Date(2026, 5, (i % 27) + 1).toISOString().slice(0, 10),
    approved: i % 3 === 0,
  }
})

const PAGE_SIZE = 5

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// Single fake "server" endpoint switch, like Ramp's challenge.
export async function fakeFetch<T>(endpoint: string, params?: unknown): Promise<T> {
  switch (endpoint) {
    case "employees":
      return delay(employees as unknown as T, 600)

    case "paginatedTransactions": {
      const { page } = (params as PaginatedRequestParams) ?? { page: 0 }
      const p = page ?? 0
      const start = p * PAGE_SIZE
      const end = start + PAGE_SIZE
      const data = transactions.slice(start, end)
      const nextPage = end < transactions.length ? p + 1 : null
      return delay({ data, nextPage } as unknown as T, 800)
    }

    case "transactionsByEmployee": {
      const { employeeId } = params as TransactionsByEmployeeParams
      const data = transactions.filter((t) => t.employee.id === employeeId)
      return delay(data as unknown as T, 800)
    }

    case "setTransactionApproval": {
      const { transactionId, value } = params as SetTransactionApprovalParams
      transactions = transactions.map((t) => (t.id === transactionId ? { ...t, approved: value } : t))
      return delay(undefined as unknown as T, 300)
    }

    default:
      throw new Error("Unknown endpoint: " + endpoint)
  }
}
