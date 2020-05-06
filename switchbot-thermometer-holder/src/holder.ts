import holder from "./switchbot-thermometer-holder/holder";
import { Context, Quality } from "common";

const paramToContext = (params) => {
  let quality = Quality.Draft;
  switch (params.quality) {
    case "smooth":
      quality = Quality.Smooth;
  }
  return new Context(quality);
};

export const main = (params) => {
  const ctx = paramToContext(params);
  return holder(ctx);
};

export const getParameterDefinitions = () => {
  return [
    {
      name: "quality",
      type: "choice",
      caption: "Quality:",
      values: ["draft", "smooth"],
      captions: ["Draft (no rounded corners)", "Smooth (rounded corners)"],
      initial: "draft",
    },
  ];
};
