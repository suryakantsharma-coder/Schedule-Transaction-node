import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const AuthSchemaSignUp =  mongoose.model("Auth", signUpSchema);

export { AuthSchemaSignUp };
