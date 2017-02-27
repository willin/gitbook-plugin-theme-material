var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('gulp-run');
var path = require('path');

var GITBOOK_PATH = '/Users/willin/Documents/js.cool/leader.js.cool/';
var THEME_PATH = '/Users/willin/Documents/w2fs/gitbook-plugin-theme-material/src';

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: path.join(GITBOOK_PATH, '/_book')
        }
    });
});

gulp.task('build', function () {
    run('cd ' + GITBOOK_PATH + ' && gitbook build').exec('', function() {
        run('echo build DONE!').exec().pipe(browserSync.reload({stream:true}));
    });
});

gulp.task('watch-build', function () {
    gulp.watch(['./_layouts/**/*.html'], ['build']);
});

gulp.task('compile', function () {
    run('cd ' + THEME_PATH + ' && sh build.sh').exec('', function () {
        run('cd ' + GITBOOK_PATH + ' && gitbook build').exec('', function () {
            run('echo build DONE!').exec().pipe(browserSync.reload({ stream: true }));
        });
    });
});

gulp.task('watch-compile', function () {
    gulp.watch(['./src/**/*.js', './src/**/*.less', './src/**/*.css'], ['compile']);
});

gulp.task('default', ['compile', 'browser-sync', 'watch-build', 'watch-compile']);
