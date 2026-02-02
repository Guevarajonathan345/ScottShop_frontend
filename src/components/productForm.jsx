import { useEffect, useState } from "react";
import api from "../api/ApiService";

const ProductForm = ({ product, onSuccess}) => {
    const [form, setForm] = useState ({
        nombre: "",
        precio: "",
        stock: "",
        categoria_id: "",
    });


    const [imagen, setImage] = useState(null);

    useEffect (() => {
        if  (product) {
            setForm ({
                nombre : product.nombre,
                precio: product.precio,
                stock: product.stock,
                categoria_id: product.categoria_id,
                });
                setImage (null);
            }
        }, [product]);

    const handleChange = (e) => {
        const {name ,value, files } = e.target;
        setForm ({...form, [name]: files ? files[0] : value}); 
    }; 

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("precio", form.precio);
        data.append("stock", form.stock);
        data.append("categoria_id", form.categoria_id);

        if (imagen) {
            data.append("imagen", imagen);
        }
        try {
            if (product) {
                await api.put(`/productos/${product.id}`, data);
                alert ("producto actualizado");
            } else {
                await api.post(`/productos`, data);
                alert ("producto creado");
            }

            setForm ({
                nombre: "",
                precio: "",
                stock: "",
                categoria_id: "",
            });

            setImage (null);

            onSuccess && onSuccess();
        } catch (error) {
            console.error("Error al guardar o crear el producto", error);
        }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
        >
            <h2 className="font-bold text-lg">
                {product ? "Editar producto" : "Nuevo producto"}
            </h2>

            <input 
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="nombre"
            className="border p-2 w-full"
            required
            />

            <input 
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="precio"
            className="border p-2 w-full"
            required
            />

            <input 
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="stock"
            className="border p-2 w-full"
            required
            />

            <input 
            name="categoria_id"
            type="number"
            value={form.categoria_id}
            onChange={handleChange}
            placeholder="categoria ID"
            className="border p-2 w-full"
            required
            />

            <input 
            name="imagen"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {product ? "Actualizar" : "Crear"}
            </button>
        </form>
    );
};

export default ProductForm;