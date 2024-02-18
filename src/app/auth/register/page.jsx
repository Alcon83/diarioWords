"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  console.log(errors);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form onSubmit={onSubmit} className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-white text-3xl font-bold mb-6">Register</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
            Username:
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            placeholder="yourUser123"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

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

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: "Confirm Password is required" })}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Register
        </button>
      </form>
    </div>
  );
}
export default RegisterPage;
