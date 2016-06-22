"use strict";

var gulp = require('gulp'),
	concat = require('gulp-concat'), 
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	 sass = require('gulp-sass'),
	 maps = require('gulp-sourcemaps'),
	 clean = require('gulp-del');

gulp.task('concatScripts', function(){
	return gulp.src([
			'js/myTools.js',
			'js/myown.js'
		])
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./')) 
	.pipe(gulp.dest('js')); // żeby depedency zadziałała, funkcja musi zwraca 
	// wartość stąd istotne w takich funkcjach jest żeby   
});

gulp.task('minifyScripts', ['concatScripts'] , function(){
	return gulp.src([
			'js/app.js' 
		]).pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('js'));
});


gulp.task('compileSass', function(){
	return gulp.src([
			'sass/main.sass' 
		])
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./')) 
	.pipe(gulp.dest('css'));
});

gulp.task('watchSass', function(){
	gulp.watch('sass/**/*.sass', ['compileSass']); // można dodać kilka watchów
});

gulp.task('serve', ['watchSass']); // możesz uruchomić kilka watchów, potem postawi serwer node i obserwować zmiany na żywo

gulp.task('clean', function(){
	del(['PROD', 'css/main.css*', 'js/app*.js*']); // umożliwia skasowanie wybranych lokalizacji, robi się żeby mie pewność 
	// że produkcja jest zawsze najnowszym rozwiązaniem / WYMAGA ZAINSTALOWANIA 
	});

gulp.task('build', ['concatScripts', 'compileSass'], function(){ 
	// wszystkie zadania ruszają jednocześ, dlatego jeżeli są zależ trzeba zwróciś uwagę żeby działało ro jak trzeba
	// i wstrzykiwać zależności po koleji  

	return gulp.src(['css/main.css', 'js/app.min.js', 'Index.html', 'fonts/**'], { base: './' }) 
	// dzięki określeni "base:", wie jaką zbudować strukturę plików
		.pipe(gulp.dest('PROD')); // - określa folder do któego przegrane mają by bazowe pliki produkcyjne 


	console.log('To jest zadanie końcowe!'); 
});

gulp.task('default',['clean'], function(){ 	// - 'default' to zadanie będzie oadpalane po wpisaniu w konsole samego gulp
	gulp.start('build'); // - ta metoda mogła się zmienić 	
});

///	DOBRA PRAKTYKA - jeżeli nie ma Read.me to najlepiej oglądać build od dołu zadanie po zadanie Depedencies
/// zoorientować ssię jak bower może współgrać z .NETs
/// zapoznać się z Yeomanem http://yeoman.io/