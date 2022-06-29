import type { NextApiRequest, NextApiResponse } from 'next'
import {Schema, model, connect} from "mongoose"
import dbConnect from "../../utils/dbConnect"
import UserModel, {User} from "../../models/userModel"
import jwt from "jsonwebtoken"
import {Payload} from "./login"

async function run(token: string)  {
let secret = String(process.env.JWT_KEY)
let result: any = await jwt.verify(token,secret)
await dbConnect()
let user  = await  UserModel.findById(result._id)
let data = await UserModel.findById(user._id)
return {
to_dos: data.to_dos,
username: data.username
}
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return run(req.body)
  .catch(err=>console.log(err))
  .then(user=>{
    return res.status(200).json({"name": JSON.stringify(user)})
  })
} 


