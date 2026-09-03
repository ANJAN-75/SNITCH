import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../service/product.api";
import { setProduct } from "../state/product.productSlice.js";

export const useProduct = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateProduct = async (fromdata) => {
        try {
            setLoading(true);
            setError("");
            const response = await createProduct(fromdata);
            dispatch(setProduct(response.product));
            return response.product;
        } catch (err) {
            const message = err?.response?.data?.message || "Something went wrong. Please try again.";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateProduct, loading, error, setError };
};
