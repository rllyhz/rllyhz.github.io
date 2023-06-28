const _sanitizePath = (path = "") => {
  const chars = Array.from(path);

  if (chars[0] === "/") chars.shift();
  if (chars[chars.length - 1] === "/") chars.pop();

  return chars.join("");
};

const toPath = (path = "/") => `#/${_sanitizePath(path)}`;
const toPublicPath = (path = "/") => `/${_sanitizePath(path)}`;

export {
  toPath,
  toPublicPath,
};
