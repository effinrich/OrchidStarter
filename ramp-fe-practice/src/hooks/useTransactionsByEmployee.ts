import { useCallback, useState } from "react"
import { fakeFetch } from "../api"
import { Transaction } from "../types"

export function useTransactionsByEmployee() {
  const [data, setData] = useState<Transaction[] | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchById = useCallback(async (employeeId: string) => {
    setLoading(true)
    const transactions = await fakeFetch<Transaction[]>("transactionsByEmployee", { employeeId })
    setData(transactions)
    setLoading(false)
  }, [])

  const invalidate = useCallback(() => setData(null), [])

  return { data, loading, fetchById, invalidate }
}
