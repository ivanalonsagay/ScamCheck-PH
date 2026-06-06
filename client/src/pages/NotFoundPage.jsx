import { Link } from "react-router-dom";
import Button from "../components/Button";

function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-soft px-5">
      <div className="card max-w-lg p-10 text-center">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>
        <p className="mt-3 text-slate-500">
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;