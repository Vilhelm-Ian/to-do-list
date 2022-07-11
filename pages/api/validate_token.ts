import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import UserModel from "../../models/userModel";
import jwt from "jsonwebtoken";

async function run(token: string) {
  let secret = String(process.env.JWT_KEY);
  let result: any = jwt.verify(token, secret);
  await dbConnect();
  let user = await UserModel.findById(result._id);
  let data = await UserModel.findById(user._id);
  return {
    to_dos: data.element,
    username: data.username,
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return run(req.cookies.token)
    .catch((err) => res.status(501).json({ error: `${err}couldn't validate` }))
    .then((user) => {
      return res.status(200).json({ name: JSON.stringify(user) });
    });
}
