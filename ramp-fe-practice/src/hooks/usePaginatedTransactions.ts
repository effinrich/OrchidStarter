import { useCallback, useState } from "react"
import { fakeFetch } from "../api"
import { PaginatedResponse, Transaction } from "../types"

export function usePaginatedTransactions() {
  const [data, setData] = useState<PaginatedResponse<Transaction[]> | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    // Don't fetch past the last page.
    if (data !== null && data.nextPage === null) return

    setLoading(true)
    const nextPage = data === null ? 0 : data.nextPage
    const response = await fakeFetch<PaginatedResponse<Transaction[]>>("paginatedTransactions", { page: nextPage })
    setData((prev) => {
      if (prev === null) return response
      return { data: [...prev.data, ...response.data], nextPage: response.nextPage }
    })
    setLoading(false)
  }, [data])

  const invalidate = useCallback(() => setData(null), [])

  return { data, loading, fetchAll, invalidate }
}
