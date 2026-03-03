import { useEffect, useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useParams, useSearchParams } from "react-router-dom";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { nombre } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");     

  const fetchProducts = async () => {
    try {
      let url = "/productos";

      const params = [];
      if (nombre) params.push(`categoria=${nombre}`);
      if (search) params.push(`search=${search}`);

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const { data } = await api.get(url);
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
  }, [nombre, search]);

  return {
    products,
    loading,
    fetchProducts,
    handleDelete,
  };
};

export default useProducts;
