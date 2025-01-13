import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const OurClientsSay = () => {
  const testimonials = [
    {
      text: "“Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!”",
      author: "Ronald Richards",
    },
    {
      text: "This service is fantastic! Highly recommended.”",
      author: "Ronald Richards",
    },
    {
      text: "“Great experience, very professional team”",
      author: "Ronald Richards",
    },
    {
      text: "“Affordable and reliable service. I love it!”",
      author: "Ronald Richards",
    },
    {
      text: "“Amazing support and quality work!”",
      author: "Ronald Richards",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1110px", margin: "0 auto" }}>
      <h2
        style={{ textAlign: "center", marginBottom: "20px" }}
        className="text-[50px] leading-[60px] font-[600]"
      >
        What Our Clients Say
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={true} // تفعيل أسهم التحكم
        modules={[Navigation, Pagination]} // استيراد وحدة Navigation
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <p className="flex flex-col">
                <span className="text-[28px] italic font-[400] leading-[33.6px]">
                  {testimonial.text}
                </span>
                <span className="mt-4 font-[500] leading-[19.2px]">
                  - {testimonial.author}
                </span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurClientsSay;
