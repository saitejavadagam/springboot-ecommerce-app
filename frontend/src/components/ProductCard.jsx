import { useCartStore } from "../store/useCartStore";
import {Link} from 'react-router-dom';

const ProductCard = ({ product, quantity = 0 }) => {
    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);

    const discountPercent =
        product.mrp && product.price
            ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
            : 0;

    return (
        <div className="flex gap-6 p-4 bg-white border border-slate-300 rounded-lg hover:shadow-lg transition-shadow duration-200 my-3">
            
            <Link
                to={`/products/${product.id}`}
                target="_blank"
                className="w-80 shrink-0 flex items-center justify-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition"
            >
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-80 object-contain"
                />
            </Link>

            {/* DETAILS */}
            <div className="flex flex-col flex-1">
                {product.sponsored && (
                    <p className="text-xs text-gray-500 mb-1 uppercase font-medium">
                        Sponsored
                    </p>
                )}

                <Link
                    to={`/products/${product.id}`}
                    target="_blank"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-700 line-clamp-2 mb-2"
                >
                    {product.title}
                </Link>

                <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="text-orange-500 font-medium">
                        ⭐ {product.rating?.toFixed(1)}
                    </span>
                    <span className="text-gray-600">({product.reviews ?? 0})</span>
                </div>

                <p className="text-xs text-gray-500 mb-2">
                    {product.bought ?? 0}+ bought in past month
                </p>

                {/* PRICE */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price}
                    </span>
                    {product.mrp && (
                        <>
                            <span className="text-sm text-gray-500 line-through">
                                ₹{product.mrp}
                            </span>
                            <span className="text-sm text-green-600 font-semibold">
                                {discountPercent}% off
                            </span>
                        </>
                    )}
                </div>

                {/* CART BUTTONS */}
                {quantity === 0 ? (
                    <button
                        onClick={() => addItem(product.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium px-6 py-2 rounded-full transition w-40"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center gap-3 border-yellow-400 border-3 rounded-full w-fit px-3 py-1">
                        <button
                            onClick={() => removeItem(product.id)}
                            className="text-lg font-bold px-2 hover:text-red-500 transition"
                        >
                            -
                        </button>
                        <span className="min-w-14 font-bold text-center">{quantity}</span>
                        <button
                            onClick={() => addItem(product.id)}
                            className="text-lg font-bold px-2 hover:text-green-500 transition"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;