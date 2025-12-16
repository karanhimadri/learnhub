"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  register: (payload: RegisterPayload) => Promise<{ user: AuthUser }>;
  login: (payload: LoginPayload) => Promise<{ user: AuthUser }>;
  logout: () => Promise<void>;
  changePassword: (payload: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data && data.message) || "Failed to register";
        setError(message);
        throw new Error(message);
      }

      const registeredUser = (data && data.user) as AuthUser;
      setUser(registeredUser);

      return { user: registeredUser };
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data && data.message) || "Failed to login";
        setError(message);
        throw new Error(message);
      }

      const loggedInUser = (data && data.user) as AuthUser;
      setUser(loggedInUser);

      return { user: loggedInUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      // ignore logout errors
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const changePassword = async (payload: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/instructor/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data && data.message) || "Failed to change password";
        setError(message);
        throw new Error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Restore user from existing auth cookie on first mount
  useEffect(() => {
    if (initialized || user) return;

    const restore = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUser(data.user as AuthUser);
        }
      } catch {
        // ignore restore errors
      } finally {
        setInitialized(true);
      }
    };

    restore();
  }, [initialized, user]);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
