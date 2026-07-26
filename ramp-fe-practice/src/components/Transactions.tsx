import { useState } from "react"
import { fakeFetch } from "../api"
import { Transaction } from "../types"

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const [approved, setApproved] = useState(transaction.approved)
  const [saving, setSaving] = useState(false)

  return (
    <div className="txn">
      <div>
        <div className="who">
          {transaction.employee.firstName} {transaction.employee.lastName}
        </div>
        <div className="meta">
          {transaction.merchant} &middot; {transaction.date}
        </div>
      </div>
      <div className="amt">${transaction.amount.toFixed(2)}</div>
      <label className="approve">
        <input
          type="checkbox"
          checked={approved}
          disabled={saving}
          onChange={async (e) => {
            const value = e.target.checked
            setApproved(value)
            setSaving(true)
            await fakeFetch("setTransactionApproval", { transactionId: transaction.id, value })
            setSaving(false)
          }}
        />
        approved
      </label>
    </div>
  )
}

export function Transactions({ transactions }: { transactions: Transaction[] | null }) {
  if (transactions === null) {
    return <div className="empty">Loading transactions...</div>
  }
  if (transactions.length === 0) {
    return <div className="empty">No transactions.</div>
  }
  return (
    <div>
      {transactions.map((t) => (
        <TransactionRow key={t.id} transaction={t} />
      ))}
    </div>
  )
}
