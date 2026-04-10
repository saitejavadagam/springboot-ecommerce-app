import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas/signupSchema';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {

    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(signupSchema) });

    const onSubmit = async (data) => {

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            const result = await response.text();

            if (result === "success") {
                alert("User sign up successful. Please login to continue..");
            }



            navigate("/login");
        }
        catch (err) {
            setServerError(err.message);
        }

    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className='text-2xl font-semibold text-center mb-6'>
                    Sign Up
                </h2>

                <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            First Name
                        </label>
                        <input type="text"
                            {...register("firstName")}
                            placeholder='Enter your First Name'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                        />

                        {
                            errors.firstName && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.firstName.message}
                                </p>
                            )
                        }

                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Last Name
                        </label>

                        <input type="text"
                            {...register("lastName")}
                            placeholder='Enter your Last Name'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                        />

                        {
                            errors.lastName && (
                                <p className='text-red-500 text-sm mt-1'>{errors.lastName.message}</p>
                            )
                        }

                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Email
                        </label>
                        <input type="email"
                            {...register("email")}
                            placeholder='Enter your email'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                        />

                        {
                            errors.email && (
                                <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                            )
                        }

                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Password
                        </label>
                        <input type="password"
                            {...register("password")}
                            placeholder='Enter your password'
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                        />
                        {
                            errors.password && (
                                <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                            )
                        }
                    </div>

                    {
                        serverError && (
                            <p className='text-red-500 text-sm mt-1'>
                                {serverError}
                            </p>
                        )
                    }

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opactiy-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className='text-center text-sm mt-4'>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className='text-blue-600 hover:text-blue-700 font-medium'
                        >
                            Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup