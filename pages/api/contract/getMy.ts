import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { getContract } from "@/lib/services/contracts";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const userId: string = res.getHeader("X-HEADER")?.toString() || "";
      const headers = res.getHeaders();

      console.log("userid from middleware ", userId);
      console.log("headers from middleware ", headers);
      if (!userId) return res.status(401).json("not Authorized");

      const data = await getContract(userId);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
