import { primitives3d, booleanOps, transformations } from "@jscad/csg/api";
import { Context, printer } from "common";

const { cube } = primitives3d;
const { translate } = transformations;
const { difference, union } = booleanOps;

// 対象特性
const meterHeight = 54.4;
const meterWidth = 54.4;
const meterDepth = 24.0;
const meterFrame = 7.7;

// パラメータ
const heightRatio = 0.7;
const frameHolderRatio = 0.7;

export const width =
  meterWidth + (printer.boardThickness + printer.obtuseAngleMargin) * 2;
export const height =
  meterHeight * heightRatio +
  printer.boardThickness +
  printer.obtuseAngleMargin;
export const depth =
  meterDepth + (printer.boardThickness + printer.obtuseAngleMargin) * 2;

const center = [true, false, false];

function whole(ctx: Context) {
  const size = [width, height, depth];
  const radius = printer.boardThickness;
  return cube({ size, center, radius, fn: ctx.defaultFn() });
}

function hole(ctx: Context) {
  const size = [
    meterWidth + printer.obtuseAngleMargin * 2,
    meterHeight + printer.obtuseAngleMargin,
    meterDepth + printer.obtuseAngleMargin * 2,
  ];
  const t = [0, printer.boardThickness, printer.boardThickness];
  return translate(t, cube({ size, center, fn: ctx.defaultFn() }));
}

function display(ctx: Context) {
  const size = [
    meterWidth - meterFrame * frameHolderRatio * 2,
    meterHeight,
    printer.boardThickness + 1,
  ];
  const t = [
    0,
    meterFrame * frameHolderRatio +
      printer.boardThickness +
      printer.obtuseAngleMargin,
    -0.5,
  ];
  return translate(t, cube({ size, center }));
}

export default function (ctx: Context) {
  return difference(whole(ctx), hole(ctx), display(ctx));
}
