var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('minify', function() {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});