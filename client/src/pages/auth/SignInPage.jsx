import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";

function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Button loading

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form field
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Login using backend API
      const loggedInUser = await login(formData);

      // Redirect based on role
      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        const redirectPath = location.state?.from?.pathname || "/dashboard";
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Welcome back.{" "}
          <span className="text-primary">Continue protecting the community.</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Sign in to submit scam reports, track your reports, and view verified
          warnings.
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary">
            <ShieldCheck size={32} />
          </div>

          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-slate-500">
            Use your account to continue.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

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
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                name="password"
                type="password"
                className="input pl-11"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignInPage;