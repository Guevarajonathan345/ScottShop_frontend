import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "../containers/ProductCard";


const ProductSlider = ({ products = [] }) => {
    return (
        <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween = {20}
        slidesPerView = {1}
        navigation
        pagination = {{ clickable: true }}
        autoplay = {{ delay: 3000 }}
        breakpoints = {{
            640: {slidesPerView: 2 },
            1024: {slidesPerView: 3 },
        }} 
        >
            {products.map(product => (
                <SwiperSlide key ={product.id}>
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductSlider;

