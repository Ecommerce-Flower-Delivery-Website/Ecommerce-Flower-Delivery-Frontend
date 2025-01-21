import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import GoogleImage from "./../../../assets/google-logo.png";
import { api } from "../../../lib/ajax/api";

interface Reviews {
  name: string;
  text: string;
}

const OurClientsSay: React.FC = () => {
  const [reviews, setReviews] = useState<Reviews[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null); // Reset any previous error
      try {
        const response = await api.get(`http://localhost:3000/api/v1/review`);
        const fetchedReviews = response.data.data.reviews;
        if (!Array.isArray(fetchedReviews)) {
          throw new Error("Invalid response format: reviews should be an array");
        }
        setReviews(fetchedReviews);
        console.log("Fetched Reviews:", fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="aj-our-clients-say p-[80px]">
      <div className="testimonials-header flex flex-col gap-2 mb-6 justify-center items-center">
        <img src={GoogleImage} alt="Google logo" />
        <h4 className="uppercase">Reviews</h4>
      </div>
      <h2
        style={{ textAlign: "center", marginBottom: "20px" }}
        className="text-[50px] leading-[60px] font-[600]"
      >
        What Our Clients Say
      </h2>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading reviews...</p>
        </div>
      ) : (!reviews || reviews.length === 0) ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>No reviews available at the moment.</p>
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div style={{ textAlign: "center" }}>
                <p className="flex flex-col">
                  <span className="text-[28px] italic font-[400] leading-[33.6px]">
                    {review.text}
                  </span>
                  <span className="mt-4 font-[500] leading-[19.2px]">
                    - {review.name}
                  </span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default OurClientsSay;
