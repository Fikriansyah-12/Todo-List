"use client";

import { useState } from "react";
import { post } from "@/lib/axios";
import { RegisterInput } from "@/lib/validation/auth";

export type RegisterResponse = {
  content: {
    user: { id: string; fullName: string; email: string; role: string };
    token: string;
  };
  message: string;
  errors: string[];
};

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterInput) => {
    try {
      setLoading(true);
      setError(null);
      const res = await post<RegisterResponse, RegisterInput>("/register", data);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan saat registrasi");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
