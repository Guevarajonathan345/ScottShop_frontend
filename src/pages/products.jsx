import ProductListContainer from "../containers/ProductListContainer";
import ProductSlider from "../components/ProductSlider";
import useProducts from "../hooks/UseProducts";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer"
import { motion } from "framer-motion";
import ProductSkeletonGrid from "../components/ProductSkeletonGrid";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Products = () => {
  const { products, loading } = useProducts();

  return (
    <div> 
      <ProductSlider products={products} />

      <motion.div

      variants = {container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 py-10" 
      >
        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <ProductListContainer products={products} />
        )}  
      </motion.div>
      <Benefits />
      <Footer />  
    </div>
  );
};

export default Products;
