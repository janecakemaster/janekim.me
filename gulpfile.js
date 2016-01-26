const gulp = require('gulp');
const chalk = require('chalk');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const dirs = {
  src: 'src',
  dest: 'public',
};

const jsPaths = {
  src: `./${dirs.src}/js/**/*.js`,
  dest: `./${dirs.dest}/js`,
};

const sassPaths = {
  src: `./${dirs.src}/sass/**/*.scss`,
  dest: `./${dirs.dest}/css`,
};

gulp.task('browser-sync', () => {
  browserSync.init({
    proxy: 'localhost:3000',
  });
});

gulp.task('scripts', () => {
  chalk.green('testing chalk');
  return gulp.src(jsPaths.src)
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(uglify())
    .on('error', e => {
        chalk.red(e.message);
        return this.end();
    })
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(jsPaths.dest))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp.src([ sassPaths.src, '!./src/sass/_normalize.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.stream());
});

gulp.task('clean', cb => {
  del(['public/js', 'public/css'], cb);
});

gulp.task('watch', function() {
  gulp.watch(jsPaths.src, ['scripts']);
  gulp.watch(sassPaths.src, ['styles']);
  gulp.watch('./views/*', reload);
});

gulp.task('default', [
  'watch',
  'scripts',
  'styles',
  'browser-sync',
]);
