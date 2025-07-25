"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema, type LoginInput } from "@/lib/validations"
import { signIn, DEMO_ACCOUNTS } from "@/lib/auth"
import { useAuth } from "@/components/providers/auth-provider"
import { Loader2, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError("")

    try {
      const user = await signIn(data.email, data.password)
      
      if (user) {
        // Store user in localStorage for demo
        localStorage.setItem("current-user", JSON.stringify(user))
        setUser(user)
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoAccount = (type: "admin" | "user") => {
    const account = DEMO_ACCOUNTS[type]
    setValue("email", account.email)
    setValue("password", account.password)
  }

  return (
    <div className="grid gap-6">
      {/* Demo Account Buttons */}
      <div className="grid gap-2">
        <p className="text-sm text-muted-foreground text-center">
          Quick Demo Access:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoAccount("admin")}
          >
            Admin Account
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoAccount("user")}
          >
            User Account
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            {...register("email")}
            id="email"
            placeholder="name@company.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </div>
  )
}
