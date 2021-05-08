const { Best } = require('../models');

const { respondOK, respondError } = require('../lib/utils');

/**
 * Get latest best selection
 *
 * @returns {object}
 */
module.exports.getLatest = async () => {
  try {
    const latest = await Best.getLatest();
    if (!latest) {
      return respondOK();
    }
    return respondOK(latest.toObject());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return respondError('Failed to find the latest');
  }
};

/**
 * Add a new collection
 *
 * @param {object} photos
 * @returns
 */
module.exports.add = async (photos) => {
  try {
    const best = new Best({
      photos,
    });
    await best.save();
    return respondOK(best.toObject());
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return respondError('Failed to save');
  }
};

/**
 * Remove all selection
 *
 * @returns {object}
 */
module.exports.remove = async () => {
  try {
    const result = await Best.reset();
    return result ? respondOK() : respondError();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return respondError('Failed to remove');
  }
};
