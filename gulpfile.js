(function (process, require) {
	var gulp, browserify, fs, concat, uglify, task;

	if (typeof process === "undefined" || typeof require === "undefined") {
		throw "The whole thing went up in flames";
	}

	/**
	 * Require necessary tools
	 */
	fs = require('fs');
	gulp = require('gulp');
	concat = require('gulp-concat');
	uglify = require('gulp-uglify');
	cssnano = require('gulp-cssnano');
	less = require('gulp-less');
	jade = require('gulp-jade');
	browserify = require('browserify');

	/**
	 * Get the task name
	 */
	task = (process.argv[2] || null);

	/**
	 * Gulp uglify task for building the bundled javascript files
	 */
	gulp.task('browserify', function() {
		var bundle = browserify({
			entries: './public/javascripts/index.js',
			paths: ['./node_modules', './public/javascripts/']
		});

		return bundle.bundle()
			.pipe(fs.createWriteStream('./public/dist/index.js'));
	});

	/**
	 * Gulp uglify task for building the bundled javascript files
	 */
	gulp.task('uglify', ['browserify'], function() {
		return gulp.src('./public/dist/index.js')
			.pipe(concat('index.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./public/dist'));
	});

	/**
	 * Gulp cssnano task for building the bundled css files
	 */
	gulp.task('less', function() {
		return gulp.src('./public/stylesheets/index.less')
			.pipe(concat('index.css'))
			.pipe(cssnano())
			.pipe(gulp.dest('./public/dist'));
	});

	/**
	 * Gulp cssnano task for building the bundled css files
	 */
	gulp.task('jade', function() {
		return gulp.src('./views/index.jade')
			.pipe(jade({
				locals: {
					dist: '/public/dist/',
					title: 'jpo test suite'
				}
			}))
			.pipe(concat('index.html'))
			.pipe(gulp.dest('./'));
	});

	/**
	 * Gulp live reload task
	 */
	gulp.task('live', function() {
		gulp.watch('./public/stylesheets/**/*.less', ['less']);
		gulp.watch(['./public/javascripts/**/*.js'], ['browserify']);
	});

	/**
	 * Register default gulp tasks
	 */
	gulp.task('build', ['uglify', 'less', 'jade']);
	gulp.task('default', ['build']);

	/**
	 * If the process argument is not a registered gulp task, throw exception to terminate the process
	 */
	if (task && !gulp.hasTask(task)) {
		throw "Gulp task '" + task + "' not registered";
	}
})(process, require);