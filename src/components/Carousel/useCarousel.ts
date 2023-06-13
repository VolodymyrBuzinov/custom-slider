import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface iInitialState {
  lastMouseX: number | undefined;
  isMouseDown: boolean;
  isScrolling: boolean;
  transform: number
}

interface iUseCarousel {
  currentSlideIndex?: number;
  updateDataCallback?: () => void;
  infinite?: boolean;
  children: ReactNode[];
  itemsInSlide: number;
}

const initialState = {
  lastMouseX: undefined,
  isMouseDown: false,
  isScrolling: false,
  transform: 0
};

export const useCarousel = ({
  currentSlideIndex = 0,
  updateDataCallback,
  infinite,
  children,
  itemsInSlide,
}: iUseCarousel) => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const state: MutableRefObject<iInitialState> = useRef(initialState);
  const arrowLeftRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const arrowRightRef: MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const [initialDataLength, setInitialDataLength] = useState(0);
  const childrenAdded = useRef(false);
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | null> =
    useRef(null);

  const [slides, setSlides] = useState<ReactNode[]>(children);
  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex);

  console.log(currentSlide, "currentSlide");

  // useEffect(() => {
  //   scrollToSlide();
  // }, [currentSlide]);

  const scrollToSlide = (slide?: number) => {
    const ref = contentRef.current;
    const slideIndex = slide || currentSlide * itemsInSlide;
    if (!ref || slides[slideIndex] === undefined) return;
    ref.children?.[slideIndex]?.scrollIntoView({
      inline: "start",
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   if (!childrenAdded.current) {
  //     const newSlide: any = slides[slides.length - 1];
  //     if (!infinite || !newSlide) return;

  //     setSlides((pv) => [
  //       React.cloneElement(newSlide, { key: slides.length + 1 }),
  //       ...pv,
  //     ]);
  //     setCurrentIndex(1);
  //   }
  // }, [infinite]);

  // useEffect(() => {
  //   if (!childrenAdded.current) {
  //     if (!contentRef.current) return;
  //     setInitialDataLength(contentRef.current.children.length);
  //     Array.from(contentRef.current?.children).forEach((child) => {
  //       contentRef.current?.appendChild(child.cloneNode(true));
  //     });
  //   }
  //   childrenAdded.current = true;
  // });

  // useEffect(() => {
  //   if (!elementIndexToFocus) return;
  //   const element = contentRef.current?.children[elementIndexToFocus];
  //   if (!contentRef.current || !element) return;
  //   element.scrollIntoView({ inline: "start" });

  //   return () => {
  //     timeout.current && clearTimeout(timeout.current);
  //   };
  // }, [elementIndexToFocus]);



  const moveForward = () => {
    // if (currentSlide >= Math.floor((slides.length - 1) / itemsInSlide)) return;
    // setCurrentSlide(currentSlide + 1);
  };

  const moveBack = () => {
    // if (currentSlide === 0) return;
    // setCurrentSlide(currentSlide - 1);
  };

  const runScroll = (dx: number) => {
    const ref = contentRef.current;
    if (!ref) return;

    const offsetX = Math.min(
      ref.scrollWidth - ref.clientWidth,
      ref.scrollLeft + dx
    );

    console.log(ref.clientWidth, "ref.clientWidth");


    state.current.transform -= offsetX

    ref.style.transform = `translateX(${state.current.transform}px)`;
  };

  const handleScroll = (e: React.MouseEvent) => {
    const newState = state.current;

    if (!newState.isMouseDown || !newState.lastMouseX) return;

    if (!newState.isScrolling) newState.isScrolling = true;

    const dx = -(e.clientX - newState.lastMouseX);

    newState.lastMouseX = e.clientX;

    runScroll(dx);
  };

  const mouseDown = (e: React.MouseEvent) => {
    state.current.isMouseDown = true;
    state.current.lastMouseX = e.clientX;
  };

  const mouseUp = (e: React.MouseEvent) => {
    state.current.isMouseDown = false;
    state.current.lastMouseX = undefined;
    state.current.isScrolling = false;

    const ref = contentRef.current;
    if (!ref) return;

    let sum = 0;

    slides.forEach((item, i) => {
      if (ref.children[i]) sum += ref.children[i].scrollWidth;
    });

    const slide = currentSlide + 1;

    const oneSlideWidth = (sum / slides.length) * itemsInSlide;

    // if (ref.scrollLeft >= slide * oneSlideWidth * 0.2) {
    //   if (currentSlide >= Math.floor((slides.length - 1) / itemsInSlide))
    //     return;
    //   setCurrentSlide((pv) => pv + 1);
    // } else {

    //   setCurrentSlide((pv) => (currentSlide === 0 ? 0 : pv - 1));
    // }

    const newState = state.current;

    if (!newState.lastMouseX) return;
    const dx = -(e.clientX - newState.lastMouseX);
    console.log(dx);
  };

  const onScroll = () => {
    // const ref = contentRef?.current;
    // if (!ref) return;
    // const children = ref.children;
    // timeout.current && clearTimeout(timeout.current);
    // let newData = slides.slice(0, initialDataLength - 1);
    // if (ref?.scrollLeft <= 0) {
    //   const lastElement = slides[slides.length - 1];
    //   if (!!lastElement) newData = [lastElement].concat(newData);
    //   setSlides(newData);
    //   return (timeout.current = setTimeout(() => {
    //     ref.scrollTo({
    //       left: ref?.children[0]?.scrollWidth,
    //     });
    //   }, 0));
    // }
    // if (ref?.scrollLeft < ref.scrollWidth - ref.clientWidth) return;
    // if (updateDataCallback && !infinite) return updateDataCallback();
    // const newArr = Array.from(children).slice(-initialDataLength);
    // ref.replaceChildren(...newArr);
    // timeout.current = setTimeout(() => {
    //   ref.appendChild(children[0].cloneNode(true));
    // }, 10);
  };

  const dragStart = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return {
    contentRef,
    arrowLeftRef,
    arrowRightRef,
    moveBack,
    moveForward,
    dragStart,
    mouseUp,
    mouseDown,
    handleScroll,
    onScroll,
    slides,
  };
};
