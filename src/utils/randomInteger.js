export const randomInteger = (min = 1, max = 98) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random).toString().padStart(2, '0');
};
