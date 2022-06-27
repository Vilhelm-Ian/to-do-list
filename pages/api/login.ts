// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Schema, model, connect} from "mongoose"
import bcrypt from "bcrypt"
import dbConnect from "../../utils/dbConnect"
import UserModel, {User} from "../../models/userModel"



async function run(form_data: User) {
await dbConnect()
let user = await  UserModel.find({"username":form_data.username},"password")
if(user===undefined) return console.log("user not found")
let match = await bcrypt.compare(form_data.password, user[0].password)
if(match) console.log("correct password")
else console.log("wrong password")
}

type Data = {
  name: string,
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  run(req.body).catch(err=>console.log(err))
  console.log(req.body)
  res.status(200).json({ name: 'John Doe'})
}
