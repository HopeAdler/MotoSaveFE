import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageLink = [
  "https://thoidai.com.vn/stores/news_dataimages/huyen.tran/092019/29/14/3904_trieu_cuong.jpg",
  "https://tranquithanh.com/wp-content/uploads/2018/11/10-thp-14.jpg",
  "https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_06_03/het-ngap-1493.jpg",
  "https://nguoiduatin.mediacdn.vn/media/nguyen-thu-huyen/2020/08/17/anh-1-ngap-lut.jpg",
];

const Homepage: React.FC = () => {
  const settings = {
    infinite: true, // Infinite loop scrolling
    speed: 8000, // Slow smooth scrolling
    slidesToShow: 3, // Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Continuous scrolling
    cssEase: "linear", // Smooth scrolling
    swipeToSlide: true, // Enable swipe
    draggable: true, // Allow mouse drag
    pauseOnHover: true, // Pause when hovering
  };

  return (
    <div className="relative overflow-hidden bg-black py-10">            {/* Perforated Filmstrip Border (Top) */}
      <div className="absolute top-0 left-0 w-full h-6 bg-gray-800 flex justify-between items-center px-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-black rounded-full"></div>
        ))}
      </div>

      {/* Scrolling Film Tape with Swipe */}
      <Slider {...settings} className="flex w-full">
        {imageLink.map((_link, index) => (
          <div key={index} className="px-2">
            <img
              className="h-[50vh] w-full object-cover rounded-lg shadow-lg border-4 border-gray-700"
              src={_link}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </Slider>

      {/* Perforated Filmstrip Border (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gray-800 flex justify-between items-center px-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-black rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
