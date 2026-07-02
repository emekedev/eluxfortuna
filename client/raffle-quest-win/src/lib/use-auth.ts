import { useEffect, useState } from "react";
import type { User } from "./api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("elux_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setReady(true);

    const onStorage = () => {
      const updatedUser = localStorage.getItem("elux_user");

      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    user,
    ready,

    logout: () => {
      localStorage.removeItem("elux_token");
      localStorage.removeItem("elux_user");
      setUser(null);
    },

    refresh: () => {
      const storedUser = localStorage.getItem("elux_user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    },
  };
}