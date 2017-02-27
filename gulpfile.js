var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '/Users/willin/Documents/js.cool/leader.js.cool/_book'
        }
    });
});

gulp.task('build', function () {
    run('cd /Users/willin/Documents/js.cool/leader.js.cool/ && gitbook build').exec('', function() {
        run('echo build DONE!').exec().pipe(browserSync.reload({stream:true}));
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js', './_layouts/**/*.html', './src/**/*.css'], ['build']);
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
