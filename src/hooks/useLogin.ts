"use client";

import { useState } from "react";
import { post } from "@/lib/axios";

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  content: {
    user: { id: string; fullName: string; email: string; role: string };
    token: string;
  };
  message: string;
  errors: string[];
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginInput) => {
    try {
      setLoading(true);
      setError(null);
      const res = await post<LoginResponse, LoginInput>("/login", data);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan saat login");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
