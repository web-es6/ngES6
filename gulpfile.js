import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('build', () => {
    return gulp.src('./src/**/*.{js,jsx}')
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
});

gulp.doneCallback = (err) => {
    process.exit(err ? 1 : 0);
};