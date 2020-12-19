var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var server;

gulp.task('nodemon', (cb) => {
  let started = false;

  server = nodemon({
    script: 'server.js'
  })
    .on('start', () => {
      if (!started) {
        started = true;
        return cb();
      }
    })
    .on('restart', () => {
      console.log('restarting');
    })
    .on('quit', function () {
    })
    .on('exit', function () {
        process.exit();
    });

});

gulp.task('stop', function(done) {
  server.emit('quit')
  done()
});

gulp.task('mocha', function(done) {
  gulp.src('./tests/*.js')
    .pipe(mocha({reporter: 'spec', exit: true}), setTimeout(function() { done(null) }, 5000))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
    .once('error', function() {
        done()
    })
    .once('end', function() {
      done()
  });
});

gulp.task('coveralls', function(done){
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
  done()
});

gulp.task('test', gulp.series('nodemon', 'mocha', 'stop', 'coveralls'));
