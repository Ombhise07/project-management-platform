"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerSchema, RegisterFormData } from "@/lib/validations/auth";

import { register } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
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
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input placeholder="Name" {...registerField("name")} className="rounded border p-3" />
        <p className="text-sm text-red-500">{errors.name?.message}</p>

        <input placeholder="Email" {...registerField("email")} className="rounded border p-3" />
        <p className="text-sm text-red-500">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...registerField("password")}
          className="rounded border p-3"
        />
        <p className="text-sm text-red-500">{errors.password?.message}</p>

        <button disabled={isSubmitting} className="rounded bg-black p-3 text-white">
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
