import { useState } from "react";
import ProductListContainer from "../containers/ProductListContainer";
import ProductForm from "../components/ProductForm";
import UseProducts from "../hooks/UseProducts";
import VariantManager from "../components/VariantManager";

const AdminPanel = () => {
  const { products, handleDelete, fetchProducts } = UseProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    setOpenForm(false);
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Panel Administrador
        </h1>

        <button
          onClick={handleCreate}
          className="btn btn-primary"
        >
          + Nuevo producto
        </button>
      </div>

      {/* TABLA */}
      <ProductListContainer
        adminMode
        onEdit={handleEdit}
        products={products}
        onDelete={handleDelete}
        onManageVariants={setSelectedProduct} 
      />

      {/* MODAL VARIANTES */}
      {selectedProduct && (
        <VariantManager
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          refresh={fetchProducts}
        />
      )}

      {/* MODAL PRODUCTO */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-8">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingProduct ? "Editar producto" : "Nuevo producto"}
              </h2>

              <button
                onClick={() => setOpenForm(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <ProductForm
              product={editingProduct}
              onSuccess={handleSuccess}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenForm(false)}
                className="btn btn-ghost"
              >
                Cancelar
              </button>

              <button
                type="submit"
                form="product-form"
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;