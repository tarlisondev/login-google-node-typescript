import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import config from "../config";

passport.use(new GoogleStrategy({
    clientID: config.clientId as string,
    clientSecret: config.clientSecret as string,
    callbackURL: 'http://localhost:3333/auth/google/callback' as string,
}, async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done
) => {
    return done(null, profile)
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport;