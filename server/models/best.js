const mongoose = require('mongoose');

const bestSchema = new mongoose.Schema(
  {
    photos: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Get the latest best photos selection
 *
 * @returns {object | undefined}
 */
bestSchema.statics.getLatest = async function getLatest() {
  try {
    const photos = await this.find({}).sort({ _id: -1 }).limit(1);

    if (photos.length === 0) {
      return undefined;
    }

    return photos[0];
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

/**
 * Reset all selection by removing all history records
 *
 * @returns boolean
 */
bestSchema.statics.reset = async function reset() {
  try {
    await this.deleteMany({});
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const Best = mongoose.model('Best', bestSchema);

module.exports = Best;
