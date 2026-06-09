export function getImageDimensions(
  src: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      reject(new Error("Could not read image dimensions."));
    };

    image.src = src;
  });
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
