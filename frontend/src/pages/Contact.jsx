import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema } from "../schemas/contactSchema"

const Contact = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }



    return (
        <section className='bg-gray-100 min-h-screen py-10 px-4'>
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className='text-3xl font-semibold mb-2'>Contact Us</h1>
                    <p className='text-gray-600'>Have questions or need support? Reach out to us.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white p-6">
                        <h2 className='text-xl font-medium mb-4'>Send us a message</h2>

                        <form className='space-y-4'
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            <div>
                                <label className='block text-sm mb-1'>Name</label>
                                <input type="text"
                                    {...register("name")}
                                    className={`w-full border px-3 py-2 focus:outline-none focus:ring-1
                            ${errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-sky-600"
                                        }`}
                                />

                                {
                                    errors.name && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )
                                }

                            </div>

                            <div>
                                <label className='block text-sm mb-1'>Email</label>
                                <input type="email"
                                    {...register("email")}
                                    className={`w-full border px-3 py-2 focus:outline-none focus:ring-1
                            ${errors.email
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-sky-600"
                                        }`} />
                                {
                                    errors.email && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )
                                }
                            </div>

                            <div>
                                <label className='block text-sm mb-1'>Message</label>
                                <textarea rows="4"
                                    {...register("message")}
                                    className={`w-full border px-3 py-2 focus:outline-none focus:ring-1
                            ${errors.message
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-sky-600"
                                        }`}
                                />
                                {
                                    errors.message && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.message.message}
                                        </p>
                                    )
                                }
                            </div>

                            <button type='submit'
                                disabled={isSubmitting}
                                className='bg-sky-700 text-white px-5 py-2 text-sm hover:bg-sky-800'>
                                {isSubmitting ? "Sending" : "Submit"}
                            </button>

                        </form>


                    </div>

                    <div className="bg-white p-6">
                        <h2 className='text-xl font-medium mb-4'>
                            Contact Information
                        </h2>

                        <div className="space-y-3 text-sm text-gray-700">
                            <p>
                                <span className='font-medium'>Email:</span>{" "}support@shopease.com
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span>{" "}+91 98765 43210
                            </p>
                            <p>
                                <span className="font-medium">Address:</span>{" "}Hyderabad, India
                            </p>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-600">
                                Business Hours:
                            </p>
                            <p className="text-sm">
                                Mon – Fri: 9:00 AM – 6:00 PM
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Contact