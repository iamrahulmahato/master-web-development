import React from "react";
import Slider from "react-slick";

const testimonialData = [
  {
    id: 1,
    name: "Suresh Kumar",
    text: "Our trip with Adventure Tours was absolutely fantastic! From the stunning landscapes to the amazing guides, every moment was memorable.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "John Smith",
    text: "Booking with Adventure Tours was the best decision we made. The accommodations were top-notch, and we had the most incredible experiences.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Robert Singh",
    text: "Adventure Tours exceeded our expectations in every way. We can't wait to book our next adventure with them!",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="py-10 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          {/* Header section */}
          <div className="text-center mb-20 max-w-[400px] mx-auto text-white">
            <p className="text-sm text-gray-600 uppercase tracking-wide">Testimonials</p>
            <h1 className="text-3xl font-bold">What Our Customers Say</h1>
            <p className="mt-4 text-lg text-gray-300">Read what our customers have to say about their experiences with Adventure Tours.</p>
          </div>
          {/* Testimonial section */}
          <div className="grid grid-cols-1 max-w-[800px] mx-auto gap-6">
            <Slider {...settings}>
              {testimonialData.map(({ id, name, text, img }) => (
                <div key={id} className="my-6">
                  <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-md">
                    <img src={img} alt={name} className="rounded-full w-16 h-16" />
                    <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                    <p className="text-gray-700">{text}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
