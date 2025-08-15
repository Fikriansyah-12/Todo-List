"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon as Iconify } from "@iconify/react";
import { useLogin, LoginInput } from "@/hooks/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [remember, setRemember] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "ADMIN") router.replace("/dashboard");
      else if (role === "USER") router.replace("/todo");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    try {
      const res = await login(form);

      if (res?.content?.token && res.content.user) {
        const { fullName, role } = res.content.user;

        localStorage.setItem("token", res.content.token);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("role", role);

        if (remember) localStorage.setItem("rememberMe", form.email);
        else localStorage.removeItem("rememberMe");

        if (role === "ADMIN") router.replace("/dashboard");
        else if (role === "USER") router.replace("/todo");
        else setFormError("Role tidak dikenali.");
      } else {
        setFormError("Login gagal, periksa email/username dan password.");
      }
    } catch {
      setFormError("Terjadi kesalahan saat login. Silakan coba lagi.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-5xl text-center mb-3">Sign In</CardTitle>
        <CardDescription className="text-center">
          Just sign in if you have an account in here. Enjoy our Website{" "}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Username */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-sm text-sky-400 bg-white">
              Email or Username
            </label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-sky-400 rounded-md px-3 py-2 outline-none focus:border-sky-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 text-sm text-sky-400 bg-white">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-sky-400 rounded-md px-3 py-2 pr-10 outline-none focus:border-sky-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Iconify
                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                className="text-lg"
              />
            </button>
          </div>

          {/* Remember me & forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-5 h-5 border border-blue-500 rounded accent-blue-500"
              />
              Remember me
            </label>

            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>

          {/* Error message */}
          {(error || formError) && (
            <p className="text-red-500 text-sm">{error || formError}</p>
          )}

          {/* Submit button */}
          <Button
            className="w-full bg-primaryBlue hover:bg-blue-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-gray-500 justify-center">
        Don’t have an account?{" "}
        <a href="/register" className="ml-1 text-blue-600 hover:underline">
          Sign up
        </a>
      </CardFooter>
    </Card>
  );
}
