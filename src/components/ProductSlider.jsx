import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const banners = [
  {
    id: 1,
    image: "/banners/banner1.webp",
    title: "Tecnología Premium",
    subtitle: "Lo mejor en móviles y computadoras",
  },
  {
    id: 2,
    image: "/banners/banner2.jpg",
    title: "iPhone & Android",
    subtitle: "Modelos nuevos disponibles",
  },
  {
    id: 3,
    image: "/banners/banner3.webp",
    title: "Laptops & Gaming",
    subtitle: "Potencia para estudiar y jugar",
  },
];

const ProductSlider = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="rounded-none"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[460px]">
              
              {/* Imagen */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay glass */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              {/* Texto */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 text-white">
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-xl mt-2 drop-shadow">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
