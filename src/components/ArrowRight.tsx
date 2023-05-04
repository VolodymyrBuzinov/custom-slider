import { FC } from "react";

interface iArrowRight {
  className?: string;
}

export const ArrowRight: FC<iArrowRight> = ({ className = "" }) => {
  return (
    <svg className={`Icon ArrowRight ${className}`} viewBox="0 0 24 24">
      <path d="M5.859 4.125l2.156-2.109 9.984 9.984-9.984 9.984-2.156-2.109 7.922-7.875z"></path>
    </svg>
  );
};
