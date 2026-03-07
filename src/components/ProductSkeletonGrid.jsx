import ProductSkeletonCard from "./ProductSkeletonCard";

const ProductSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

      {[...Array(8)].map((_, index) => (
        <ProductSkeletonCard key={index} />
      ))}

    </div>
  );
};

export default ProductSkeletonGrid