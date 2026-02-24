import { useEffect, useState } from "react";
import api from "../api/ApiService";
import toast from "react-hot-toast";

const ProductForm = ({ product, onSuccess}) => {
    const [form, setForm] = useState ({
        nombre: "",
        precio: "",
        stock: "",
        categoria_id: "",
        descripcion: "",
    });


    const [imagen, setImage] = useState(null);

    useEffect (() => {
        if  (product) {
            setForm ({
                nombre : product.nombre,
                precio: product.precio,
                stock: product.stock,
                categoria_id: product.categoria_id,
                descripcion: product.descripcion,
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
        data.append("descripcion", form.descripcion);

        if (imagen) {
            data.append("imagen", imagen);
        }
        try {
            if (product) {
                await api.put(`/productos/${product.id}`, data);
                toast.success("Producto actualizado correctamente")

            } else {
                await api.post(`/productos`, data);
                toast.success ("Producto creado correctamente")
            }

            setForm ({
                nombre: "",
                precio: "",
                stock: "",
                categoria_id: "",
                descripcion: "",
            });

            setImage (null);

            onSuccess && onSuccess();
        } catch (error) {
            toast.error("Error al guardar o crear el producto");
        }
    };

    return (
        <form 
        id="product-form"
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
        >
            <input 
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border p-2 w-full"
            required
            />

            <input 
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="border p-2 w-full"
            required
            />

            <input 
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 w-full"
            required
            />

            <input 
            name="categoria_id"
            type="number"
            value={form.categoria_id}
            onChange={handleChange}
            placeholder="Categoria ID"
            className="border p-2 w-full"
            required
            />

            <input 
            name="imagen"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            />

            <input 
            name="descripcion"
            value ={form.descripcion}
            onChange={handleChange}
            placeholder = "Descripcion del producto"
            className="border p-2 w-full"
            rows={4}
            required
            />
        </form>
    );
};

export default ProductForm;