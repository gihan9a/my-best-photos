import React from 'react';
import PropTypes from 'prop-types';

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

PhotosGrid.propTypes = {
  photos: PropTypes.array.isRequired,
}

export default React.memo(PhotosGrid);
