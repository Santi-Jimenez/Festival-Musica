
//para crear galeria

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function() {
    //ya que es una funcion o metodo se le agrega el parentesis  
        if( sobreFestival.getBoundingClientRect().top < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll); //target es lo que le dimos click
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body'); //al darle clic en costado q no sea la img se elimina el overlay
        body.classList.remove('fijar-body');
        overlay.remove(); 
    }

    //boton para cerrar el modal(imagenes)
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove(); //remuve el overlay lo cual su funcion es abrir la imagen, y al removerlo cierra la imagen en darle clic al boton
    }
    overlay.appendChild(cerrarModal);


    //añadirlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);  //hace que se vayan agregando al body las imagenes
    body.classList.add('fijar-body');
}