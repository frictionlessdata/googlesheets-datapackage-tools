const md5 = (digest) => {
  return digest.map(byte => (byte + 256) % 256)
    .map(byte => byte.toString(16))
    .map(byteString => `0${byteString}`.slice(-2))
    .join('');
};

const slugify = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export {
  md5,
  slugify
};
