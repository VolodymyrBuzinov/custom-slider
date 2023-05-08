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
  customArrows?: { leftArrow: ReactNode; rightArrow: ReactNode };
  updateDataCallback?: () => void;
  infinite?: boolean;
}

export const Carousel: FC<iCarousel> = ({
  children,
  className = "",
  hideArrows = false,
  elementIndexToFocus,
  customArrows,
  updateDataCallback,
  infinite = false,
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
    onScroll,
  } = useCarousel({ elementIndexToFocus, updateDataCallback, infinite });
  return (
    <div className={`Carousel ${className}`}>
      {!hideArrows && (
        <button
          ref={arrowLeftRef}
          className="Carousel-arrow left"
          onClick={moveBack}
        >
          {!!customArrows?.leftArrow ? customArrows?.leftArrow : <ArrowLeft />}
        </button>
      )}
      {!hideArrows && (
        <button
          ref={arrowRightRef}
          className="Carousel-arrow right"
          onClick={moveForward}
        >
          {!!customArrows?.rightArrow ? (
            customArrows?.rightArrow
          ) : (
            <ArrowRight />
          )}
        </button>
      )}
      <div
        className="Carousel-content"
        ref={contentRef}
        onDragStart={dragStart}
        onMouseUp={mouseUp}
        onMouseDown={mouseDown}
        onMouseMove={handleScroll}
        onMouseLeave={mouseUp}
        onScroll={onScroll}
      >
        {children}
      </div>
    </div>
  );
};
