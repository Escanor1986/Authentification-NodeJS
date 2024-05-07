const session = require("express-session");
const MongoStore = require("connect-mongo");
const { clientPromise } = require("../database");
const { app } = require("../app");

app.use(
  session({
    secret: "cersei",
    resave: false,
    name: "jesuisunid",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // session 14 days
    },
    store: MongoStore.create({
      clientPromise: clientPromise.then(m => m.connection.getClient()),
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
