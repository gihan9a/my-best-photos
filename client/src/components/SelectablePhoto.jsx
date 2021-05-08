import React from 'react';
import Photo from './Photo';

function SelectablePhoto({ photo, selected = false, onClick = undefined }) {
  const clicked = () => {
    if (onClick) {
      onClick(photo);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      className={`bg-blue-50 ${selected ? 'border-blue-400 border-4' : ''}`}
      onClick={clicked}
      onKeyDown={clicked}
    >
      <Photo src={photo.picture} alt={photo.message} selected={selected} onClick={onclick} />
    </div>
  );
}

export default React.memo(SelectablePhoto);
