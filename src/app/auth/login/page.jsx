"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const [error, setError] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res)
    if (res.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form onSubmit={onSubmit} className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
        {error && <p className="bg-red-700 text-white text-sm p-3 rounded mb-5">{error}</p>}

        <h1 className="text-white text-3xl font-bold mb-6">Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            placeholder="user@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            placeholder="******"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
