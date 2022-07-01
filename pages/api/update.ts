import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import UserModel from "../../models/userModel";
import jwt from "jsonwebtoken";

interface Data {
  token: string;
  to_dos: string[];
}

async function run(body: Data,token: string) {
  let secret = String(process.env.JWT_KEY);
  let result: any = jwt.verify(token, secret);
  await dbConnect();
  let user = await UserModel.findOneAndUpdate(
    { _id: result._id },
    { to_dos: body.to_dos },
    { new: true }
  );
  console.log(user, body.to_dos);
  await user.save();
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return run(req.body,req.cookies.token)
    .catch((err) => res.status(401).json({ name: err }))
    .then(() => res.status(200).json({ name: "update_array" }));
}
