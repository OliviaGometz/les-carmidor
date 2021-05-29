const gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  nunjucksRender = require("gulp-nunjucks-render"),
  data = require("gulp-data");

const paths = {
  styles: {
    src: "sass/**/*.scss",
    dest: "css",
  },
  njk: {
    src: "app/**/**/*.njk",
    dest: ".",
  },
};

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function html() {
  return gulp
    .src("app/pages/**/*.njk")
    .pipe(
      data(function () {
        return require("./app/content/characters.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: ["app/templates"],
      })
    )
    .pipe(gulp.dest(paths.njk.dest));
}

function watch() {
  gulp.watch(paths.styles.src, style);
  gulp.watch(paths.njk.src, html);
}

exports.watch = watch;
