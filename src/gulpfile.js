const { src, dest, watch, series, parallel, task } = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const sync = require("browser-sync").create();

const deploymentFolder = 'dist';

function js() {
  return src(['node_modules/angular/*.js', 'node_modules/@uirouter/angularjs/release/angular-ui-router.js', 'node_modules/angular-resource/angular-resource.js', '!node_modules/angular/angular.min.js', '!node_modules/angular/index.js', 'app/**/*.js'])
    .pipe(concat('lib.js'))
    .pipe(dest(`${deploymentFolder}/js`));
};

function views(){
  return src(['app/**/*.html', 'index.html'])
    .pipe(dest(deploymentFolder));
}

function css() {
  return src(['app/**/*.css', 'assets/css/*.css', 'assets/libs/bootstrap/css/bootstrap.min.css'])
    .pipe(concat('styles.css'))
    .pipe(dest(`${deploymentFolder}/css`));
};

function images() {
  return src([ 'assets/img/**/*.{gif,jpg,png,svg,ico}'])
    .pipe(dest(`${deploymentFolder}/img`));
};

task('build', parallel(js, css, images, views));

function cleanDeploymentFolder(){
  return src(deploymentFolder, {read:false, allowEmpty:true})
    .pipe(clean());
};

function serve() {
  sync.init({
      server: {
          baseDir: deploymentFolder
      }
  });

  watch('app/**/*.js', series(cleanDeploymentFolder, build)).on('change', sync.reload);
  watch('app/**/*.css', series(cleanDeploymentFolder, build)).on('change', sync.reload);
  watch('assets/css/*.css', series(cleanDeploymentFolder, build)).on('change', sync.reload);
  watch('app/**/*.html', series(cleanDeploymentFolder, build)).on('change', sync.reload);
  watch('index.html', series(cleanDeploymentFolder, build)).on('change', sync.reload);
};

exports.js = js;
exports.css = css;
exports.serve = serve;
exports.clean = cleanDeploymentFolder;
exports.build = parallel(js, css, images, views);
const build = task('build');
//default
exports.default = series(build, serve);