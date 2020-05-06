import hook from "./switchbot-thermometer-holder/hook";
import { Context, Quality } from "common";

// NOTE: 一応この出力で使えたけど、もう1回作るなら改善の余地あり
//       - 厚さ1.6mmだと少し心もとない
//       - 内側にmarginを設定し忘れている
//       - 爪の厚みは1mmじゃちょっとゆるい
//       - 温湿度計ケースの下を支える形にしたい

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
  return hook(ctx);
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
