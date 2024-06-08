import { AuthSchemaSignUp } from "../database/Modals/Auth.js"

export async function createNewUser (username, email, password) {
    console.log("username", username, "email", email, "password", password);
    if (email && password){
        const authSchema = await AuthSchemaSignUp.create({username, email, password})
        console.log("created", authSchema);
    } else {
        console.log("email and password are required");
        return "Email and password are required"
    }
}