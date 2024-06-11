import { AuthSchemaSignUp } from "../database/Modals/Auth.js"

export async function createNewUser (username, email, password, address, encryptedKey) {
    console.log("username", username, "email", email, "password", password);
    if (email && password){
        const authSchema = await AuthSchemaSignUp.create({username, email, password, address, encryptedKey});
        console.log("created", authSchema);
    } else {
        console.log("email and password are required");
        return "Email and password are required"
    }
}


export async function getUserLogin (email, password) {
    console.log( "email", email, "password", password);
    if (email && password){
        const authSchema = await AuthSchemaSignUp.findOne({email, password});
        console.log("created", authSchema);
    } else {
        console.log("email and password are required");
        return "Email and password are required"
    }
}