// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import dbConnect from "../../utils/dbConnect"
import UserModel, {User} from "../../models/userModel"
import jwt from "jsonwebtoken"

export interface Payload {
  username: string,
  to_dos: string[],
  _id: string
}

type Data = {
  name: string,
}

async function run(form_data: User)  {
try {
await dbConnect()
let user = await  UserModel.find({"username":form_data.username},"password to_dos username")
if(user[0]===undefined) throw "failed login"
let match = await bcrypt.compare(form_data.password, user[0].password)
if(match) return user[0] 
else throw "failed login" 
}
catch(err) {
throw `login failed ${err}`
}
}

async function jwt_sign(payload: Payload) {
  let secretKey = String(process.env.JWT_KEY)
  return jwt.sign(payload, secretKey)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  run(req.body)
  .catch(err=>res.status(401).json({"err": err}))
  .then((result: Payload)=>{
      if (result === undefined) return "invalid login"
      let response: Payload  = {
        _id: result._id,
        username: result.username,
        to_dos: result.to_dos
      }
      jwt_sign(response)
      .then(token=> {
        return res.status(200).json({"name": token})
      })
      .catch(err=>res.status(401).json({"err":`login erro: ${err}`}))
  })
}
