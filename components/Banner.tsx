import { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

import { movieState } from "../atom/movieAtom";
import { modalState } from "../atom/modalAtom";
import { baseUrl } from "../constants/movie";

interface Props {
  netflixOriginals: Movie[];
}

const Banner: React.FC<Props> = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState<Movie | null | DocumentData>(null);

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const [showModal, setShowModal] = useRecoilState(modalState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  const handleClick = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  return (
    <section
      className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh]
   lg:justify-end lg:pb-12"
    >
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          layout="fill"
          objectFit="cover"
          alt="Poster"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-4">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button onClick={handleClick} className="bannerButton bg-[gray]/70">
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </section>
  );
};

export default Banner;
