/* eslint-disable */
var gulp = require('gulp'),
  path = require('path'),
  rollup = require('gulp-rollup'),
  rename = require('gulp-rename'),
  del = require('del'),
  resolve  = require('rollup-plugin-node-resolve')
  runSequence = require('run-sequence'),
  inlineResources = require('./tools/gulp/inline-resources'),
  commonjs = require('rollup-plugin-commonjs'),
  config = require('./gulpfile.config.json'),
  gutil = require('gulp-util'),
  exec = require('child_process').exec;

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, config.module.path);
const tmpFolder = path.join(rootFolder, '.tmp');
const buildFolder = path.join(rootFolder, 'build');
const distFolder = path.join(rootFolder, 'dist');

/**
 * 1. Delete /dist folder
 */
gulp.task('clean:dist', function () {

  // Delete contents but not dist folder to avoid broken npm links
  // when dist directory is removed while npm link references it.
  return deleteFolders([distFolder + '/**', '!' + distFolder]);
});

/**
 * 2. Clone the /src folder into /.tmp. If an npm link inside /src has been made,
 *    then it's likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
gulp.task('copy:source', function () {
  return gulp.src([`${srcFolder}/**/*`, `!${srcFolder}/node_modules`])
    .pipe(gulp.dest(tmpFolder));
});

/**
 * 3. Inline template (.html) and style (.css) files into the the component .ts files.
 *    We do this on the /.tmp folder to avoid editing the original /src files
 */
gulp.task('inline-resources', function () {
  return Promise.resolve()
    .then(() => inlineResources(tmpFolder));
});


/**
 * 4. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 */
gulp.task('ngc',function (cb) {
  exec(`node ./node_modules/@angular/compiler-cli/src/main -p ${tmpFolder}/tsconfig.es5.json`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}
)

/**
 * 4a. Copy lib files from /.tmp/lib to /bild. This should be done only if we have custom
 *    d.ts files included in our library. Usually d.ts should be in external library that is
 *    refered by our library.
 *    
 */
gulp.task('copy:customlib', function () {
  return gulp.src([`${tmpFolder}/libs/**/*`])
    .pipe(gulp.dest(buildFolder+'/libs'));
});




/**
 * 5. Run rollup inside the /build folder to generate our Flat ES module and place the
 *    generated file into the /dist folder
 */
 


gulp.task('rollup:fesm', function () {
  return gulp.src(`${buildFolder}/**/*.js`)
  // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See "input" in https://rollupjs.org/#core-functionality
      input: `${buildFolder}/angular-library.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,
	  
	  
	  //get plugin to resolve node style, get plugin to read commonjs module
	  plugins: [
        resolve({ jsnext: true, module: true, main: true, jail: srcFolder }),
        commonjs()
      ],

      // Format of generated bundle
      // See "format" in https://rollupjs.org/#core-functionality
      format: 'es'
    }))
    .pipe(gulp.dest(distFolder));
});


/**
 * 6. Run rollup inside the /build folder to generate our UMD module and place the
 *    generated file into the /dist folder
 */
gulp.task('rollup:umd', function () {
  return gulp.src(`${buildFolder}/**/*.js`)
  // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See "input" in https://rollupjs.org/#core-functionality
      input: `${buildFolder}/angular-library.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,
	  
	   //get plugin to resolve node style, get plugin to read commonjs module
	  plugins: [
        resolve({ jsnext: true, module: true, main: true, jail: srcFolder }),
        commonjs()
      ],

      // Format of generated bundle
      // See "format" in https://rollupjs.org/#core-functionality
      format: 'umd',

      // Export mode to use
      // See "exports" in https://rollupjs.org/#danger-zone
      exports: 'named',

      // The name to use for the module for UMD/IIFE bundles
      // (required for bundles with exports)
      // See "name" in https://rollupjs.org/#core-functionality
      name: 'angular-library',

      // See "globals" in https://rollupjs.org/#core-functionality
      globals: {
        typescript: 'ts'
      }

    }))
    .pipe(rename('angular-library.umd.js'))
    .pipe(gulp.dest(distFolder));
});

/**
 * 7. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don't need individual modules anymore, just the Flat ES module generated
 *    on step 5.
 */
gulp.task('copy:build', function () {
  return gulp.src([`${buildFolder}/**/*`, `!${buildFolder}/**/*.js`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 8. Copy package.json from /src to /dist
 */
gulp.task('copy:manifest', function () {
  return gulp.src([`${srcFolder}/package.json`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 9. Copy README.md from / to /dist
 */
gulp.task('copy:readme', function () {
  return gulp.src([path.join(srcFolder, 'README.MD')])
    .pipe(gulp.dest(distFolder));
});

/**
 * 10. Delete /.tmp folder
 */
gulp.task('clean:tmp', function () {
  return deleteFolders([tmpFolder]);
});

/**
 * 11. Delete /build folder
 */
gulp.task('clean:build', function () {
  return deleteFolders([buildFolder]);
});

gulp.task('compile', function () {
  runSequence(
 'clean:dist',
 'copy:source',
 'inline-resources',
 'ngc', 
 'copy:customlib',
 'rollup:fesm',
 'rollup:umd',
 'copy:build',
 'copy:manifest',
 'copy:readme',
 'clean:build',
 'clean:tmp',

  function (err) {
      if (err) {
        console.log('ERROR:', err.message);
        deleteFolders([distFolder, tmpFolder, buildFolder]);
      } else {
        console.log('Compilation finished succesfully');
      }
    });
});

/**
 * Watch for any change in the /src folder and compile files
 */
gulp.task('watch', function () {
  gulp.watch(`${srcFolder}/**/*`, ['compile']);
});

gulp.task('clean', ['clean:dist', 'clean:tmp', 'clean:build']);

gulp.task('build', ['clean', 'compile']);
gulp.task('build:watch', ['build', 'watch']);
gulp.task('default', ['build:watch']);

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
  return del(folders);
}
