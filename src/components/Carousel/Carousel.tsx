import { FC, ReactNode } from "react";
import { ArrowRight } from "../ArrowRight";
import { ArrowLeft } from "../ArrowLeft";
import { useCarousel } from "./useCarousel";
import "../Icons.scss";
import "./Carousel.scss";

interface iCarousel {
  children: ReactNode;
  className?: string;
  hideArrows?: boolean;
  elementIndexToFocus?: number;
}

export const Carousel: FC<iCarousel> = ({
  children,
  className = "",
  hideArrows = false,
  elementIndexToFocus,
}) => {
  const {
    moveBack,
    moveForward,
    contentRef,
    dragStart,
    mouseUp,
    mouseDown,
    handleScroll,
    arrowLeftRef,
    arrowRightRef,
  } = useCarousel({ elementIndexToFocus });
  return (
    <div className={`Carousel ${className}`}>
      {!hideArrows && (
        <button
          ref={arrowLeftRef}
          className="Carousel-arrow left"
          onClick={moveBack}
        >
          <ArrowLeft />
        </button>
      )}
      {!hideArrows && (
        <button
          ref={arrowRightRef}
          className="Carousel-arrow right"
          onClick={moveForward}
        >
          <ArrowRight />
        </button>
      )}
      <div
        className="Carousel-content"
        ref={contentRef}
        onDragStart={dragStart}
        onMouseUp={mouseUp}
        onMouseDown={mouseDown}
        onMouseMove={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};
