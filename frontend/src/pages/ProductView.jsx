import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useCartStore } from "../store/useCartStore";

const ProductView = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        const fetchProductView = async () => {
            try {
                setLoading(true);

                const data = await apiFetch(`api/products/${id}`);
                setProduct(data);

            } catch {
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchProductView();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Product...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error || "Product not found"}
            </div>
        );
    }

    const discountPercent =
        product.mrp && product.price
            ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
            : 0;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
                
                {/* Product Image */}
                <div className="bg-white border rounded-md p-6 flex items-center justify-center md:col-span-3">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-96 object-contain"
                    />
                </div>

                {/* Product Information */}
                <div className="flex flex-col md:col-span-3">

                    {product.sponsored && (
                        <p className="text-sm text-gray-500 mb-1">
                            Sponsored
                        </p>
                    )}

                    <h1 className="text-2xl font-medium leading-snug">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-orange-500 text-sm">
                            ⭐ {product.rating?.toFixed(1)}
                        </span>
                        <span className="text-blue-600 text-sm cursor-pointer">
                            {product.reviews} ratings
                        </span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex items-center gap-3">
                        <span className="text-red-600 text-2xl font-semibold">
                            -{discountPercent}%
                        </span>

                        <div className="flex items-baseline gap-1">
                            <span className="text-sm relative top-1">₹</span>
                            <span className="text-3xl font-semibold">
                                {product.price}
                            </span>
                        </div>
                    </div>

                    {product.mrp && (
                        <div className="mt-1 text-sm text-gray-600">
                            M.R.P:{" "}
                            <span className="line-through">
                                ₹{product.mrp}
                            </span>
                        </div>
                    )}

                    <p className="text-green-600 text-sm mt-1">
                        Inclusive of all taxes
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                        {product.bought}+ bought in past month
                    </p>

                    <hr className="my-4" />

                    <h2 className="font-semibold mb-2">About this item</h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                        <li>Premium build quality</li>
                        <li>Highly rated by customers</li>
                        <li>Trusted seller</li>
                        <li>Fast delivery available</li>
                    </ul>
                </div>
                
                {/* Product Purchase Box */}
                <div className="bg-white border rounded-md p-6 h-fit shadow-sm">

                    <div className="flex items-baseline gap-1">
                        <span className="text-sm relative top-1">₹</span>
                        <span className="text-2xl font-semibold">
                            {product.price}
                        </span>
                    </div>

                    <p className="text-green-600 text-sm mt-2">
                        In stock
                    </p>

                    <div className="mt-4">
                        <label className="text-sm">Quantity:</label>
                        <select
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="ml-2 border px-2 py-1 rounded"
                        >
                            {[1, 2, 3, 4, 5].map((q) => (
                                <option key={q} value={q}>
                                    {q}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() =>addItem(product.id, quantity)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 mt-4 py-2 rounded-full font-medium"
                    >
                        Add to Cart
                    </button>

                    <button
                        className="w-full bg-orange-500 hover:bg-orange-600 mt-3 py-2 rounded-full font-medium text-white"
                    >
                        Buy Now
                    </button>

                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                        <p>Secure transaction</p>
                        <p>Ships from Zeptoneon</p>
                        <p>Sold by Authorized Seller</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;