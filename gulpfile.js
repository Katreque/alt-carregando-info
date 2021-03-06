"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var Karma = require('karma').Server;

var _coverage = 'coverage/**/lcov.info';
var _scripts = 'src/**/*.js';
var _styles = 'src/**/*.css';
var _script = 'alt-carregando-info.js';
var _style = 'alt-carregando-info.css';
var _dist = 'dist';

gulp.task('build-css', function () {
  return gulp.src(_styles)
    .pipe(concat(_style.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
})

gulp.task('build', ['unit_test', 'build-css'], function () {
  return gulp.src(_scripts)
    .pipe(concat(_script.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
})

gulp.task('unit_test', function (done) {
  var _opts = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome']
  };

  return new Karma(_opts, done).start();
})

gulp.task('coverage', ['unit_test'], function () {
  gulp
    .src(_coverage)
    .pipe(coveralls());
})
