"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/hooks/useRegister";
import { registerSchema, RegisterInput } from "@/lib/validation/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error } = useRegister();

  const [form, setForm] = useState<RegisterInput>({
    firstName: "",
    lastName: "",
    countryCode: "+62",
    phoneNumber: "",
    country: "Indonesia",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const parsed = registerSchema.safeParse(form);
  if (!parsed.success) {
    const errs: { [key: string]: string } = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path?.[0];
      if (key) errs[key.toString()] = issue.message;
    });
    setFormErrors(errs);
    return;
  }

  const payload = {
    fullName: `${form.firstName} ${form.lastName}`,
    email: form.email,
    password: form.password,
  };

  try {
    const res = await register(payload); 
    if (res?.content?.token) router.push("/login");

    if (res?.content?.user?.fullName) {
      localStorage.setItem("fullName", res.content.user.fullName);
    }
  } catch (err) {
    console.error(err);
    setFormErrors({ api: "Terjadi kesalahan saat register." });
  }
};


  return (
    <Card className="w-full max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          Register
        </CardTitle>
        <CardDescription className="text-center">
          Let’s Sign up first to enter Square Website!
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-sky-400 rounded-md px-3 py-2 outline-none focus:border-sky-500"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm">{formErrors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-sky-400 rounded-md px-3 py-2 outline-none focus:border-sky-500"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Phone & Country */}
          <div className="flex gap-2">
            <input
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="w-16 border border-sky-400 rounded-md px-3 py-2 text-center"
            />
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="flex-1 border border-sky-400 rounded-md px-3 py-2"
            />
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-1/2 border border-sky-400 rounded-md px-3 py-2 bg-white"
            >
              <option>Indonesia</option>
              <option>Malaysia</option>
              <option>Singapore</option>
              <option>Thailand</option>
              <option>Philippines</option>
            </select>
          </div>
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
          )}

          {/* Email */}
          <div className="relative flex items-center border border-sky-400 rounded-md overflow-hidden">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 px-3 py-2 outline-none"
            />
            <span className="px-3 text-gray-500">@squareteam.com</span>
          </div>
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-sky-400 rounded-md px-3 py-2 pr-10 outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-sky-400 rounded-md px-3 py-2 pr-10 outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* About */}
          <div>
            <textarea
              name="about"
              placeholder="Tell us about yourself"
              value={form.about}
              onChange={handleChange}
              className="w-full border border-sky-400 rounded-md px-3 py-2 resize-none h-24"
            ></textarea>
            {formErrors.about && (
              <p className="text-red-500 text-sm">{formErrors.about}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              className="w-1/4 bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
