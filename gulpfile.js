var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
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
    .once('error', function() {
        process.exit(1)
        done()
    })
    .once('end', function() {
      process.exit()
      done()
  });
});

gulp.task('test', gulp.series('nodemon', 'mocha', 'stop'));