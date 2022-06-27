// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Schema, model, connect} from "mongoose"
import bcrypt from "bcrypt"
import dbConnect from "../../utils/dbConnect"
import UserModel, {User} from "../../models/userModel"
const saltRounds = 10



async function run(form_data: User) {
 await dbConnect()
 let hash = await bcrypt.hash(form_data.password, saltRounds)   
 const user = new UserModel({
 username: form_data.username,
 password: hash,
 to_dos: []
 })    
 await user.save()
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
