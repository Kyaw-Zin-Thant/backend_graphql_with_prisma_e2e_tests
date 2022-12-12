import { rule } from "graphql-shield"
import { verifyToken } from "../../utils/index"

export const isAuthorized = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();

  const data = verifyToken(token);
  console.log(data)
  return !!data;
})