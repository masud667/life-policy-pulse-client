// src/components/CustomerReviews.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { FaStar, FaQuoteLeft, FaUser } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import axios from "axios";

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Sample review data
  useEffect(() => {
    axios
      .get("https://life-policy-pulse-server.vercel.app/testimonials")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews", err));
  }, []);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <FaQuoteLeft className="text-indigo-600 text-2xl mr-2" />
          <h2 className="text-3xl md:text-4xl font-bold  text-base-content">
            Customer Reviews
          </h2>
        </div>
        <p className="text-lg  text-base-content w-11/12 mx-auto">
          Hear what our customers have to say about their experience
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="py-6 px-2">
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className=" bg-base-100 rounded-xl shadow-lg p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  {review.userImage ? (
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                    />
                  ) : (
                    <div className="bg-base-300 w-12 h-12 rounded-full flex items-center justify-center">
                      <FaUser className="text-indigo-600 text-xl" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h3 className="font-bold  text-base-content">
                      {review.author}
                    </h3>
                    <p className="text-sm  text-base-content">{review.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex-grow mb-4">
                  <p className=" text-base-content italic">"{review.review}"</p>
                </div>

                <div className="text-right flex justify-between">
                  <h3 className="font-bold  text-base-content">
                    {review.policyName}
                  </h3>
                  <p className="text-sm  text-base-content">{review.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <button className="custom-prev  bg-base-100 rounded-full p-2 shadow-md hover:bg-indigo-50 transition-colors">
            <IoIosArrowBack className="text-indigo-600 text-xl" />
          </button>

          <div className="custom-pagination flex justify-center space-x-2">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "bg-indigo-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button className="custom-next  bg-base-100 rounded-full p-2 shadow-md hover:bg-indigo-50 transition-colors">
            <IoIosArrowForward className="text-indigo-600 text-xl" />
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className=" text-base-content">
          Trusted by thousands of customers worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <div className=" bg-base-100 rounded-lg p-4 shadow-sm">
            <span className="text-3xl font-bold text-indigo-600">4.9/5</span>
            <p className=" text-base-content text-sm">Average Rating</p>
          </div>
          <div className=" bg-base-100 rounded-lg p-4 shadow-sm">
            <span className="text-3xl font-bold text-indigo-600">98%</span>
            <p className=" text-base-content text-sm">Customer Satisfaction</p>
          </div>
          <div className=" bg-base-100 rounded-lg p-4 shadow-sm">
            <span className="text-3xl font-bold text-indigo-600">5K+</span>
            <p className=" text-base-content text-sm">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
