import { primitives3d, booleanOps } from "@jscad/csg/api";
import { Context, Quality } from "./context";

const { cube, sphere } = primitives3d;
const { intersection } = booleanOps;

export default (ctx: Context) => {
  const fn = ctx.defaultFn();
  return intersection(
    sphere({ r: 1.3, center: true, fn }),
    cube({ size: 2.1, center: true, fn })
  );
};
