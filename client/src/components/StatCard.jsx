function StatCard({ icon: Icon, label, value, note, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            colors[color]
          }`}
        >
          <Icon size={24} />
        </div>

        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h3 className="text-3xl font-bold text-slate-950">{value}</h3>
          <p className="text-xs text-slate-400">{note}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;