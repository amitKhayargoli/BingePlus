import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router";

const CardSlider = ({ title, movieList, tvList, isLoading, errorMessage }) => {
  const navigate = useNavigate();
  const slidesPerView = 5; // max slides per row

  const renderContent = () => {
    if (isLoading) {
      // Loading skeletons
      return [...Array(20)].map((_, index) => (
        <SwiperSlide key={`skeleton-${index}`} className="h-full">
          <div className="w-full h-full aspect-[2/3] bg-gray-900 rounded-lg animate-pulse" />
        </SwiperSlide>
      ));
    }

    if (movieList) {
      return movieList.map((media) => (
        <SwiperSlide key={media.id} className="h-full">
          <MovieCard
            movie={media}
            onClick={() => navigate(`/movies/${media.id}`)}
          />
        </SwiperSlide>
      ));
    }

    if (tvList) {
      return tvList.map((media) => (
        <SwiperSlide key={media.id} className="h-full">
          <MovieCard
            movie={media}
            onClick={() => navigate(`/tv/${media.id}`)}
          />
        </SwiperSlide>
      ));
    }

    return null;
  };

  return (
    <section className="all-movies px-5 mt-4">
      <h2 className="md:text-2xl text-xl text-[var(--text-primary)] font-bold">
        {title}
      </h2>

      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div className="relative w-full min-h-[250px] md:min-h-[300px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            navigation
            loop={!isLoading && ((movieList?.length > slidesPerView) || (tvList?.length > slidesPerView))}
            className="mySwiper h-full"
          >
            {renderContent()}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default CardSlider;
