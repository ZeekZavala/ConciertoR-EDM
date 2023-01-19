const { src, dest, watch, parallel } = require('gulp'); //src es source y dest es destino, watch es para que se actualice todas las hijas de sass

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require ('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src('src/scss/**/*.scss')  
        .pipe(plumber())      //pipe ejecuta, se pueden poner varios y se ejectan en cadena //identificar el archivo de SASS
        .pipe(sass())              //Compilar 
        .pipe(dest('build/css'));   //Almacenarlo

    done(); //este es un callback a gulp cuando llegamos al final
}


function imagenes( done ){
    const opciones = {
        optimizationLevel: 3
    };
    
    src('src/img/**/*.{png,jpg}')
    .pipe( cache(imagemin(opciones))) //buscar en github imagemin 
    .pipe(dest('build/img'))
    done();
}
function versionWebp( done ){ 
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') //se pone primero la carpeta donde esta, ** son para nombre de archivo y {Es cuando quieres buscar mas de un elemento con diferentes formatos}
    .pipe( webp(opciones) )
    .pipe(dest('build/img')) //Dnnde queremos que se almacene
    done();
}
function versionAvif( done ){ 
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') //se pone primero la carpeta donde esta, ** son para nombre de archivo y {Es cuando quieres buscar mas de un elemento con diferentes formatos}
    .pipe( avif(opciones) )
    .pipe(dest('build/img')) //Dnnde queremos que se almacene
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel ( imagenes, versionWebp, versionAvif,dev ); //parallel hace que todas las funciones se ejecuten al mismo tiempo 