import React, { useState } from "react";

import PhotosGridSelectable from "./components/PhotosGridSelectable";
import PhotosGrid from "./components/PhotosGrid";

import useUploadedPhotos from "./hooks/useUploadedPhotos";
import useSelectedPhotos from "./hooks/useSelectedPhotos";

function App() {
  const {
    loading: loadingUploaded,
    photos: uploadedPhotos,
  } = useUploadedPhotos();
  const {
    loading: loadingSelected,
    photos: selectedPhotos,
  } = useSelectedPhotos();

  const [showSelection, setShowSelection] = useState(false);
  const [showUploaded, setShowUploaded] = useState(false);

  /**
   * Change selected photos
   */
  const changeSelection = () => {
    setShowSelection(false);
    setShowUploaded(true);
  };

  if (!loadingSelected && showSelection) {
    return (
      <div>
        <div className="space-x-2">
          <button
            type="button"
            className="bg-blue-300 p-5"
            onClick={() => {
              changeSelection();
            }}
          >
            Change Selection
          </button>
        </div>
        <div className="flex h-full content-center justify-center">
          <PhotosGrid photos={selectedPhotos} />
        </div>
      </div>
    );
  }

  if (
    showUploaded ||
    (selectedPhotos && selectedPhotos.length === 0 && uploadedPhotos)
  ) {
    return (
      <PhotosGridSelectable
        photos={uploadedPhotos.entries}
        selected={selectedPhotos}
      />
    );
  }

  return <div className="relative p-4">Loading...</div>;
}

export default App;
