/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Photo from "./Photo";
import SortablePhoto from "./SortablePhoto";
import useSelectedPhotos from "../hooks/useSelectedPhotos";

/**
 * Order Photos component
 *
 * @param {props}
 * @returns
 */
export default function OrderPhotos({ photos }) {
  const [orderedPhotos, setOrderedPhotos] = useState(photos);
  const [activePhoto, seActivePhoto] = useState(null);
  const [saved, setSaved] = useState("");
  const [processing, setProcessing] = useState(false);

  const { setBest } = useSelectedPhotos();

  // update the ordering of the photos after drag end
  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrderedPhotos((_photos) => {
        const oldIndex = _photos.findIndex((a) => a.id === active.id);
        const newIndex = _photos.findIndex((a) => a.id === over.id);

        return arrayMove(_photos, oldIndex, newIndex);
      });
    }
    seActivePhoto(null);
  };

  const onDragStart = (event) => {
    const { active } = event;
    const selected = photos.find((photo) => photo.id === active.id);
    seActivePhoto(selected);
  };

  // persist the order
  const save = async () => {
    setSaved("");
    setProcessing(true);
    try {
      await setBest(orderedPhotos);
      setSaved("Saved!");
    } catch (err) {
      setSaved("Error!");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <div className="text-center p-4">
        <p className="text-sm text-gray-600">
          You can drag the photos to reorder them as you prefer
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="text-right">
              <button
                type="button"
                className="p-5 bg-blue-300"
                onClick={save}
                disabled={processing}
                data-test-id="btn-save"
              >
                {processing ? "Saving..." : "Save"}
              </button>
              {saved !== "" && (
                <>
                  <span className="pl-2">{saved}</span>
                  <div>Yay!, Refresh this page to view your photos</div>
                </>
              )}
            </div>
          </div>
          <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <SortableContext items={orderedPhotos}>
              <div className="grid grid-cols-3 gap-4">
                {orderedPhotos.map((photo) => (
                  <SortablePhoto
                    key={photo.id}
                    photo={photo}
                    active={activePhoto && photo.id === activePhoto.id}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activePhoto ? <Photo photo={activePhoto} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

OrderPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
};
