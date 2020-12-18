var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('stop', function(done) {
  done()
});

gulp.task('mocha', function(done) {
  gulp.src('./tests/*.js')
    .pipe(mocha({reporter: 'spec', exit: true}), setTimeout(function() { done(null) }, 5000))
    .once('error', function() {
        process.exit(1)
        done()
    })
    .once('end', function() {
      process.exit()
      done()
  });
});

gulp.task('test', gulp.series('mocha', 'stop'));