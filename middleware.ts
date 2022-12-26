import { verify } from "jsonwebtoken";
import { UserType } from "Models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserById } from "./lib/services/users";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";
// import { authenticateAccessToken } from "./lib/services/jwt";
// import { Request } from "./lib/services/jwt";
import cookie from "cookie";
import { getCookieParser } from "next/dist/server/api-utils";
import moment from "moment";
import dbConnect from "./lib/dbConnect";
export interface Request extends NextRequest {
  user: UserType; // Replace "any" with the type of your user object
}
export interface ApiRequest extends NextApiRequest {
  user: UserType; // Replace "any" with the type of your user object
}
//   export const authenticateAccessToken = async (
//     req: Request,
//     res: NextApiResponse
//   ) => {

//   };
export async function middleware(req: Request) {
  const res = NextResponse.next();
  const accessToken: string = req.cookies.get("accessToken")?.value || "";
  const refreshToken: string = req.cookies.get("refreshToken")?.value || "";
  console.log({ accessToken, refreshToken });
  if (!accessToken) {
    console.log("no access token");
    return NextResponse.rewrite(new URL("/api/error", req.url));
  }
  const accessSecret = new TextEncoder().encode(
    process.env.ACCESS_TOKEN_SECRET
  );
  const refreshSecret = new TextEncoder().encode(
    process.env.REFRESH_TOKEN_SECRET
  );

  try {
    const { payload } = await jwtVerify(accessToken, accessSecret);
    console.log(payload);
  } catch (err: any) {
    try {
      const alg = "HS256";
      console.log("access token not verify trying verify refresh");
      const { payload: decoded } = await jwtVerify(refreshToken, refreshSecret);
      const newAccessToken = await new SignJWT({
        email: decoded?.email,
        userId: decoded?.userId,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("1h")
        .sign(accessSecret);
      const newRefreshToken = await new SignJWT({
        email: decoded?.email,
        userId: decoded?.userId,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("2h")
        .sign(refreshSecret);
      //   await dbConnect();
      //   let user = await getUserByEmail(decoded?.email as string);

      //   if (!user) {
      //     user = (await getUserById(decoded?.userId as string)) as UserType;
      //   }

      //   if (!user) {
      //     return NextResponse.rewrite(new URL("/api/error", req.url));
      //   }
      //   req["user"] = user;
      req.cookies.delete("accessToken");
      req.cookies.delete("refreshToken");

      res.cookies
        .set({
          name: "accessToken",
          value: newAccessToken,
          httpOnly: true,
          expires: moment(new Date()).utc(true).add(1, "hours").toDate(),
          path: "/",
          sameSite: "strict",
        })
        .set({
          name: "refreshToken",
          value: newRefreshToken,
          httpOnly: true,
          expires: moment(new Date()).utc(true).add(6, "months").toDate(),
          path: "/",
          sameSite: "strict",
        });
      return res;
      // req.cookies.set("accessToken",accessToken)
      // req.cookies.set("refreshToken",refreshToken)
    } catch (err: any) {
      req.cookies.delete("accessToken");
      req.cookies.delete("refreshToken");
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      console.log("not verify refresh token - delete cookies", err);
      return NextResponse.rewrite(new URL("/api/error", req.url));
    }
  }
  //   return NextResponse.rewrite(new URL("/api/auth/verify", req.url));
}
export const config = {
  matcher: ["/api/users/:path*", "/dashboard/:path*"],
};
/*
accessToken as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      console.log(decoded);
      if (err) {
        return NextResponse.json({
          success: false,
          message: "Unauthorized user",
          err,
        });
        //   return await RefreshToken(req, res);
      }
      console.log("verify access token succeed", decoded);
      let user = await getUserByEmail(decoded?.email);
      if (!user) {
        user = (await getUserById(decoded?.userId)) as UserType;
      }
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "Unauthorized user",
          signIn: false,
        });
      }
      // req["user"] = user;
      //   return NextResponse.rewrite(new URL("/" + req.url, req.url));
      //   return res.redirect(NextResponse.next());
      //   return res;
      //   NextResponse;
      //   console.log(req.url);
      //   return res.redirect(307, "/api/users");
      //   return;
      //   redirect(res, 200);
      //   console.log(req.url);
    }
*/
