const isOnMobileScreen = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return vw <= 680;
};

const isOnMediumScreen = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return vw > 680 && vw <= 820;
};

const isOnLargeScreen = () => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return vw > 820;
};

export {
  isOnMobileScreen,
  isOnMediumScreen,
  isOnLargeScreen,
};
