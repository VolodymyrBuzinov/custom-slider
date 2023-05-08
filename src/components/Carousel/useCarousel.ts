import { MutableRefObject, useEffect, useRef, useState } from "react";

interface iInitialState {
  lastMouseX: number | undefined;
  isMouseDown: boolean;
  isScrolling: boolean;
}

interface iUseCarousel {
  elementIndexToFocus?: number;
  updateDataCallback?: () => void;
  infinite?: boolean;
}

const initialState = {
  lastMouseX: undefined,
  isMouseDown: false,
  isScrolling: false,
};

export const useCarousel = ({
  elementIndexToFocus,
  updateDataCallback,
  infinite,
}: iUseCarousel) => {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const state: MutableRefObject<iInitialState> = useRef(initialState);
  const arrowLeftRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const arrowRightRef: MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const [initialDataLength, setInitialDataLength] = useState(0);
  const childrenAdded = useRef(false);

  useEffect(() => {
    if (!childrenAdded.current) {
      if (!contentRef.current) return;
      setInitialDataLength(contentRef.current.children.length);
      Array.from(contentRef.current?.children).forEach((child) =>
        contentRef.current?.appendChild(child.cloneNode(true))
      );
    }
    childrenAdded.current = true;
  });

  useEffect(() => {
    if (!elementIndexToFocus) return;
    const element = contentRef.current?.children[elementIndexToFocus - 1];
    if (!contentRef.current || !element) return;
    element.scrollIntoView({ inline: "start" });
  }, [elementIndexToFocus]);

  const moveForward = () => {
    const ref = contentRef.current;
    const children = contentRef.current?.children.length;
    if (!children || !ref) return;

    contentRef.current?.scrollTo({
      left: ref.scrollLeft + ref.scrollWidth / children,
      behavior: "smooth",
    });
  };

  const moveBack = () => {
    const ref = contentRef?.current;
    const children = ref?.children?.length;
    if (!children || !ref) return;

    contentRef.current?.scrollTo({
      left: ref.scrollLeft - ref.scrollWidth / children,
      behavior: "smooth",
    });
  };

  const runScroll = (dx: number) => {
    const ref = contentRef.current;
    if (!ref) return;

    const offsetX = Math.min(
      ref.scrollWidth - ref.clientWidth,
      ref.scrollLeft + dx
    );

    ref.scrollLeft = offsetX;
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

  const mouseUp = () => {
    state.current.isMouseDown = false;
    state.current.lastMouseX = undefined;
    state.current.isScrolling = false;
  };

  const onScroll = () => {
    const ref = contentRef?.current;
    if (!ref) return;
    const children = ref.children;
    const maxLength = initialDataLength * 2;
    let timeout;

    timeout && clearTimeout(timeout);

    if (ref?.scrollLeft < ref.scrollWidth - ref.clientWidth) return;

    if (!infinite && updateDataCallback) return updateDataCallback();

    const newArr = Array.from(children).slice(-initialDataLength);

    ref.replaceChildren(...newArr);
    timeout = setTimeout(() => {
      ref.appendChild(children[0].cloneNode(true));
    }, 10);
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
  };
};
