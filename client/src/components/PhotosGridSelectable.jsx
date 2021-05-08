import React, { useState, useCallback } from "react";

import OrderPhotos from "./OrderPhotos";
import Photo from "./Photo";

/**
 * Selectable photos grid
 *
 * @param {object} props
 * @returns
 */
export default function PhotosGridSelectable({ photos }) {
  const [selection, setSelection] = useState({});
  const [ordering, setOrdering] = useState([]);

  /**
   * Toggle selection
   *
   * @param {number} id
   * @returns
   */
  const toggleSelect = useCallback(
    (photo) => {
      if (Object.keys(selection).length > 8 && !selection[photo.id]) {
        alert("You have already selected the maximum number of photos");
        return;
      }

      if (selection[photo.id]) {
        // remove from the selection
        setSelection((state) => {
          const { [photo.id]: _, ...rest } = state;
          return rest;
        });
      } else {
        // add to selection
        setSelection((state) => ({
          ...state,
          [photo.id]: photo,
        }));
      }
    },
    [selection]
  );

  /**
   * Move to order UI
   *
   * @returns
   */
  const orderNow = () => {
    if (Object.keys(selection).length < 9) {
      alert("Please select 9 photos");
      return;
    }
    setOrdering(Object.values(selection));
  };

  if (ordering.length > 0) {
    return <OrderPhotos photos={ordering} />;
  }

  return (
    <div className="text-center p-4">
      <p className="text-sm text-gray-600 mb-4">
        Please select 9 photos by clicking on photos. Once you have selected 9
        photos, click on "Order" button to order them as you prefer
      </p>
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <div className="space-x-2 flex justify-between">
            <span>
              {Object.keys(selection).length > 1 && (
                <button
                  type="button"
                  className="p-5"
                  onClick={() => {
                    setSelection([]);
                  }}
                  data-test-id="btn-unselect-all"
                >
                  Unselect All
                </button>
              )}
            </span>
            <button
              type="button"
              className="p-5 bg-blue-300"
              onClick={orderNow}
              data-test-id="btn-order"
            >
              Order
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo) => (
              <Photo
                key={photo.id}
                photo={photo}
                onClick={toggleSelect}
                selected={selection[photo.id] !== undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
