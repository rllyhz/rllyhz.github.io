const sanitizePath = (path = "") => {
  const chars = Array.from(path);

  if (chars[0] === "/") chars.shift();
  if (chars[chars.length - 1] === "/") chars.pop();

  return chars.join("");
};

const toPath = (path = "/") => `#/${sanitizePath(path)}`;
const toPublicPath = (path = "/") => `${sanitizePath(path)}`;

export {
  sanitizePath,
  toPath,
  toPublicPath,
};
