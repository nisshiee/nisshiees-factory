export enum Quality {
  Draft,
  Smooth,
}

export default class Context {
  quality: Quality;

  constructor(quality: Quality) {
    this.quality = quality;
  }

  defaultFn() {
    switch (this.quality) {
      case Quality.Draft:
        return 16;
      case Quality.Smooth:
        return 100;
    }
  }
}
