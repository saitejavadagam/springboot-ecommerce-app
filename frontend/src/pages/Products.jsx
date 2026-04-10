import { apiFetch } from "../api/client";
import ProductCard from "../components/ProductCard";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCartStore } from "../store/useCartStore";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const Products = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "0", 10);
    const size = parseInt(searchParams.get("size") || "5", 10);

    const [productsPage, setProductsPage] = useState({
        products: [],
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
    });

    const cart = useCartStore((state) => state.cart?.items || []);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);

    useEffect(() => {
        const p = searchParams.get("page");
        const s = searchParams.get("size");
        if (p === null || s === null) {
            setSearchParams({ search, page: "0", size: size.toString() });
        }
    }, [search, size, searchParams, setSearchParams]);

    const fetchProducts = useCallback(async () => {
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append("search", search);
            queryParams.append("page", page);
            queryParams.append("size", size);

            const data = await apiFetch(`api/products?${queryParams.toString()}`);
            setProductsPage(data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    }, [search, page, size]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const debouncedFetch = useMemo(() => {
        return debounce(() => {
            fetchProducts();
        }, 300);
    }, [fetchProducts]);

    useEffect(() => {
        let active = true;
        if (active) debouncedFetch();
        return () => {
            active = false;
            debouncedFetch.cancel();
        };
    }, [debouncedFetch]);

    const handlePageChange = (newPage) => {
        setSearchParams({ search, page: newPage.toString(), size: size.toString() });
    };


    return (
        <div className="max-w-7xl mx-auto">

            <div>{/*filters side bar*/}</div>

            <div>
                {productsPage.products.map((product, index) => {

                    const cartItem = cart.find(item => item.productId === product.id);
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                        <ProductCard
                            key={index}
                            product={product}
                            addItem={addItem}
                            removeItem={removeItem}
                            quantity={quantity}
                        />
                    )
                }
                )}
            </div>

            {
                productsPage.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 my-6">
                        <button
                            disabled={productsPage.currentPage === 0}
                            onClick={() => handlePageChange(productsPage.currentPage - 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >prev</button>

                        {
                            Array.from({ length: productsPage.totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    className={`px-3 py-1 rounded ${i === productsPage.currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))
                        }

                        <button
                            disabled={productsPage.currentPage === productsPage.totalPages - 1}
                            onClick={() => handlePageChange(productsPage.currentPage + 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default Products