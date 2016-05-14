const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


gulp.task('default', function () {
  return gulp.src('./assets/js/*.js')
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js/'));
});
