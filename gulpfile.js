var gulp = require('gulp'),
    minifyejs = require('gulp-minify-ejs'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat');

gulp.task('compress', function() {

    gulp.src(['./src/views/pages/*.ejs'])
        .pipe(minifyejs())
        .pipe(gulp.dest('./dist/views/pages'));

    gulp.src(['./src/views/partials/*.ejs'])
        .pipe(minifyejs())
        .pipe(gulp.dest('./dist/views/partials'));

    gulp.src(['./src/public/js/*.js'])
        .pipe(concat('allscripts.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/public/js'));

    gulp.src(['./src/public/css/*.css'])
        .pipe(concat('allstyles.css'))
        .pipe(gulp.dest('./dist/public/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/public/css'));

    //copys
    gulp.src('./src/server.js', {base: './src'})
        .pipe(gulp.dest('./dist'));

    gulp.src('./src/public/js/bootstrap/bootstrap.min.js', {base: './src/public/js/bootstrap'})
        .pipe(gulp.dest('./dist/public/js/bootstrap'));

    gulp.src('./src/public/img/**/*', {base: './src/public/img' })
        .pipe(gulp.dest('./dist/public/img'));

    gulp.src('./src/public/fonts/*', {base: './src/public/fonts' })
        .pipe(gulp.dest('./dist/public/fonts'));

    gulp.src('./src/public/video/*', {base: './src/public/video' })
        .pipe(gulp.dest('./dist/public/video'));
        

    
});

//gulp.task('watch', ['compress'], function () {
//    gulp.watch('views/pages/*.ejs');
//    gulp.watch('views/partials/*.ejs');
//    gulp.watch('public/styles/*.css');
//});