import { useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";

const initialForm = {
  almacenamiento: "",
  ram: "",
  precio: "",
  stock: "",
  sku: ""
};

const VariantManager = ({ product, onClose, refresh }) => {

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  
  // RESET FORM
  
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  
  // FORMATEAR GB AUTOMÁTICO
 
  const formatGB = (value) => {

    if (!value) return "";

    let clean = value.toString().trim();

    clean = clean.replace(/gb/i, "").trim();

    clean = clean.replace(/\D/g, "");

    return clean ? `${clean}GB` : "";
  };

  
  // HANDLE CHANGE

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "almacenamiento" || name === "ram") {

      setForm((prev) => ({
        ...prev,
        [name]: formatGB(value)
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 
  // CREAR O EDITAR
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/variantes/${editingId}`,
          form
        );

        toast.success("Variante actualizada");

      } else {

        await api.post("/variantes", {
          ...form,
          product_id: product.id
        });

        toast.success("Variante creada");
      }

      resetForm();

      await refresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Error en variante"
      );
    }
  };

  
  // EDITAR
  
  const handleEdit = (variant) => {

    setForm({
      almacenamiento: variant.almacenamiento,
      ram: variant.ram,
      precio: variant.precio,
      stock: variant.stock,
      sku: variant.sku
    });

    setEditingId(variant.id);
  };

  
  // ELIMINAR
  
  const handleDelete = async (id) => {

    try {

      await api.delete(`/variantes/${id}`);

      toast.success("Variante eliminada");

      await refresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Error al eliminar variante"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Variantes - {product.nombre}
          </h2>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle"
          >
            ✕
          </button>

        </div>

        {/* LISTA */}
        <div className="mb-6 max-h-60 overflow-y-auto space-y-2">

          {product.variantes?.length > 0 ? (

            product.variantes.map((variant) => (

              <div
                key={variant.id}
                className="flex justify-between items-center border border-gray-200 p-3 rounded-xl"
              >

                <div>

                  <p className="font-semibold">
                    {variant.almacenamiento} / {variant.ram}
                  </p>

                  <p className="text-sm text-gray-600">
                    ${variant.precio} | Stock: {variant.stock}
                  </p>

                  <p className="text-xs text-gray-400">
                    SKU: {variant.sku}
                  </p>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleEdit(variant)}
                    className="btn btn-sm btn-warning"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(variant.id)}
                    className="btn btn-sm btn-error"
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            ))

          ) : (

            <div className="text-center text-gray-500 py-8">
              No hay variantes creadas
            </div>
          )}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >

          <input
            name="almacenamiento"
            value={form.almacenamiento}
            onChange={handleChange}
            placeholder="Almacenamiento (128GB)"
            className="input input-bordered w-full"
            required
          />

          <input
            name="ram"
            value={form.ram}
            onChange={handleChange}
            placeholder="RAM (8GB)"
            className="input input-bordered w-full"
            required
          />

          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="input input-bordered w-full"
            required
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="input input-bordered w-full"
            required
          />

          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="input input-bordered md:col-span-2 w-full"
            required
          />

          <button
            className="btn btn-primary md:col-span-2"
          >
            {editingId
              ? "Actualizar variante"
              : "Crear variante"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-ghost md:col-span-2"
            >
              Cancelar edición
            </button>
          )}

        </form>

      </div>
    </div>
  );
};

export default VariantManager;