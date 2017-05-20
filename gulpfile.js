var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

gulp.task('build', function () {
    return gulp.src('./src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: 'commonjs'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['./src/**/*.ts'], ['build']);
});

gulp.task('default', ['build']);