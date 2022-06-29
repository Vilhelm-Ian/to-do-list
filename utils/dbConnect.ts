import mongoose from "mongoose"

const connection = {isConnected: false}

export default async function dbConnect() {
  if(connection.isConnected) return
  let uri: string = process.env.MONGODB_URI!==undefined ? process.env.MONGODB_URI : "" 
  const db: any = await mongoose.connect(uri)
  connection.isConnected = db.connections[0].readyState
}
 
 
