/**
 * Ensures a URL starts with http:// or https://
 * @param {string} url - The URL to check
 * @returns {string} The URL with http:// prepended if it didn't have a protocol
 */
export function ensureHttp(url) {
  const regex = /^https?:\/\//;

  if (regex.test(url)) {
    return url;
  } else {
    return "http://" + url;
  }
}
