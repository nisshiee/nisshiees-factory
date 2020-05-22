import holder from "./switchbot-thermometer-holder/holder";
import { paramsToContext, parameterDefinitions } from "common";

export const main = (params) => {
  const ctx = paramsToContext(params);
  return holder(ctx);
};

export const getParameterDefinitions = () => {
  return parameterDefinitions;
};
