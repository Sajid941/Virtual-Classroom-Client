import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import useRole from "../../CustomHooks/useRole";

const HomeBannerSlider = () => {
  const { role } = useRole();
  return (
    <div className="">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="min-h-screen w-full flex items-center justify-center relative"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dklikxmpm/image/upload/v1729790423/ivan-aleksic-PDRFeeDniCk-unsplash_jmzykl.jpg')", // Use actual image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute min-h-screen w-full bg-[#004085] bg-opacity-75 z-10"></div>

            {/* Content on top of the overlay */}
            <div className="wrap z-20 text-center">
              <img
                src="https://res.cloudinary.com/dklikxmpm/image/upload/v1729790392/classNetWhite_sn1whn.png"
                alt=""
                className="w-1/4 md:w-1/6 mx-auto"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Expanding Learning Horizons.
              </h1>
              <p className="text-[16px] md:text-[20px] my-3 text-white">
                A Virtual Classroom for Teachers and Students to Connect, Share,
                and Learn Together.
              </p>
              <div className="btnWrap flex justify-center items-center gap-3">
                <Link
                  to={"/aboutUs"}
                  className="btn rounded-none bg-transparent border text-white border-white font-semibold"
                >
                  Learn More
                </Link>
                {role === "teacher" ? (
                  <Link
                    to={"/dashboard/classes"}
                    className="btn border-none capitalize rounded-none bg-accent font-semibold"
                  >
                    Create Class
                  </Link>
                ) : (
                  <Link
                    to={"/dashboard/classes"}
                    className="btn border-none capitalize rounded-none bg-accent font-semibold"
                  >
                    Join a Class
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Additional slides */}
        <SwiperSlide>
          <div
            className="min-h-screen w-full flex items-center justify-center relative"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dklikxmpm/image/upload/v1729790391/alam-kusuma-g7O1rqMVreU-unsplash_xi3j4y.jpg')", // Use actual image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute min-h-screen w-full bg-[#004085] bg-opacity-75 z-10"></div>
            <div className="wrap z-20 grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto items-center text-white">
              {/* GIF Column */}
              <div className="flex justify-center">
                <img
                  src="https://res.cloudinary.com/dklikxmpm/image/upload/v1729790195/Online_Sales_liakqv.gif" // Example GIF URL
                  alt="Learning GIF"
                  className="w-full h-auto max-w-xs md:max-w-sm rounded-md"
                />
              </div>

              {/* Text Column */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Unlock Your True Potential
                </h1>
                <p className="text-[16px] md:text-[20px] my-3">
                  Explore diverse learning paths that lead to excellence. Our
                  virtual platform brings world-class education to your
                  fingertips.
                </p>
                <div className="btnWrap flex justify-center md:justify-start items-center gap-3">
                  <Link
                    to={"/forum"}
                    className="btn rounded-none bg-transparent border text-white border-white font-semibold"
                  >
                    Join Our Forum
                  </Link>
                  {role === "teacher" ? (
                    <Link
                      to={"/dashboard/classes"}
                      className="btn border-none capitalize rounded-none bg-accent font-semibold"
                    >
                      Create Class
                    </Link>
                  ) : (
                    <Link
                      to={"/dashboard/classes"}
                      className="btn border-none capitalize rounded-none bg-accent font-semibold"
                    >
                      Join a Class
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBannerSlider;
