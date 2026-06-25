"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { registerSchema, RegisterFormData } from "@/lib/validations/auth";

import { register } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import { AuthLayout, AuthCard, AuthInput } from "@/components/auth";

import { Button } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace("/workspace");
    }
  }, [user, router]);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);

      toast.success("Account created successfully");

      router.push("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account to start managing your projects.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
            registration={registerField("name")}
            error={errors.name?.message}
            autoComplete="name"
          />

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            registration={registerField("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            registration={registerField("password")}
            error={errors.password?.message}
            autoComplete="new-password"
          />

          <Button type="submit" loading={isSubmitting} fullWidth>
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
