import { useEffect, useState } from "react"
import slide1 from "../assets/slides/slide1.png"
import slide2 from "../assets/slides/slide2.png"
import slide3 from "../assets/slides/slide3.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const slides = [slide1, slide2, slide3]

const Slideshow = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }

  const goNext = () => {
    setCurrentIndex(prev => prev === slides.length - 1 ? 0 : prev + 1);
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === slides.length - 1 ? 0 : prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-120 overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2
             bg-black/50 text-white p-3 rounded-full
             hover:bg-black/70 transition"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2
             bg-black/50 text-white p-3 rounded-full
             hover:bg-black/70 transition"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </button>

    </div>
  )
}

export default Slideshow