import { booleanOps } from "@jscad/csg/api";
import { Context, Quality } from "./test/context";
import inner from "./test/inner";
import outer from "./test/outer";

const { union } = booleanOps;

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
  return union(outer(ctx), inner(ctx));
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
