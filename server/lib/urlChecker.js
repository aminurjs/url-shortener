function ensureHttp(url) {
  const regex = /^https?:\/\//;

  if (regex.test(url)) {
    return url;
  } else {
    return "http://" + url;
  }
}

module.exports = ensureHttp;
