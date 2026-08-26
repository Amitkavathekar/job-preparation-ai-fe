"use client"

import { SubmitHandler, useForm } from "react-hook-form"

interface IFormInput {
  name: string
  email: string
  password: string
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type Props = {
  mode: "login" | "register"
}

const AuthForm = ({ mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(mode, data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <main className="w-full max-w-md bg-white p-8 shadow-xl">
        <header className="space-y-2 pb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {mode === "login" ? "Login to your account" : "Create your account"}{" "}
            <Link
              href={mode === "login" ? "/register" : "/login"}
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              {mode === "login" ? "Register" : "Login"}
            </Link>
          </h1>

          <p className="text-sm text-slate-500">
            {mode === "login"
              ? "Enter your details to continue"
              : "Fill in your details to create an account"}
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">
                  Name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="h-11 rounded-lg border-slate-300 focus:border-[#e1034d] focus:ring-[#e1034d]"
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                className="h-11 rounded-lg border-slate-300 focus:border-[#e1034d] focus:ring-[#e1034d]"
              />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                className="h-11 rounded-lg border-slate-300 focus:border-[#e1034d] focus:ring-[#e1034d]"
              />
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
            </div>

            {mode === "login" && (
              <Link
                href="#"
                className="block text-right text-sm font-medium text-[#e1034d] hover:underline"
              >
                Forgot Password?
              </Link>
            )}

            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#e1034d] font-semibold text-white shadow-md transition-all hover:bg-[#c90243] hover:shadow-lg"
            >
              {mode === "login" ? "Login" : "Register"}
            </Button>

        </form>
      </main>
    </div>
  )
}

export default AuthForm
