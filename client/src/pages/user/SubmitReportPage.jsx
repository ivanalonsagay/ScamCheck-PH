import { Send } from "lucide-react";
import Button from "../../components/Button";
import { PLATFORMS, SCAM_TYPES } from "../../constants";

function SubmitReportPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Submit Scam Report</h1>
        <p className="text-slate-500">
          Help protect others by reporting suspicious online activity.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="card space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Scam Title
            </label>
            <input
              className="input"
              placeholder="Example: GCash Double Your Money Scam"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Scam Type
              </label>
              <select className="input">
                <option>Select scam type</option>
                {SCAM_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Platform / Channel
              </label>
              <select className="input">
                <option>Select platform</option>
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
              placeholder="Example: https://fake-link.com or 09xx xxx xxxx"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>
            <textarea
              className="input min-h-36 resize-none"
              placeholder="Describe what happened and how the scam works..."
            />
          </div>

          <Button className="w-full">
            <Send size={18} />
            Submit Report
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