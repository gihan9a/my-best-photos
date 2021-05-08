import { useState, useCallback, useEffect } from "react";

export default function useUploadedPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState();

  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const uploaded = await fetch(
        "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json"
      ).then((res) => res.json());
      setPhotos(uploaded);
    } catch (err) {
      console.error(err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (photos === undefined) {
      getPhotos();
    }
  }, [photos, getPhotos]);

  return { loading, photos };
}
