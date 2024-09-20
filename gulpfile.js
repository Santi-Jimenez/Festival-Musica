//const nos crea funciones, ciertas funciones que ya incluye gulp
//Src identificar un archivo
//dest es una funciona almacenar algo en una carpeta de estilo(guardar archivo)

const { src, dest, watch, parallel} = require("gulp"); //require es una forma de extraerlo la funcionalidad del gulp en node
//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
const autopreficer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const autoprefixer = require("autoprefixer");

//javascipt
const terser = require('gulp-terser-js');
 
//se requiere un conector para que este sass se puede comunicar con gulp
function css (done){
    //3pasos, el primero identificar el archivo de SASS               167
    //compilarlo*
    //almacenar en el disco  
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( plumber())
        .pipe( sass() ) //aplicar sass para que lo compile
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest("build/css"))  //lugar donde lo almacena
        //se puede tener varios pipe, pero una vez que finalice uno se hace llamar el siguiente. .una vez que este identificado comienza entonces a ejecutar el contenido del pipe
 
    done(); //call back que avisa a gulp cuando llegamos al final 
}

//img
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
       .pipe( cache( imagemin(opciones) ) )
       .pipe( dest('build/img') )
    done();
}

function versionWebp( done ){
   const opciones = {
         quality: 50
   };
   src('src/img/**/*.{png,jpg}') //va entre llave xq va a buscar dos formatos
       .pipe( webp(opciones) )
       .pipe( dest('build/img') ) 

   done();
}

function versionAvif( done ){
    const opciones = {
          quality: 50
    };
    src('src/img/**/*.{png,jpg}') //va entre llave xq va a buscar dos formatos
        .pipe( avif(opciones) )
        .pipe( dest('build/img') ) 
 
    done();
 }

function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init() )
    .pipe( terser() )
    .pipe(dest('build/js') )
    .pipe(sourcemaps.write('.') )

    done();
}

function dev(done){  //dev, de desarrollo y va a ejecutar algunas funciones mas de adelante
 
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript); 
    done();     
}
exports.css = css;
exports.js = javascript;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel( versionAvif ,imagenes, versionWebp, javascript, dev);