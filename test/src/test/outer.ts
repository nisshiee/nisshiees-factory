import { primitives3d, booleanOps } from "@jscad/csg/api";
import { Context, Quality } from "./context";

const { cube, sphere } = primitives3d;
const { difference } = booleanOps;

export default (ctx: Context) => {
  const fn = ctx.defaultFn();
  return difference(
    cube({ size: 3, center: true, fn }),
    sphere({ r: 2, center: true, fn })
  );
};
