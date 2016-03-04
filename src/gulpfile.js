var gulp = require('gulp'),
    minifyejs = require('gulp-minify-ejs'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat');

gulp.task('compress', function() {

    gulp.src(['views/pages/*.ejs'])
        .pipe(minifyejs())
        .pipe(gulp.dest('../dist/views/pages'));

    gulp.src(['views/partials/*.ejs'])
        .pipe(minifyejs())
        .pipe(gulp.dest('../dist/views/partials'));

    gulp.src(['public/scripts/*.js'])
        .pipe(minify())
        .pipe(gulp.dest('../dist/public/scripts'));

    gulp.src(['public/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('../dist/public/styles'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../dist/public/styles'));
    
});

//gulp.task('watch', ['compress'], function () {
//    gulp.watch('views/pages/*.ejs');
//    gulp.watch('views/partials/*.ejs');
//    gulp.watch('public/styles/*.css');
//});