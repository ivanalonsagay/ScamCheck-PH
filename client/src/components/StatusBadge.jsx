function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",
    Verified: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    "High Risk": "bg-red-100 text-red-700",
    "Medium Risk": "bg-orange-100 text-orange-700",
    "Low Risk": "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;