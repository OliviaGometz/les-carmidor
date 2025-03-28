const gulp = require("gulp"),
  sass = require("gulp-dart-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  nunjucksRender = require("gulp-nunjucks-render"),
  data = require("gulp-data");

const paths = {
  styles: {
    src: "sass/**/*.scss",
    dest: "css",
  },
  njk: {
    src: "app/**/**/*",
    dest: ".",
  },
};

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest));
}

function html() {
  return gulp
    .src("app/pages/**/*.njk")
    .pipe(
      data(function () {
        const characters = require("./app/content/characters.json");
        const comments = require("./app/content/comments.json");
        const books = require("./app/content/books.json");
        const families = require("./app/content/families.json");
        const logos = require("./app/content/logos.json");
        const triggerwarnings = require("./app/content/triggerwarnings.json");
        const websites = require("./app/content/websites.json");
        const world = require("./app/content/world.json");
        return { characters, comments, books, families, logos, triggerwarnings, websites, world };
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
