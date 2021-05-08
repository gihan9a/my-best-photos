import { useState, useCallback, useEffect } from "react";

export default function useSelectedPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState();

  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const photos = await fetch(
        process.env.REACT_APP_API_URL + "/photos"
      ).then((res) => res.json());
      setPhotos(photos);
    } catch (err) {
      setPhotos([]);
      console.error(err);
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
