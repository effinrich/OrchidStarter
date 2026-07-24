import { useCallback, useState } from "react"
import { fakeFetch } from "../api"
import { Employee } from "../types"

export function useEmployees() {
  const [data, setData] = useState<Employee[] | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const employees = await fakeFetch<Employee[]>("employees")
    setData(employees)
    setLoading(false)
  }, [])

  return { data, loading, fetchAll }
}
