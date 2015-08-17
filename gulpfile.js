var gulp  = require('gulp'),
    uglifyJS = require('gulp-uglify'),
    rename = require("gulp-rename");

gulp.task('uglify', function() {
    return gulp.src('source/gesture-recorder.js')
        .pipe(uglifyJS())
        .pipe(rename("gesture-recorder.min.js"))
        .pipe(gulp.dest('./release/'));
});

gulp.task('copy', function() {
    return gulp.src('source/gesture-recorder.js')
        .pipe(gulp.dest('./example/'));
});

gulp.task('default', ['uglify', 'copy']);