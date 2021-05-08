import React from 'react';

import Photo from './Photo';

function PhotosGrid({ photos }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
}

export default React.memo(PhotosGrid);
