// utils/utils.js

/**
 * Format date string from news api.
 * @param str unformatted date string, eg. "2018-12-23T20:35:00.123Z"
 * @return date string, eg. "2018-12-23"
 */
function getDate(str) {
  let date = str.split("T")
  return date[0]
}

module.exports.getDate = getDate