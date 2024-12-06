require("dotenv").config();

const init = async () => {
    const express = require("express");
    const path = require("path");
    const cookieParser = require("cookie-parser");
    const logger = require("morgan");
    const cors = require("cors");

    const model = require("./model");
    const indexRouter = require("./routes/index");

    const app = express();

    try {
        app.locals.model = await model.load();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    app.use(cors());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    app.use("/", indexRouter);

    return app;
};

module.exports.init = init;
