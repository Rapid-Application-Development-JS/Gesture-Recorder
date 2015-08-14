var gulp  = require('gulp'),
    uglifyJS = require('gulp-uglify'),
    rename = require("gulp-rename");

gulp.task('uglify', function() {
    return gulp.src('gesture-recorder.js')
        .pipe(uglifyJS())
        .pipe(rename("gesture-recorder.min.js"))
        .pipe(gulp.dest('./release/'));
});

gulp.task('default', ['uglify']);