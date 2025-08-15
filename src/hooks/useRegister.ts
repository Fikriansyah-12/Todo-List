import { useState } from "react";
import { post } from "@/lib/axios";

export type ApiRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

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

  const register = async (data: ApiRegisterPayload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await post<RegisterResponse, ApiRegisterPayload>("/register", data);
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
