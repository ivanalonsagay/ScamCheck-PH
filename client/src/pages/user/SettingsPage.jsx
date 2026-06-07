import { Bell, ShieldCheck } from "lucide-react";
import { useState } from "react";

function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    return JSON.parse(
      localStorage.getItem("scamcheck_settings") ||
        '{"emailAlerts":true,"safetyReminders":true}'
    );
  });

  const updateSetting = (key) => {
    const nextSettings = {
      ...settings,
      [key]: !settings[key],
    };

    localStorage.setItem("scamcheck_settings", JSON.stringify(nextSettings));
    setSettings(nextSettings);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Preferences</p>
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="text-slate-500">
          Manage local ScamCheck PH dashboard preferences.
        </p>
      </div>

      <div className="card max-w-3xl p-6">
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-100 p-4">
            <span className="flex items-start gap-3">
              <Bell className="text-primary" size={22} />
              <span>
                <span className="block font-bold">Email alert reminders</span>
                <span className="text-sm text-slate-500">
                  Keep this enabled as a preference for account notifications.
                </span>
              </span>
            </span>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={() => updateSetting("emailAlerts")}
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-100 p-4">
            <span className="flex items-start gap-3">
              <ShieldCheck className="text-primary" size={22} />
              <span>
                <span className="block font-bold">Safety reminders</span>
                <span className="text-sm text-slate-500">
                  Show scam-awareness reminders in future dashboard updates.
                </span>
              </span>
            </span>
            <input
              type="checkbox"
              checked={settings.safetyReminders}
              onChange={() => updateSetting("safetyReminders")}
              className="h-5 w-5"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
