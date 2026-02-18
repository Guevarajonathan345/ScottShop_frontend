import ProductListContainer from "../containers/ProductListContainer";
import ProductSlider from "../components/ProductSlider";
import useProducts from "../hooks/UseProducts";

const Products = () => {
  const { products, loading } = useProducts();

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <ProductSlider products={products} />
      <ProductListContainer products={products} />
    </div>
  );
};

export default Products;
