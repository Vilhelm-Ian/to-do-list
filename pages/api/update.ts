import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import UserModel, {element} from "../../models/userModel";
import jwt from "jsonwebtoken";

interface Data {
  token: string;
  to_dos: element[];
}


async function run(body: Data,token: string) {
  try {
  let secret = String(process.env.JWT_KEY);
  let result: any = jwt.verify(token, secret);
  await dbConnect();
  let user = await UserModel.findOneAndUpdate(
    { _id: result._id },
    { element: body.to_dos },
    { new: true }
  );
  await user.save();
  }
  catch(err) {
  throw err
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return run(req.body,req.cookies.token)
    .then(() => res.status(200).json({ name: "update_array" }))
    .catch((err) => res.status(401).json({ name: err }))
}
