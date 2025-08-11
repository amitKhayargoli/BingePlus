import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const CardSlider = ({ title, movieList, tvList, isLoading, errorMessage }) => {
  const navigate = useNavigate();
  return (
    <section className="all-movies px-5 mt-4">
      <h2 className="md:text-2xl text-xl text-[var(--text-primary)] font-bold">
        {title}
      </h2>

      {isLoading ? (
        <Spinner className="h-8 w-8" />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
            navigation
            loop={
              (movieList && movieList.length > 5) ||
              (tvList && tvList.length > 5)
            }
            className="mySwiper"
          >
            {movieList &&
              movieList.map((media) => (
                <SwiperSlide key={media.id}>
                  <MovieCard
                    movie={media}
                    onClick={() => navigate(`/movies/${media.id}`)}
                  />
                </SwiperSlide>
              ))}

            {tvList &&
              tvList.map((media) => (
                <SwiperSlide key={media.id}>
                  <MovieCard
                    movie={media}
                    onClick={() => navigate(`/tv/${media.id}`)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default CardSlider;
