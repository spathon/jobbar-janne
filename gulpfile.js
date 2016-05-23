'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('scss', () => {
  return gulp.src('./assets/scss/style.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});


gulp.task('js', () => {
  return gulp.src('./assets/js/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(babel())
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js/'));
});

// Service Worker (sw)
gulp.task('sw', () => {
  return gulp.src('./assets/sw.js')
    .pipe(sourcemaps.init())
      .pipe(concat('sw.js'))
      .pipe(babel())
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/'));
});


gulp.task('nodemon', () => {
  return nodemon({
    watch: __dirname +'/**/*.js',
    ignore: [
      '.git',
      'site/node_modules',
      'node_modules',
      'assets',
      'public'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  });
});


gulp.task('watch', () => {
  gulp.watch('assets/scss/**/*.scss', ['scss']);
  gulp.watch('assets/**/*.js', ['js', 'sw']);
});

gulp.task('default', ['watch', 'nodemon'])




// const browserSync = require('browser-sync').create();
// gulp.task('js-watch', ['js'], browserSync.reload);
// Rerun the task when a file changes
// gulp.task('serve', ['js'], () => {
//
//   browserSync.init({
//     proxy: 'http://localhost:3000',
//     open: false,
//     port: 8080
//   });
//
//   // Minify Javascript
//   gulp.watch('assets/js/*.js', ['js-watch']);
// });
