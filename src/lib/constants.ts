export const COLORS = ["#1026B5", "#108EB5", "#105AB5"];

const IMAGE_LENGTH = 12;

export const initialImage = Array.from({ length: IMAGE_LENGTH }, () =>
  Array.from({ length: IMAGE_LENGTH }, () => -1),
);
