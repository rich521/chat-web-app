var autoprefixer = require('gulp-autoprefixer'),
    axios = require("axios"),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    gulp = require('gulp'),
    history = require('connect-history-api-fallback'),
    path = require('path'),
    sass = require('gulp-sass'),
    serveStatic = require('serve-static'),
    webpack = require('webpack-stream');

// MongoDB
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// URLS
var mongoURL = 'mongodb://localhost:27017/chat-users',
    userDataBase = [];

MongoClient.connect(mongoURL, function(err, db) {
    // Get the user once
    var cursor = db.collection('users').find();
    cursor.forEach((doc, err) => {
        assert.equal(null, err);
        userDataBase.push(doc);
    });
    db.close();
});



function handleHTTP(req, res, next) {
    // console.log(req.url);
    if (req.method == 'POST') {
        req.on('data', function(data) {
            var parseData = JSON.parse(data.toString());
            console.log(parseData.userName, parseData.passWord);
            var user = parseData.userName,
                password = parseData.passWord,
                arrLen = userDataBase.length;

            var dataString = "0";
            if (arrLen) {
                for (var i = arrLen - 1; i >= 0; i--) {
                    var ref = arrLen[i];
                    if (ref.name === user) {
                        if (ref.password === password) {
                            console.log("passWord right");
                            dataString = "2";
                            break;
                        } else {
                            console.log("passWord wrong");
                            dataString = "1";
                            break;
                        }
                    }
                }
                console.log("does not exist");
                dataString = "0";
            } else {
                console.log("no users in database");
                dataString = "0";
            }
            res.write(dataString);
            res.end();
        });
    }
    next();
};

// Paths
var sassPath = 'src/sass/**/*.scss',
    cssPath = 'dist/css/';

// Watch all files when changing live 
gulp.task('default', function() {
    browserSync.init({
        browser: 'google chrome',
        open: false,
        port: 3000,
        server: {
            baseDir: './dist',
            middleware: [
                history({ verbose: true }),
                handleHTTP
            ],
        }
    });
    gulp.watch('./src/js/**/*.js', ['js-watch']);
    gulp.watch(sassPath, ['sass']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('public', function() {
    browserSync.init({
        browser: "google chrome",
        server: "./dist"
    });
});

var jsSrc = 'src/js/bundle.js';
gulp.task('react', function() {
    return gulp.src(jsSrc)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'));
});

//Only runs after react & minify is complete
gulp.task('js-watch', ['react'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('sass', function() {
    gulp.src(sassPath)
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        // .pipe(gulp.dest(cssDest))
        .pipe(cleanCSS())
        .pipe(gulp.dest(cssPath))
        .pipe(browserSync.stream());
});
