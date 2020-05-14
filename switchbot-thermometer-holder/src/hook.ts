import hook from "./switchbot-thermometer-holder/hook";
import { parameterDefinitions, paramsToContext } from "common";

// NOTE: 一応この出力で使えたけど、もう1回作るなら改善の余地あり
//       - 厚さ1.6mmだと少し心もとない
//       - 内側にmarginを設定し忘れている
//       - 爪の厚みは1mmじゃちょっとゆるい
//       - 温湿度計ケースの下を支える形にしたい

export const main = (params) => {
  const ctx = paramsToContext(params);
  return hook(ctx);
};

export const getParameterDefinitions = () => {
  return parameterDefinitions;
};
