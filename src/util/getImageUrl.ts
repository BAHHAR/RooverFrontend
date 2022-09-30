export const getImageUrl = (image: string): string => {
  if (image.startsWith("http")) return image;
  return process.env.REACT_APP_BACKEND_URL + image;
};
