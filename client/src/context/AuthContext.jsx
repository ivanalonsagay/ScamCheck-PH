import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextStore";
import api from "../services/api";

function normalizeUser(user) {
  // Backend sometimes returns id, sometimes _id
  return {
    ...user,
    id: user.id || user._id,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Current logged-in user
  const [loading, setLoading] = useState(true); // Page loading state

  const loadCurrentUser = async () => {
    const token = localStorage.getItem("scamcheck_token");

    // No token means not logged in
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Ask backend who is logged in
      const { data } = await api.get("/auth/me");

      setUser(normalizeUser(data.user));
    } catch {
      // Remove invalid or expired token
      localStorage.removeItem("scamcheck_token");
      localStorage.removeItem("scamcheck_user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check login when app opens
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCurrentUser();
  }, []);

  const register = async (formData) => {
    // Send register request to backend
    const { data } = await api.post("/auth/register", formData);

    // Save token in browser
    localStorage.setItem("scamcheck_token", data.token);
    localStorage.setItem("scamcheck_user", JSON.stringify(data.user));

    // Save user in React state
    const normalizedUser = normalizeUser(data.user);
    setUser(normalizedUser);

    return normalizedUser;
  };

  const login = async (formData) => {
    // Send login request to backend
    const { data } = await api.post("/auth/login", formData);

    // Save token in browser
    localStorage.setItem("scamcheck_token", data.token);
    localStorage.setItem("scamcheck_user", JSON.stringify(data.user));

    // Save user in React state
    const normalizedUser = normalizeUser(data.user);
    setUser(normalizedUser);

    return normalizedUser;
  };

  const updateProfile = async (formData) => {
    const { data } = await api.put("/auth/me", formData);

    const normalizedUser = normalizeUser(data.user);
    localStorage.setItem("scamcheck_user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);

    return normalizedUser;
  };

  const logout = () => {
    // Clear browser login data
    localStorage.removeItem("scamcheck_token");
    localStorage.removeItem("scamcheck_user");

    // Clear React user state
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    updateProfile,
    logout,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
