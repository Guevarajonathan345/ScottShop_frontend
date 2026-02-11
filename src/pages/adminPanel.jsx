import { useEffect, useState } from "react";
import ProductListContainer from '../containers/ProductListContainer';
import ProductForm from "../components/ProductForm";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const AdminPanel = () => {

  const [refresh, setRefresh] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleCreate = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenForm (true);
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    setRefresh(!refresh);
    setOpenForm(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="felx justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard administrador</h1>
        <button 
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">

          + Nuevo producto
        </button>
      </div>
  
      {/* LISTADO */}
      <ProductListContainer 
        adminMode 
        onEdit = {handleEdit}
        refresh={refresh}
        />
        {/* MODAL FORM */}
        {openForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-8 border border-gray-200">
              
              {/* TÍTULO DEL MODAL */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? "Editar producto" : "Nuevo producto"}
                </h2>
                <button
                  onClick={() => setOpenForm(false)}
                  className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
              <ProductForm product={editingProduct} onSuccess={handleSuccess} />

              {/* BOTONES ABAJO */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpenForm(false)}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  form="product-form"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
