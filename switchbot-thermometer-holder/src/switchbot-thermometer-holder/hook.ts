import { primitives3d, booleanOps, transformations } from "@jscad/csg/api";
import { Context, printer } from "common";

const { cube, cylinder } = primitives3d;
const { translate, rotate } = transformations;
const { difference, union } = booleanOps;

// 対象特性
const barHeight = 40.0;
const barDepth = 20.0;

// パラメータ
const stickWidth = 20.0;
const nailMargin = 2.0;
const nailDepth = 1.0;
const nailR = 6.0;

function stick(ctx: Context, length: number) {
  const size = [
    printer.boardThickness,
    stickWidth,
    length + printer.boardThickness,
  ];
  const radius = [printer.boardThickness / 2, 0, printer.boardThickness / 2];
  const t = [-printer.boardThickness / 2, 0, -printer.boardThickness / 2];
  return translate(t, cube({ size, radius, fn: ctx.defaultFn() }));
}

interface INailProps {
  length: number;
  depth: number;
  r: number;
}

function nail(ctx: Context, props: INailProps) {
  let { length, r } = props;
  length += 2 * rSin(props);
  length += nailMargin;

  return difference(
    union(stick(ctx, length), nailCylinder(ctx, props)),
    nailCylinder(ctx, { ...props, rOffset: -printer.boardThickness }),
    nailMask(ctx, props)
  );
}

interface INailCylinderProps extends INailProps {
  rOffset?: number;
}

function nailCylinder(ctx: Context, props: INailCylinderProps) {
  const { length, depth, r } = props;
  const rOffset = props.rOffset || 0;
  const t = [printer.boardThickness / 2 + depth - r, 0, length + rSin(props)];
  return translate(
    t,
    rotate(
      [-90, 0, 0],
      cylinder({ r: r + rOffset, h: stickWidth, fn: ctx.defaultFn() })
    )
  );
}

function rSin(props: INailProps): number {
  const { depth, r } = props;
  return Math.sqrt(depth * (2 * r - depth));
}

function nailMask(ctx: Context, props: INailProps) {
  let { length, r } = props;
  return translate(
    [-printer.boardThickness / 2, 0, 0],
    cube([-2 * r, stickWidth, length + 2 * r + nailMargin + 10])
  );
}

export default function (ctx: Context) {
  const nailProps = {
    length: barHeight + printer.boardThickness / 2,
    depth: nailDepth,
    r: nailR,
  };
  return union(
    nail(ctx, nailProps),
    rotate([0, 90, 0], stick(ctx, barDepth + printer.boardThickness)),
    translate([barDepth + printer.boardThickness, 0, 0], stick(ctx, barHeight))
  );
}
