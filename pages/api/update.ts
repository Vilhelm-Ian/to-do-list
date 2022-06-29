import {Schema, model, connect} from "mongoose"
import dbConnect from "../../utils/dbConnect"
import UserModel, {User} from "../../models/userModel"
import jwt from "jsonwebtoken"
 
interface Data {
  token: string;
  to_dos: string[] 
}

async function run(body: Data){
console.log(body)
let secret = String(process.env.JWT_KEY)
let result = await jwt.verify(body.token,secret)
console.log(result)
await dbConnect()
let user = await UserModel.findOneAndUpdate({_id: result._id},{to_dos: body.to_dos},{new: true})
console.log(user,body.to_dos)
await user.save()
}
 
 
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return run(req.body)
  .catch(err=>res.status(401).json({"name": err}))
  .then(()=>res.status(200).json({"name": "update_array"}))
}
 

