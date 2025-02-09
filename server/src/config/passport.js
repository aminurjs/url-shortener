import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { environment } from "./environment.js";
import { User } from "../models/user.model.js";

export const configurePassport = () => {
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: environment.google.clientId,
        clientSecret: environment.google.clientSecret,
        callbackURL: environment.google.callbackUrl,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists by Google ID or email
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
          });

          if (!user) {
            // Create new user if not exists
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              provider: "google",
              isEmailVerified: true, // Google emails are already verified
            });

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  return passport;
};
