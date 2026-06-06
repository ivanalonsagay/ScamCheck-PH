function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition";

  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700",
    outline:
      "border border-primary text-primary bg-white hover:bg-blue-50",
    ghost: "text-slate-700 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;