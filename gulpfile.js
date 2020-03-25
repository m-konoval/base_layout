'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const fs = require('fs');

sass.compiler = require('node-sass');

// Transpile scss to CSS for development
gulp.task('style:dev', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest('./css'));
});


// Transpile scss to CSS for production
gulp.task('style', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      grid: true
    }))
    .pipe(gulp.dest('./css'));
});


// Transpile ES6 and more to ES5
gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./js'))
});


// Clean dist folder
gulp.task('clean', () => {
  return del(['./css/*', './js/*']);
});


// Watcher
gulp.task('serve', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('style:dev'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

// MAIN Task
gulp.task('dev', gulp.series(
  'clean', gulp.series(
    gulp.parallel('style:dev', 'js'), 'serve')
  )
);

gulp.task('build', gulp.series(
  'clean', gulp.parallel('style', 'js')));
