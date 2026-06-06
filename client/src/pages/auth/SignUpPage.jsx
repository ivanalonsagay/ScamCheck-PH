// client/src/pages/auth/SignUpPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, User } from "lucide-react";
import Button from "../../components/Button";
import api from "../../services/api"; // Use direct api call, not auto-login

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage(
        "Registration successful! Please sign in to continue."
      );

      // Redirect to sign in after 1.5s
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Create your account and{" "}
          <span className="text-primary">help stop scams.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Join ScamCheck PH to report suspicious messages, track your reports, and help warn the community.
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-slate-500">Start reporting suspicious activities.</p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {successMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="name"
                className="input pl-11"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="email"
                type="email"
                className="input pl-11"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="password"
                type="password"
                className="input pl-11"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="confirmPassword"
                type="password"
                className="input pl-11"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpPage;