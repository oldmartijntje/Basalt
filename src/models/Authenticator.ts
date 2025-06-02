import { users, sessionTokens } from "../mainDatabase";
import { UserInterface } from "../dto/user/user.interface";
import { compare } from 'bcrypt';
import * as mongodb from "mongodb";
import { promises } from "dns";
import { UuidHelper } from "./UuidHelper";

export class Authenticator {
    private sessionToken: string | undefined;
    private isAuthenticated: boolean;
    private user: UserInterface | undefined;
    private readonly sessiontokenExpireTime: number = 1; // in hours

    constructor() {
        this.isAuthenticated = false;
    }

    private unAuthorise() {
        this.isAuthenticated = false;
    }

    private authorise() {
        this.isAuthenticated = true;
    }

    async createUser(username: string, password: string): Promise<boolean> {
        const user = await users.findOne({ username: username }).lean();
        if (user) {
            return false;
        } else {
            const newUser = await users.create({ username: username, password: password });
            console.log(newUser)
            const passwordMatch = await compare(password, newUser.password);
            console.log(passwordMatch, newUser.password)
            return true;
        }
    }

    async authenticateBySessionToken(username: string, sessionTokenString: string): Promise<boolean> {
        const validSessionToken = await this.validateSessionToken(username, sessionTokenString);
        if (typeof validSessionToken === "string" || validSessionToken === false) {
            this.unAuthorise();
            return false;
        }
        const userId = await this.getUserIdBySessionToken(sessionTokenString);
        if (!userId) {
            this.unAuthorise();
            return false;
        }
        const user = await users.findOne({ _id: new mongodb.ObjectId(userId) }).lean();
        if (user) {
            this.sessionToken = sessionTokenString;
            this.user = user;
            this.authorise();
            return true;
        } else {
            this.unAuthorise();
            return false;
        }
    }

    async authenticateByLogin(username: string, password: string): Promise<boolean> {
        const user = await users.findOne({ username: username }).lean();
        if (!user) {
            this.unAuthorise();
            return false;
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            this.unAuthorise();
            return false;
        }
        this.user = user;
        this.authorise();
        const sessionToken = await this.createSessionToken();
        this.sessionToken = sessionToken;
        return true;
    }

    isAuthorised() {
        return this.isAuthenticated;
    }

    getUserData(): UserInterface | undefined {
        if (!this.user) {
            return;
        }
        const user = { ...this.user };
        delete user.password;
        return user;
    }

    getSessionToken(): string | undefined {
        return this.sessionToken;
    }

    private async createSessionToken(): Promise<string | undefined> {
        if (!this.user) {
            return;
        }
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + this.sessiontokenExpireTime);
        const oldSessionToken = await sessionTokens.findOne({ userId: this.user._id }).lean();
        if (oldSessionToken) {
            await this.removeAllSessionTokens();
        }
        const token = UuidHelper.generateUUID();
        const sessionToken = await sessionTokens.create({ userId: this.user._id, expirationDate: expirationDate, sessionToken: token });
        sessionToken.save();
        return token;
    }

    private async validateSessionToken(username: string, sessionToken: string): Promise<boolean | string> {
        const sessionTokenObject = await sessionTokens.findOne({ sessionToken: sessionToken }).lean();
        if (!sessionTokenObject) {
            return false;
        }
        if (sessionTokenObject.expirationDate < new Date()) {
            await this.removeSessionToken(sessionToken);
            return false;
        }
        const user = await users.findOne({ _id: sessionTokenObject.userId }).lean();
        if (!user) {
            return false;
        }
        if (user.username != username) {
            return false;
        }
        return true;
    }

    private async removeSessionToken(sessionToken: string): Promise<boolean> {
        try {
            const deleteResult = await sessionTokens.deleteOne({ sessionToken: sessionToken });
            return deleteResult.deletedCount === 1;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private async removeAllSessionTokens(): Promise<boolean> {
        if (!this.user) {
            return false;
        }
        try {
            const deleteResult = await sessionTokens.deleteMany({ userId: this.user._id });
            return deleteResult.deletedCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private async getUserIdBySessionToken(sessionToken: string): Promise<string | undefined> {
        const sessionTokenObject = await sessionTokens.findOne({ sessionToken: sessionToken }).lean();
        if (!sessionTokenObject) {
            return;
        }
        return `${sessionTokenObject.userId}`;
    }
}
