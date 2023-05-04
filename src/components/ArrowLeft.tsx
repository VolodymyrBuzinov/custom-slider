import { FC } from "react";

interface iArrowLeft {
  className?: string;
}

export const ArrowLeft: FC<iArrowLeft> = ({ className = "" }) => {
  return (
    <svg className={`Icon ArrowLeft ${className}`} viewBox="0 0 24 24">
      <path d="M11.672 3.891l-8.109 8.109 8.109 8.109-1.781 1.781-9.891-9.891 9.891-9.891z"></path>
    </svg>
  );
};
