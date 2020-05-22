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

export const parameterDefinitions = [
  {
    name: "quality",
    type: "choice",
    caption: "Quality:",
    values: ["draft", "smooth"],
    captions: ["Draft (no rounded corners)", "Smooth (rounded corners)"],
    initial: "draft",
  },
];

export function paramsToContext(params: any): Context {
  let quality = Quality.Draft;
  switch (params.quality) {
    case "smooth":
      quality = Quality.Smooth;
  }
  return new Context(quality);
}
