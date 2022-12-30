import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import {
  deleteDoc,
  addDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

import { FaPlay } from "react-icons/fa";
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import ReactPlayer from "react-player/lazy";
import toast from "react-hot-toast";

import { modalState } from "../atom/modalAtom";
import { movieState } from "../atom/movieAtom";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const currentMovie = useRecoilValue(movieState);

  const [trailer, setTrailer] = useState("");

  const [muted, setMuted] = useState(false);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [addedToList, setAddedToList] = useState(false);

  const { user } = useAuth();

  const list = useList(user?.uid);

  useEffect(() => {
    if (!currentMovie) return;
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currentMovie?.media_type === "tv" ? "tv" : "movie"
        }/${currentMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };
    fetchMovie();
  }, [currentMovie]);

  const handleClose = () => {
    setShowModal(false);
    toast.dismiss();
  };

  const handleList = async () => {
    if (addedToList) {
      const docRef = await getDocs(
        query(
          collection(db, "movies"),
          where("uid", "==", user?.uid),
          where("id", "==", currentMovie?.id)
        )
      );
      docRef.forEach((d) => deleteDoc(doc(db, "movies", d?.id)));

      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await addDoc(collection(db, "movies"), {
        uid: user?.uid,
        ...currentMovie,
      });

      toast(
        `${
          currentMovie?.title || currentMovie?.original_name
        } has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  useEffect(
    () =>
      setAddedToList(
        list.findIndex((result) => result.id === currentMovie?.id) !== -1
      ),
    [list]
  );

  return (
    <MuiModal
      className="fixed !top-7 left-0 right-0 mx-auto z-50 w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transtiion hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
              </button>

              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>

              <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {currentMovie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
