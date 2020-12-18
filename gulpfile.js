var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
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
    });

});

gulp.task('test', gulp.series('nodemon', function() {
  return gulp.src('./tests/*.js')
    .pipe(mocha({reporter: 'spec' }))  
    once('error', function() {
        process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
}));