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
  const timeout: MutableRefObject<ReturnType<typeof setTimeout> | null> =
    useRef(null);

  useEffect(() => {
    if (!childrenAdded.current) {
      const ref = contentRef.current;
      if (!infinite || !ref || !ref.lastChild) return;
      ref?.insertBefore(ref.lastChild, ref.firstChild);

      elementIndexToFocus = 1;
    }
  }, [infinite]);

  useEffect(() => {
    if (!childrenAdded.current) {
      if (!contentRef.current) return;
      setInitialDataLength(contentRef.current.children.length);
      Array.from(contentRef.current?.children).forEach((child) => {
        contentRef.current?.appendChild(child.cloneNode(true));
      });
    }
    childrenAdded.current = true;
  });

  useEffect(() => {
    if (!elementIndexToFocus) return;
    const element = contentRef.current?.children[elementIndexToFocus];
    if (!contentRef.current || !element) return;
    element.scrollIntoView({ inline: "start" });

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
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

    timeout.current && clearTimeout(timeout.current);

    const newArrr = Array.from(children).slice(0, initialDataLength);

    if (ref?.scrollLeft <= 0) {
      ref.replaceChildren(...newArrr);
      return (timeout.current = setTimeout(() => {
        ref.lastChild && ref.prepend(ref.lastChild?.cloneNode(true));
        ref.scrollTo({
          left: ref?.children[0]?.scrollWidth,
        });
      }, 10));
    }

    if (ref?.scrollLeft < ref.scrollWidth - ref.clientWidth) return;

    if (updateDataCallback && !infinite) return updateDataCallback();

    const newArr = Array.from(children).slice(-initialDataLength);

    ref.replaceChildren(...newArr);

    timeout.current = setTimeout(() => {
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
