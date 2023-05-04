import { MutableRefObject, useRef } from "react";

interface iInitialState {
  lastMouseX: number | undefined;
  isMouseDown: boolean;
  isScrolling: boolean;
}

export const useCarousel = () => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const initialState: MutableRefObject<iInitialState> = useRef({
    lastMouseX: undefined,
    isMouseDown: false,
    isScrolling: false,
  });
  const arrowLeftRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const arrowRightRef: MutableRefObject<HTMLButtonElement | null> =
    useRef(null);

  const moveForward = () => {
    const ref = contentRef.current;
    const children = contentRef.current?.children.length;
    if (!children || !ref) return;

    contentRef.current?.scrollTo({
      left: ref.scrollLeft + ref.clientWidth / children,
      behavior: "smooth",
    });
  };

  const moveBack = () => {
    const ref = contentRef.current;
    const children = contentRef.current?.children.length;
    if (!children || !ref) return;

    contentRef.current?.scrollTo({
      left: ref.scrollLeft - ref.clientWidth / children,
      behavior: "smooth",
    });
  };

  const runScroll = (dx: number) => {
    if (!contentRef.current) return;
    const offsetX = Math.min(
      contentRef.current.scrollWidth - contentRef.current.clientWidth,
      contentRef.current.scrollLeft + dx
    );
    contentRef.current.scrollLeft = offsetX;
  };

  const handleScroll = (e: React.MouseEvent) => {
    const state = initialState.current;
    if (!state.isMouseDown || !state.lastMouseX) return;

    if (!state.isScrolling) state.isScrolling = true;

    const dx = -(e.clientX - state.lastMouseX);
    state.lastMouseX = e.clientX;

    runScroll(dx);
  };

  const mouseDown = (e: React.MouseEvent) => {
    initialState.current.isMouseDown = true;
    initialState.current.lastMouseX = e.clientX;
  };

  const mouseUp = () => {
    initialState.current.isMouseDown = false;
    initialState.current.lastMouseX = undefined;
    if (initialState.current.isScrolling)
      initialState.current.isScrolling = false;
  };

  const dragStart = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return {
    moveBack,
    moveForward,
    contentRef,
    dragStart,
    mouseUp,
    mouseDown,
    handleScroll,

    arrowLeftRef,
    arrowRightRef,
  };
};
