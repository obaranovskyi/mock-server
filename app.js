const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const nocache = require('nocache');

const fsUtil = require('./common/fs-util');
const mockReposNames = fsUtil.dirNames(`${__dirname}/mock-repo`);
const mockRepos = mockReposNames.map((repoName) => {
	return { 
		repoName, 
		routes: require(`./mock-repo/${repoName}/config`).routes 
	};
});

const app = express();

app.use(cors());
app.use(nocache());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mockRepos.forEach((repoConfig) => {
	repoConfig.routes.forEach((route) => {
		app[route.type](`/${repoConfig.repoName}${route.url}`, (req, res) => {
			return res.json(route.data);
		});
	})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

