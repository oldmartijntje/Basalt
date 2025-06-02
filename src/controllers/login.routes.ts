import * as express from "express";
import { Authenticator } from "../models/Authenticator";
import { UuidHelper } from "../models/UuidHelper"

export const loginRouter = express.Router();
loginRouter.use(express.json());

const passkey = UuidHelper.generateUUID();
console.log(`Admin key: ${passkey}`);

/**
 * Get the sessiontoken by using your password and username
 */
loginRouter.post("/", async (_req, res) => {
    try {
        const auth = new Authenticator();
        const username = _req.body.username;
        const password = _req.body.password;
        if (!username || !password) {
            res.status(400).send({ "message": "Username and password are required" });
            return;
        }
        await auth.authenticateByLogin(username, password)
        if (!auth.isAuthorised()) {
            res.status(403).send({ "message": "Invalid username and password combination." });
            return
        }
        const sessionToken = auth.getSessionToken();

        if (sessionToken) {
            res.status(200).send({ message: "Logged in succesfully", sessionToken: sessionToken });
            return;
        }
        res.status(501).send({ "message": "Unexpected logic escape: How did this occur?" });
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
});

/**
 * Register
 */
loginRouter.post("/register", async (_req, res) => {
    try {
        const auth = new Authenticator();
        const username = _req.body.username;
        const password = _req.body.password;
        const registerSignupKey = _req.body.registerSignupKey;
        if (!username || !password || !registerSignupKey) {
            res.status(400).send({ "message": "Username and password and registerSignupKey are required" });
            return;
        }
        if (registerSignupKey !== passkey) {
            res.status(400).send({ "message": "Wrong registerSignupKey." });
            return;
        }
        if (await auth.createUser(username, password)) {
            res.status(200).send({ "message": "Account Created." })
            return;
        } else {
            res.status(400).send({ "message": "User already exists." });
            return;
        }

        res.status(501).send({ "message": "Unexpected logic escape: How did this occur?" });
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
});

/**
 * check if your sessiontoken is valid.
 */
loginRouter.post("/validateToken", async (_req, res) => {
    try {
        const username = _req.body.username;
        const sessionToken = _req.body.sessionToken;
        if (!sessionToken || !username) {
            res.status(400).send({ "message": "Session token and username are required" });
            return;
        }
        const auth = new Authenticator();
        const authenticationResponse = await auth.authenticateBySessionToken(username, sessionToken);
        if (!authenticationResponse) {
            res.status(403).send({ "message": "Invalid SessionToken and username combination" });
            return;
        }

        res.status(200).send({ "message": "Login Successfull." })
    } catch (error) {
        res.status(500).send(error.message);
    }
});