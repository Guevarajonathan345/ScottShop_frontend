import { useEffect, useState } from "react";
import ProductListContainer from '../containers/ProductListContainer';
import ProductForm from "../components/ProductForm";

const AdminPanel = () => {
  const [refresh, setRefresh] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    setRefresh(!refresh);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel Administrador</h1>

      {/* FORM */}
      <ProductForm
        product={editingProduct}
        onSuccess={handleSuccess}
      />

      {/* LISTADO */}
      <ProductListContainer 
        adminMode 
        onEdit = {handleEdit}
        refresh={refresh}
        />
    </div>
  );
};

export default AdminPanel;
