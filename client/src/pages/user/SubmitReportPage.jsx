import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button";
import { PLATFORMS, SCAM_TYPES } from "../../constants";
import api from "../../services/api";

const initialForm = {
  title: "",
  scamType: "",
  platform: "",
  suspiciousLink: "",
  description: "",
};

const isValidLinkOrPhone = (value) => {
  if (!value.trim()) {
    return true;
  }

  const cleanPhone = value.replace(/\s|-/g, "");
  const isPhone = /^\d{11}$/.test(cleanPhone);

  try {
    const url = new URL(value);
    return isPhone || ["http:", "https:"].includes(url.protocol);
  } catch {
    return isPhone;
  }
};

function SubmitReportPage() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!isValidLinkOrPhone(formData.suspiciousLink)) {
      setLoading(false);
      setError(
        "Suspicious Link or Contact must be a valid http/https link or an 11-digit number."
      );
      return;
    }

    try {
      await api.post("/reports", formData);
      setFormData(initialForm);
      setMessage("Report submitted. An admin will review it before it becomes public.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Submit Scam Report</h1>
        <p className="text-slate-500">
          Help protect others by reporting suspicious online activity.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="card space-y-5 p-6" onSubmit={handleSubmit}>
          {message && (
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={18} />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Scam Title
            </label>
            <input
              className="input"
              name="title"
              placeholder="Example: GCash Double Your Money Scam"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Scam Type
              </label>
              <select
                className="input"
                name="scamType"
                value={formData.scamType}
                onChange={handleChange}
                required
              >
                <option value="">Select scam type</option>
                {SCAM_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Platform / Channel
              </label>
              <select
                className="input"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
              >
                <option value="">Select platform</option>
                {PLATFORMS.map((platform) => (
                  <option key={platform}>{platform}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Suspicious Link or Contact
            </label>
            <input
              className="input"
              name="suspiciousLink"
              placeholder="Example: https://fake-link.com or 09171234567"
              value={formData.suspiciousLink}
              onChange={handleChange}
              pattern="(https?:\/\/.+)|(\d[\d\s-]{10,})"
              title="Enter a valid http/https link or an 11-digit number."
            />
            <p className="mt-2 text-xs text-slate-400">
              Must be a valid http/https link or an 11-digit number.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>
            <textarea
              className="input min-h-36 resize-none"
              name="description"
              placeholder="Describe what happened and how the scam works..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <Button className="w-full" disabled={loading}>
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>

        <aside className="card p-6">
          <h2 className="text-xl font-bold">Reporting Tips</h2>

          <div className="mt-5 space-y-5 text-sm text-slate-600">
            <p>Never share your OTP, MPIN, password, or banking details.</p>
            <p>Include clear details so admins can review faster.</p>
            <p>Do not upload sensitive personal information.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SubmitReportPage;
