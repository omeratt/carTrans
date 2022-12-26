import { createUser, getUsers } from "@/lib/services/users";
import Error from "next/error";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { UserType } from "Models/User";
// import cookieCutter from "cookie-cutter";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserType | { error: string }>
) => {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log("first");
      const user = await createUser(data);
      console.log("second");
      return res.status(200);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
