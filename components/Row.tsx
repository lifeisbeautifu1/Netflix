import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { DocumentData } from "firebase/firestore";
import { useState, useRef } from "react";

import { Thumbnail } from "./";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

const Row: React.FC<Props> = ({ title, movies }) => {
  const [isMoved, setIsMoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      if (!scrollTo) setIsMoved(false);
      containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm  font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        />
        <div
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
          ref={containerRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default Row;
