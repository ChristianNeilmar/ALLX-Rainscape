const gulp = require('gulp');
const dartSass = require('gulp-dart-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sftp = require('gulp-sftp-up4');
const fs = require('fs');

// Load deployment config
const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));

// Paths
const paths = {
  scss: 'assets/scss/**/*.scss',
  cssDest: 'assets/css',
  assets: 'assets/**/*.*',
  themePhp: 'functions.php'
};

// Compile SCSS
gulp.task('compile:scss', function () {
  return gulp
    .src(paths.scss)
    .pipe(dartSass().on('error', dartSass.logError))
    .pipe(concat('style.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.cssDest))
    .on('end', () => console.log('✅ SCSS compiled successfully.'));
});

// Deploy all assets
gulp.task('deploy:assets', function () {
  return gulp
    .src(paths.assets)
    .pipe(
      sftp({
        host: config.host,
        user: config.user,
        pass: config.pass,
        remotePath: `${config.remotePath}/assets`
      })
    )
    .on('end', () => console.log('✅ Assets deployed successfully.'))
    .on('error', (err) => {
      console.error(`❌ Deployment failed: ${err.message}`);
    });
});

// Deploy functions.php
gulp.task('deploy:functions', function () {
  return gulp
    .src(paths.themePhp)
    .pipe(
      sftp({
        host: config.host,
        user: config.user,
        pass: config.pass,
        remotePath: `${config.remotePath}`
      })
    )
    .on('end', () => console.log('✅ functions.php deployed successfully.'))
    .on('error', (err) => {
      console.error(`❌ Deployment failed: ${err.message}`);
    });
});

// Watch for changes
gulp.task('watch', function () {
  gulp.watch(paths.scss, gulp.series('compile:scss'));
  gulp.watch(paths.assets, gulp.series('deploy:assets'));
  gulp.watch(paths.themePhp, gulp.series('deploy:functions'));
  console.log('👀 Watching for changes...');
});

// Default task
gulp.task('default', gulp.series(
  'compile:scss',
  'deploy:assets',
  'deploy:functions',
  'watch'
));