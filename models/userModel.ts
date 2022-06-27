import { Schema, model, models} from "mongoose"

export interface User {
  username: string
  password: string
  to_dos: string[]
}
 
const userSchema = new Schema<User>({
  username: {type: String, required: true},
  password: {type: String, required: true},
  to_dos: [String]
})

const UserModel = models.Users ||  model("Users", userSchema)

export default UserModel
