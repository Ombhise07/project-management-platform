"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { loginSchema, LoginFormData } from "@/lib/validations/auth";

import { login } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import { Button } from "@/components/ui";

import { AuthLayout, AuthCard, AuthInput } from "@/components/auth";

export default function LoginPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    if (user) {
      router.replace("/workspaces");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);

      toast.success("Logged in successfully");

      // router.push("/dashboard");
      router.push("/workspaces");
      // router.push(`/workspace/${id}`);
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-slate-500">Sign in to continue managing your projects.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            registration={register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            registration={register("password")}
            error={errors.password?.message}
            autoComplete="current-password"
          />

          <Button type="submit" loading={isSubmitting} fullWidth>
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create one
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
