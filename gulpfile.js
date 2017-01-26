var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');


var dependencies = [
    './node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
    './node_modules/angular-animate/angular-animate.min.js'
];

gulp.task('compile-css',function(){
    var files = ['node_modules/animate.css/animate.min.css'];
    return gulp.src(files)
    .pipe(concat('dependencies.min.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('compile',['compile-css','compile-js']);


gulp.task('compile-js',function(){
    return gulp.src(dependencies)
    .pipe(concat('scripts-dependency.min.js'))
    .pipe(gulp.dest('./min/'));
});


// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('controller/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('controllers.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('min/'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('controller/**/*.js', ['jshint']);
});
