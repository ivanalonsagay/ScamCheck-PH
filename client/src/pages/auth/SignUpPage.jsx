import { Link } from "react-router-dom";
import { Lock, Mail, ShieldCheck, User } from "lucide-react";
import Button from "../../components/Button";

function SignUpPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Create your account and{" "}
          <span className="text-primary">help stop scams.</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Join ScamCheck PH to report suspicious messages, track your submitted
          reports, and help warn the community.
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-slate-500">
            Start reporting suspicious activities.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">Full Name</label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input className="input pl-11" placeholder="Enter your full name" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input className="input pl-11" placeholder="Enter your email" />
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
                type="password"
                className="input pl-11"
                placeholder="Create a password"
              />
            </div>
          </div>

          <Button className="w-full">Create Account</Button>
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