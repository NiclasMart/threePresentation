export default class Sizes {

  width!: number;
  height!: number;
  aspectRatio!: number;

  onChange: ((sizes: Sizes) => void)[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.aspectRatio = width / height;
  }

  updateSizes(newWidth: number, newHeight: number) {
    this.width = newWidth;
    this.height = newHeight;
    this.aspectRatio = newWidth / newHeight;
    this.onChange.forEach(func => func(this));
  }
}
