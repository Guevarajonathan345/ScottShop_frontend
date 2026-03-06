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
    <div className="w-full overflow-hidden">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        speed={900}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>

            <div className="relative w-full h-[260px] sm:h-[360px] md:h-[520px] lg:h-[600px]">

              {/* IMAGEN */}
              <img
                src={banner.image}
                alt={banner.title}
                loading="lazy"
                className="
                  w-full
                  h-full
                  object-cover
                  object-center
                  scale-[1.02]
                  transition-transform
                  duration-700
                "
              />

              {/* DEGRADADO PROFESIONAL */}
              <div className="
                absolute inset-0
                bg-gradient-to-r
                from-black/70
                via-black/30
                to-transparent
              " />

              {/* GLASS OVERLAY */}
              <div className="
                absolute inset-0
                backdrop-blur-[1px]
              " />

              {/* TEXTO */}
              <div className="
                absolute
                inset-0
                flex
                flex-col
                justify-center
                items-start
                px-6
                md:px-20
                text-white
                max-w-3xl
              ">

                <h2 className="
                  text-2xl
                  sm:text-3xl
                  md:text-5xl
                  font-bold
                  drop-shadow-xl
                ">
                  {banner.title}
                </h2>

                <p className="
                  text-sm
                  sm:text-base
                  md:text-xl
                  mt-3
                  opacity-90
                  drop-shadow-lg
                ">
                  {banner.subtitle}
                </p>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <section className="py-12 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold">
          Tecnología de última generación
        </h2>
        <p className="text-base-content/70 mt-3">
          Encuentra los mejores smartphones, laptops y accesorios
          al mejor precio.
        </p>
      </section>

    </div>
  );
};

export default ProductSlider;