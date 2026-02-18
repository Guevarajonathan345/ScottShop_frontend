import { useEffect, useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/productos");
      setProducts(data);
    } catch (error) {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/productos/${id}`);
      toast.success("Producto eliminado correctamente");
      fetchProducts();
    } catch (error) {
      toast.error("No se pudo eliminar");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
    handleDelete,
  };
};

export default useProducts;
