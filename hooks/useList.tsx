import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function useList(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      query(collection(db, "movies"), where("uid", "==", uid)),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);
  return list;
}

export default useList;
