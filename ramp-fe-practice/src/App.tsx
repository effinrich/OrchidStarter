import { useCallback, useEffect, useMemo } from "react"
import { useEmployees } from "./hooks/useEmployees"
import { usePaginatedTransactions } from "./hooks/usePaginatedTransactions"
import { useTransactionsByEmployee } from "./hooks/useTransactionsByEmployee"
import { Transactions } from "./components/Transactions"
import { Employee } from "./types"

const ALL_EMPLOYEES = "" // sentinel for the "All employees" option

export function App() {
  const { data: employees, loading: employeesLoading, fetchAll: fetchEmployees } = useEmployees()
  const {
    data: paginated,
    loading: paginatedLoading,
    fetchAll: fetchPaginated,
    invalidate: invalidatePaginated,
  } = usePaginatedTransactions()
  const {
    data: byEmployee,
    loading: byEmployeeLoading,
    fetchById,
    invalidate: invalidateByEmployee,
  } = useTransactionsByEmployee()

  // What we actually render: a single-employee result if one is selected,
  // otherwise the accumulated paginated list.
  const transactions = useMemo(() => byEmployee ?? paginated?.data ?? null, [byEmployee, paginated])

  const loadAllTransactions = useCallback(async () => {
    invalidateByEmployee()
    await fetchPaginated()
  }, [fetchPaginated, invalidateByEmployee])

  const loadByEmployee = useCallback(
    async (employeeId: string) => {
      invalidatePaginated()
      await fetchById(employeeId)
    },
    [fetchById, invalidatePaginated]
  )

  useEffect(() => {
    fetchEmployees()
    fetchPaginated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------------------------------------------------------------------------
  // BUG 1: the employee dropdown's loading state is wired to a COMBINED loading
  //        that is also true while transactions are fetching. Result: after you
  //        click "View more", the dropdown flips to "Loading employees..." and
  //        disables itself — even though employees loaded long ago.
  // ---------------------------------------------------------------------------
  const isLoading = employeesLoading || paginatedLoading || byEmployeeLoading

  return (
    <div className="app">
      <h1>Transactions</h1>
      <p className="subtitle">Ramp FE practice &mdash; three bugs to fix (see README.md).</p>

      <label className="field" htmlFor="employee">
        Filter by employee
      </label>
      <select
        id="employee"
        disabled={isLoading}
        defaultValue={ALL_EMPLOYEES}
        onChange={async (e) => {
          const value = e.target.value
          if (value === ALL_EMPLOYEES) {
            await loadAllTransactions()
          } else {
            await loadByEmployee(value)
          }
        }}
      >
        <option value={ALL_EMPLOYEES}>{isLoading ? "Loading employees..." : "All employees"}</option>
        {(employees ?? []).map((emp: Employee) => (
          <option key={emp.id} value={emp.id}>
            {emp.firstName} {emp.lastName}
          </option>
        ))}
      </select>

      <Transactions transactions={transactions} />

      {/* -----------------------------------------------------------------------
          BUG 2: "View more" shows even when the list is filtered by a single
                 employee — but that is NOT a paginated request, so paging makes
                 no sense there.
          BUG 3: "View more" never disappears once you reach the end of the data
                 (it ignores paginated.nextPage === null).
          ----------------------------------------------------------------------- */}
      {transactions !== null && (
        <button className="viewmore" disabled={paginatedLoading} onClick={fetchPaginated}>
          {paginatedLoading ? "Loading..." : "View more"}
        </button>
      )}
    </div>
  )
}
