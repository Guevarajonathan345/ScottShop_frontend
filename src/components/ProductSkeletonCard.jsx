const ProductSkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-lg rounded-xl">

      {/* imagen */}
      <div className="w-full aspect-square shimmer rounded-t-xl"></div>

      <div className="card-body p-4 space-y-3">

        <div className="h-4 w-20 shimmer rounded"></div>

        <div className="h-5 w-3/4 shimmer rounded"></div>

        <div className="h-5 w-24 shimmer rounded"></div>

        <div className="h-4 w-28 shimmer rounded"></div>

        <div className="flex gap-2 pt-2">
          <div className="h-8 w-20 shimmer rounded"></div>
          <div className="h-8 w-28 shimmer rounded"></div>
        </div>

      </div>
    </div>
  );
};

export default ProductSkeletonCard;