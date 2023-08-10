const path = require("path");
const express = require("express");

const methodOverride = require("method-override");

const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");

// DB Config
const db = require("./config/db/");
db.connect();

// Express Config
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    express.urlencoded({
      extended: true,
    })
);

app.use(express.json());

app.use(methodOverride("_method"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// Use static folder
app.use(express.static(path.join(__dirname, "public")));

// Template engine
app.engine(
  "hbs",
  expressHandlebars.engine({
    extname: ".hbs",
    helpers: {
      sumIndex: function (a, b) {
        return a + b;
      },
      characterLimit: function (length, context) {
        if (context.length > length) {
          return context.substring(0, length) + "...";
        } else {
          return context;
        }
      },

      ifEquals: function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },

      ifNotEquals: function (arg1, arg2, options) {
        return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
      },

      eq: function () {
        const args = Array.prototype.slice.call(arguments, 0, -1);
        return args.every(function (expression) {
          return args[0] === expression;
        });
      },

      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          case "&&":
            return v1 && v2 ? options.fn(this) : options.inverse(this);
          case "||":
            return v1 || v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    },

  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
const route = require("./routes");
route(app);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);