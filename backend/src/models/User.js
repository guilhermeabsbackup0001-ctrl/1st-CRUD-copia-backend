import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: String
    }
})

//nome do modelo e schema
export default mongoose.model("Usuário", userSchema)