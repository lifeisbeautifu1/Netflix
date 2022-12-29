import Image from "next/image";
import { useRecoilState } from "recoil";
import { DocumentData } from "firebase/firestore";

import { modalState } from "../atom/modalAtom";
import { movieState } from "../atom/movieAtom";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail: React.FC<Props> = ({ movie }) => {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  const handleClick = () => {
    setCurrentMovie(movie);
    setShowModal(true);
  };
  return (
    <div
      onClick={handleClick}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt="thumbnail"
        layout="fill"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
};

export default Thumbnail;
