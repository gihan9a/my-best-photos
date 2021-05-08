const apiResponse = (ok = true, data, message) => {
  const response = { ok };
  if (data) {
    response.data = data;
  }
  if (message) {
    response.message = message;
  }
  return response;
};

/**
 * Respond with OK
 *
 * @param {any} data Data to send
 * @param {string} message Message
 *
 * @returns {object} Returns JSON object
 */
module.exports.respondOK = (data, message) => apiResponse(true, data, message);

/**
 * Respond with Error
 *
 * @param {message} message Error message
 *
 * @returns {object}
 */
module.exports.respondError = (message) => apiResponse(false, {}, message);
