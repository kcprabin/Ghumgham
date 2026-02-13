import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { apiResponse } from "../Utils/api.response.ts";
import { UserModel } from "../Model/User.model.ts";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

export const passportGoogle = passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/api/v1/users/auth/google/callback",
        },
        async function (
            accessToken: string,
            refreshToken: string,
            profile: any,
            cb: (err: any, user?: any) => void,
        ) {
            const userData = {
                googleId: profile.id,
                Username: profile.displayName,
                email: profile.emails?.[0].value,
                Name: profile.displayName,
                role: "user",
            };
            const user = await UserModel.findOne({ googleId: profile.id });
            if (!user) {
                const newUser = await UserModel.create(userData);
                return cb(null, newUser);
            }
            return cb(null, user);
        },
    ),
);
