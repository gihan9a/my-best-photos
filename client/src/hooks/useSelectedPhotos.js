import { useState, useCallback, useEffect } from "react";

export default function useSelectedPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState();

  /**
   * Get best photos selection
   */
  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetch(
        process.env.REACT_APP_API_URL + "/photos"
      ).then((res) => res.json());
      setPhotos(data ? data.photos : []);
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

  /**
   * Set best photos
   */
  const setBest = useCallback(
    async (photos) => {
      try {
        const result = await fetch(process.env.REACT_APP_API_URL + "/photos", {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({ photos }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        if (result.ok) {
          setPhotos(result.data.photos);
        }
      } catch (err) {}
    },
    [setPhotos]
  );

  return { loading, photos, setBest };
}
