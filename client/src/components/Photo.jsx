/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';

function Photo(
  {
    photo, onClick = undefined, selected = false, ...props
  },
  ref,
) {
  const clicked = () => {
    if (onClick) {
      onClick(photo);
    }
  };
  let attribs = {
    ...props,
  };
  if (onClick !== undefined) {
    attribs = {
      ...attribs,
      tabIndex: '0',
      role: 'button',
    };
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`bg-blue-50 h-60 w-60 ${
        selected ? 'border-blue-400 border-4' : ''
      }`}
      ref={ref}
      onClick={clicked}
      onKeyDown={clicked}
      {...attribs}
    >
      <img
        src={photo.picture}
        alt={photo.message}
        className="object-cover object-center h-full w-full"
      />
    </div>
  );
}

const PhotoForwardRef = forwardRef(Photo);

export default React.memo(PhotoForwardRef);
