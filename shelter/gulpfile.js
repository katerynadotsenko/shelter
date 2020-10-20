let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        cssMain: project_folder + "/pages/main/",
        cssPets: project_folder + "/pages/pets/",
        jsMain: project_folder + "/pages/main/",
        jsPets: project_folder + "/pages/pets/",
        js: project_folder + "/js/",
        assets: project_folder + "/assets/",
    },
    src: {
        html: [source_folder + "/**/*.html", "!" + source_folder + "/**/_*.html"],
        css: source_folder + "/sass/style.scss",
        jsMain: source_folder + "/js/main.js",
        jsPets: source_folder + "/js/pets.js",
        js: [source_folder + "/js/**/*.js", "!" + source_folder + "/js/main.js", "!" + source_folder + "/js/pets.js"],
        assets: source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/sass/**/*.scss",
        jsMain: source_folder + "/js/main.js",
        jsPets: source_folder + "/js/pets.js",
        js: source_folder + "/js/**/*.js",
        assets: source_folder + "/assets/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    rename = require('gulp-rename');

function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        })
    )
    .pipe(
        rename({
            basename: "style"
        })
    )
    .pipe(dest(path.build.cssMain))
    .pipe(dest(path.build.cssPets)) //SDELAT OTDELNO
    .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function jsMain() {
    return src(path.src.jsMain)
        .pipe(fileinclude())
        .pipe(
            rename({
                basename: "script"
            })
        )
        .pipe(dest(path.build.jsMain))
        .pipe(browsersync.stream())
}

function jsPets() {
    return src(path.src.jsPets)
        .pipe(fileinclude())
        .pipe(
            rename({
                basename: "script"
            })
        )
        .pipe(dest(path.build.jsPets))
        .pipe(browsersync.stream())
}

function assets() {
    return src(path.src.assets)
        .pipe(dest(path.build.assets))
        .pipe(browsersync.stream())
}

function clean(params) {
    return del(path.clean);
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.jsMain], jsMain);
    gulp.watch([path.watch.jsPets], jsPets);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.assets], assets);
}

let build = gulp.series(clean, gulp.parallel(js, jsMain, jsPets, css, html, assets));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.assets = assets;
exports.js = js;
exports.jsMain = jsMain;
exports.jsPets = jsPets;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


