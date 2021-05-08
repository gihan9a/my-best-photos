/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Photo from "./Photo";

export default function SortablePhoto({ photo, active }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: active ? "hidden" : "visible",
  };

  return (
    <Photo
      photo={photo}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}

SortablePhoto.propTypes = {
  photo: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};
