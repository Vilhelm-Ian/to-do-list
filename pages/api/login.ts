// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "../../utils/dbConnect";
import UserModel, { User, element } from "../../models/userModel";
import jwt from "jsonwebtoken";
import attemptsModel from "../../models/LoginAttemptsModel";

export interface Payload {
  username: string;
  to_dos: element[];
  _id: string;
}

interface Attempt {
  username: string
  arr: string[]
  save(): void 
}

async function run(form_data: User, ip: string) {
  try {
    await dbConnect();
    let too_many_tries = await is_attempt_limit_reached(form_data.username, ip) 
    if(too_many_tries) {
      throw "too many tries"
    }
    let user = await UserModel.find(
      { username: form_data.username },
      "password to_dos username"
    );
    if (user[0] === undefined) throw "failed login";
    let match = await bcrypt.compare(form_data.password, user[0].password);
    if (match) {
      remove_failed_login_attempt(form_data.username,ip)
      return user[0];
    }
    else {
      add_failed_login_attempt(form_data.username, ip)
      console.log("wrong password");
      throw "failed login";
    }
  } catch (err) {
    throw `${err}`;
  }
}

async function jwt_sign(payload: Payload) {
  let secretKey = String(process.env.JWT_KEY);
  return jwt.sign(payload, secretKey,{expiresIn: "7d"});
}

async function add_failed_login_attempt(username: string, ip: string) {
  let attempts = await attemptsModel.findOne({ username });
  if (attempts === null) {
    let new_attempt = new attemptsModel({ username, arr: [ip] });
    await new_attempt.save();
  }
  else {
    attempts.arr.push(ip)
    attempts.save()
  }
}

async function remove_failed_login_attempt(username: string, ip: string) {
  try {
  let attempts: Attempt | null = await attemptsModel.findOne({ username });
  if(attempts===null) return "no failed attempts"
  attempts.arr = attempts.arr.filter(element=> element!== ip)
  attempts.save()
  }
  catch (err) {
  throw `${err}`
  }
}

async function is_attempt_limit_reached(username: string,ip: string) {
 let arrs = await attemptsModel.find({ username });
 if(arrs[0]?.arr.length>=100) return true
 if(arrs[0]?.arr.filter((value: string)=>value===ip).length>10) return true
 return false
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let ip = req.headers["x-real-ip"] || req.socket.remoteAddress
  run(req.body, String(ip))
    .catch((err) => res.status(401).json({ err: err }))
    .then((result: Payload) => {
      if (result === undefined) return "invalid login";
      let response: Payload = {
        _id: result._id,
        username: result.username,
        to_dos: result.to_dos,
      };
      jwt_sign(response)
        .then((token) => {
          return res.status(200).json({ name: token });
        })
        .catch((err) => res.status(401).json({ err: `login erro: ${err}` }));
    });
}
