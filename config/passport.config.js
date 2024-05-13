const passport = require("passport");
require("dotenv").config();
const { app } = require("../app");
const User = require("../database/models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  findUserPerEmail,
  findUserPerGoogleId,
} = require("../queries/user.queries");

app.use(passport.initialize()); // initialisation obligatoire
app.use(passport.session()); // utilisation des sessions avec passport

// Après l'authentification nous ne stockons que l'_id du user
// dans la session pour ne pas la surcharger
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// A chaque requête, la session est récupérée par express-session en utilisant
// l'id de la session dans le cookie. Passport récupère l'_id du user dans la session
// et exécute cette méthode. Nous récupérons le user avec son _id et le retournons
// à Passport avec done(null, user). Passport le mettra alors sur req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

// Configuration de la stratégie locale
// Nous utilisons l'email comme identifiant et devons donc passer
// l'option usernameField
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Nous essayons de récupérer l'utilisateur avec son email
        const user = await findUserPerEmail(email);
        if (user) {
          // Si nous le retrouvons nous comparons le mot de passe hashé de la DB
          // avec le hash du mot de passe fourni par l'utilisateur
          const match = await user.comparePassword(password);
          if (match) {
            // Si ça match alors le mot de passe est correct
            done(null, user);
          } else {
            // Si les hash ne matchent pas, le mot de passe rentré n'est
            // pas le bon et nous retournons une erreur
            done(null, false, { message: "Password doesn't match" });
          }
        } else {
          // Si nous n'avons pas de user, nous retournons une erreur
          done(null, false, { message: "user not found" });
        }
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(util.inspect(profile, { compact: true, depth: 5, breakLength: 80 }));
      try {
        const user = await findUserPerGoogleId(profile.id);
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            username: profile.displayName,
            local: {
              googleId: profile.id,
              email: profile.emails[0].value,
            },
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (e) {
        done(e);
      }
    }
  )
);
