import { useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";

const VariantManager = ({ product, onClose, refresh }) => {
  const [form, setForm] = useState({
    almacenamiento: "",
    ram: "",
    precio: "",
    stock: "",
    sku: ""
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREAR O EDITAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/variantes/${editingId}`, form);
        toast.success("Variante actualizada");
      } else {
        await api.post(`/variantes`, {
          ...form,
          product_id: product.id
        });
        toast.success("Variante creada");
      }

      setForm({
        almacenamiento: "",
        ram: "",
        precio: "",
        stock: "",
        sku: ""
      });

      setEditingId(null);
      refresh();

    } catch (error) {
      toast.error("Error en variante");
    }
  };

  // EDITAR
  const handleEdit = (v) => {
    setForm({
      almacenamiento: v.almacenamiento,
      ram: v.ram,
      precio: v.precio,
      stock: v.stock,
      sku: v.sku
    });

    setEditingId(v.id);
  };

  // ELIMINAR
  const handleDelete = async (id) => {
    try {
      await api.delete(`/variantes/${id}`);
      toast.success("Variante eliminada");
      refresh();
    } catch (error) {
      toast.error("Error al eliminar");
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
          <button onClick={onClose}>✕</button>
        </div>

        {/* LISTA */}
        <div className="mb-6 max-h-60 overflow-y-auto">
          {product.variantes?.map((v) => (
            <div
              key={v.id}
              className="flex justify-between items-center border p-2 rounded mb-2"
            >
              <div>
                <p className="font-semibold">
                  {v.almacenamiento} / {v.ram}
                </p>
                <p className="text-sm text-gray-600">
                  ${v.precio} | Stock: {v.stock} | SKU: {v.sku}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(v)}
                  className="btn btn-sm btn-warning"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(v.id)}
                  className="btn btn-sm btn-error"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">

          <input
            name="almacenamiento"
            value={form.almacenamiento}
            onChange={handleChange}
            placeholder="Almacenamiento (128GB)"
            className="input input-bordered"
            required
          />

          <input
            name="ram"
            value={form.ram}
            onChange={handleChange}
            placeholder="RAM (8GB)"
            className="input input-bordered"
            required
          />

          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="input input-bordered"
            required
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="input input-bordered"
            required
          />

          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="input input-bordered col-span-2"
            required
          />

          <button className="btn btn-primary col-span-2">
            {editingId ? "Actualizar variante" : "Crear variante"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default VariantManager;