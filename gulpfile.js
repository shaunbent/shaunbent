'use strict';

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');

// load the plugins into an array of plugins
const $ = gulpLoadPlugins();

// configs
const sassOptions = { outputStyle: 'nested' };
const supportedBrowsers = ['IE 9', 'last 2 versions', '> 1%', 'Safari 7'];
const autoprefixerOptions = { browsers: supportedBrowsers };
const nanoOptions = {
  autoprefixer: { browsers: supportedBrowsers },
  convertValues: { length: false, boolean: false },
  mergeRules: false
};

// tasks
gulp.task('assets', () =>
  gulp
    .src([
      'assets/**/*.{woff,woff2,txt,jpg,png,gif,svg,md}'
    ])
    .pipe(gulp.dest('dist/assets/'))
);

gulp.task('manifest', () => {
  gulp
    .src([
      'assets/manifest.json'
    ])
    .pipe(gulp.dest('dist/'))
});

gulp.task('styles', () =>
  gulp
    .src('app/styles/*.scss')
    .pipe(
      $.sass(sassOptions)
      .on('error', $.sass.logError)
    )
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.cssnano(nanoOptions))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
);

gulp.task('views', () =>
  gulp
    .src([
      'app/views/**/*.html',
      '!app/views/**/_*.html'
    ], { base: 'app/views' })
    .pipe($.nunjucks.compile())
    .pipe(gulp.dest('dist'))
);

gulp.task('clean', () => del(['dist'], { dot: true }) );

gulp.task('default', ['build'], () => {
  browserSync({
    notify: false,
    server: 'dist',
    online: true
  });

  gulp.watch('app/styles/*.scss', ['styles']);
  gulp.watch('app/views/**/*.html', ['views']);
  gulp.watch('assets/**/*.{woff,woff2,txt,jpg,png,gif,svg,md}', ['assets']);
  gulp.watch('assets/manifest.json', ['manifest']);
  gulp.watch([
    'dist/**/*.html',
    'dist/manifest.json',
    'dist/assets/*.{woff,woff2,txt,jpg,png,gif,svg,md}',
    'dist/assets/styles/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('build', callback => {
  runSequence('clean', 'assets', 'manifest', 'views', 'styles', callback);
});
