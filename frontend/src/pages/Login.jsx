import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from '../schemas/loginSchema'
import { useAuthStore } from "../store/useAuthStore"

const LoginPage = () => {

    const navigate = useNavigate();
    const setToken = useAuthStore(state => state.setToken);
    const token = useAuthStore(state => state.token);

    const [serverError, setServerError] = useState("");

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            setServerError("");
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const result = await response.json();

            setToken(result.token);

            navigate("/", { replace: true });
        } catch (err) {
            setServerError(err.message || "Login Failed");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input type="email"
                            {...register("email")}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                                ${errors.email ? "border-red-500 focus:ring-red-400" :
                                    "border-gray-300 focus:ring-blue-400"
                                }`}

                            placeholder="Enter your email"
                        />
                        {
                            errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )
                        }
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>

                        <input type="password"
                            {...register("password")}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                                }`}
                            placeholder="Enter your password"
                        />

                        {
                            errors.password && (
                                <p className="text-red-500 text-sm mb-1">
                                    {errors.password.message}
                                </p>
                            )
                        }

                    </div>

                    {
                        serverError && (
                            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-md">
                                {serverError}
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Logging in.." : "Login"}
                    </button>

                    <div className="text-center text-sm mt-4">
                        Don't have an Account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign Up
                        </Link>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default LoginPage