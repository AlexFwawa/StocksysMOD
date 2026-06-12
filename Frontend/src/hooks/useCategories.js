import { useState, useEffect } from 'react';
import { obtenerCategorias } from '../services/categoriaService';
import { useToast } from './useToast';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await obtenerCategorias();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            showToast("Error al cargar categorías", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, fetchCategories };
};
