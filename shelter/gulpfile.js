var gulp = require('gulp');

function test(done) {
    console.log('test');
    done();
}

gulp.task('default', test);