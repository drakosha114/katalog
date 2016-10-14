/**
 * Created by drakosha on 14.10.2016.
 */
'use strict';

var gulp;
var bower;
var gulpFilter;
var mainBowerFiles;
var gulpSass;
var concat;
var uglifyJs;
var uglifyCss;
var browserSync;
var rename;

gulp = require("gulp");
bower = require("bower");
gulpFilter = require("gulp-filter");
mainBowerFiles = require("main-bower-files");
gulpSass = require("gulp-sass");
concat = require("gulp-concat");
uglifyJs = require('gulp-uglify');
uglifyCss = require('gulp-uglifycss');
browserSync = require("browser-sync");
rename = require("gulp-rename");

/*
* *************************
*       BROWSER SYNC      *
* *************************
* */

  /*
        browser sync config
  */

var config;

config = {
    server: {
        baseDir: 'app'
    },
    notify: false
};

    /*
        browser sync task
    */

gulp.task('browser-sync', function(){
    browserSync(config);
});

/*
* *********************
*    LOAD LIBRARES    *
* *********************
* */

gulp.task('buildJsLibraries', function(){
    var jsFiles;

    jsFiles = gulpFilter('**/*.js', {restore: true});

    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(jsFiles)
        .pipe(uglifyJs())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('buildCssLibraries', function(){
    var cssFiles;
    cssFiles = gulpFilter(['**/*.css', '!materialize.css'], {restore: true});
    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(cssFiles)
        .pipe(uglifyCss())
        .pipe(gulp.dest('app/css'));
});

gulp.task('buildFontsLibraries', function(){
    var fontsFiles;
    fontsFiles = gulpFilter(['**/*.+(otf|eot|svg|ttf|woff|woff2)'], {restore: true});
    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(fontsFiles)
        .pipe(gulp.dest('app/fonts/'));
});

gulp.task('buildRobotoFont', function () {
    var fontsFiles;
    fontsFiles = gulpFilter(['./bower_components/materialize/fonts/**/*.+(otf|eot|svg|ttf|woff|woff2)'], {restore: true});
    return gulp.src(mainBowerFiles({includeDev: true}), {restore: true})
        .pipe(fontsFiles)
        .pipe(gulp.dest('app/fonts/'));
});

gulp.task('buildLibraries', ['buildJsLibraries', 'buildCssLibraries', 'buildFontsLibraries', 'buildRobotoFont'], function(){

});
/*
* ********************
*       SASS         *
* ********************
* */
gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.+(scss|sass)')
        .pipe(gulpSass({
            outputStyle: 'compressed',
            includePaths: ['./bower_components/materialize/sass/']
        }))
        .pipe(gulp.dest('app/css/'));
});

/*
* **********************
*         WATCH        *
* **********************
* */

gulp.task('watch', ['browser-sync', 'sass', 'buildLibraries'], function(){ //removed load bower libs task

    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('./bower_components/', ['load-bower-libs']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/js**/*.js', browserSync.reload);
    gulp.watch('app/images/**/+.(jpg|jpeg|gif|png)', browserSync.reload);
    gulp.watch('app/photos/**/+.(jpg|jpeg|gif|png)', browserSync.reload);
    gulp.watch('app/**/*.html', browserSync.reload);
});

/*
* ***********************
*        DEFAULT        *
* ***********************
* */
gulp.task('default', ['watch'], function () {
   console.log('Default task started!!!');
});

