
// // Cargar la plantilla de navbar usando JavaScript
// window.addEventListener('DOMContentLoaded', () => {
//     const navbarPlaceholder = document.getElementById('navbar-placeholder');
//     navbarPlaceholder.innerHTML = '<object type="text/html" data="navbar.html" ></object>';
// });



document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });
});


const btnDesplegable = document.querySelector("#btn-desplegable")
const desplegable = document.querySelector("#desplegable")

btnDesplegable.addEventListener('click', ()=>{
    console.log(desplegable.style.display)
    if(desplegable.style.display == "none") {
        desplegable.style.display = "block"
    } else {
        desplegable.style.display = "none"
    }
})




const productos = [
    { id: "1", titulo: "Producto 1", descripcion: "Descripción del producto 1.", imagen: "./img/florero.jpeg", precio: "$10" },
    { id: "2", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/florero2.jpeg", precio: "$15" },
    { id: "3", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "4", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "5", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "6", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "7", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "8", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "9", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "10", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "11", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "12", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },
    { id: "13", titulo: "Producto 2", descripcion: "Descripción del producto 2.", imagen: "./img/veladorLuna.jpeg", precio: "$15" },

];

// Función para generar las tarjetas de producto
function generarTarjetas() {
    const cardContainer = document.getElementById("card-container");

    productos.forEach(producto => {
        // Crear elementos HTML para la tarjeta de producto
        const card = document.createElement("div");
        card.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.titulo;
        imagen.classList.add("imagenProducto" + producto.id);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const titulo = document.createElement("h2");
        titulo.textContent = producto.titulo;
        titulo.classList.add(`nombreProducto${producto.id}`);

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.id = "precioProducto"
        precio.textContent = `Precio: ${producto.precio}`;

        const boton = document.createElement("button");
        console.log("imagen", imagen.src)
        boton.id = "btn-" + producto.id
        boton.setAttribute("data-id", producto.id);

        // addEventListener('click', () => agregarAlCarrito(imagen.src, titulo.textContent));
        boton.textContent = "Agregar al Carrito";
        // Agregar elementos a la tarjeta de producto
        cardContent.appendChild(titulo);
        cardContent.appendChild(descripcion);
        cardContent.appendChild(precio);
        cardContent.appendChild(boton);

        card.appendChild(imagen);
        card.appendChild(cardContent);



        if(cardContainer) {
            cardContainer.appendChild(card);
        }
    });
}

// Llamar a la función para generar las tarjetas al cargar la página
window.addEventListener('DOMContentLoaded', generarTarjetas);


function animarElementoOnScroll() {
    const elemento = document.querySelector('.content-servicios');
    const distanciaDesdeLaParteSuperior = elemento.getBoundingClientRect().top;

    // Verifica si el elemento está visible en la ventana
    if (distanciaDesdeLaParteSuperior < window.innerHeight / 2) {
        // Si el elemento está visible, agrega las clases de animación
        elemento.classList.add('animate__animated', 'animate__slideInUp');
        // Agrega un pequeño retraso para asegurar que la animación se active
        setTimeout(() => {
            elemento.style.display = "flex";
        }, 100); // Puedes ajustar este valor según sea necesario
    }
}

// Agrega un event listener al evento scroll
window.addEventListener('scroll', animarElementoOnScroll);

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


document.addEventListener('DOMContentLoaded', function () {
    // Llamas a la función consultarApi con los valores de la ciudad y el país deseados
    consultarApi('ciudad autonoma de buenos aires', 'Argentina');
});


function consultarApi(ciudad, pais) {

    const appId = '4a82dce44d60f84db126afbe6d3fd1da';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === "404") {
                mostarError('Ciudad no encontrada')
                return;
            }
            console.log(datos)

            //imprime la respuesta en el HTML
            mostrarClima(datos);
        })

}


function mostrarClima(datos) {
    console.log("mostrarClima")
    const { name, main: { temp, temp_max, temp_min } } = datos
    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451; `
    actual.classList.add('font-bold', 'text-6xl')

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451`
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451`
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);


    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);



document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = "." + window.location.pathname;
    console.log("currentUrl", currentUrl)

    const navLinks = document.querySelectorAll('nav ul li a');



    navLinks.forEach(link => {
        let linkCompleto = './impresiones3d' + link.getAttribute('href').replace(/^\./, '');
        console.log("linkCompleto ", linkCompleto)


        if (linkCompleto === currentUrl) {
            link.classList.add('active');
        }
    });
});


//Carrito

    const contadorCarrito = document.querySelector("#contadorCarrito")
    let contador = 0;



    setTimeout(() => {
        document.querySelectorAll('button').forEach(boton => {
        console.log("BOTON")
        boton.addEventListener('click', function () {
            agregarAlCarrito(this.getAttribute('data-id'));
        });
    });

    }, 100);
    



    function agregarAlCarrito(productoId) {

        let imgProducto;
        let nombreProducto

        imgProducto = document.querySelector(`.imagenProducto${productoId}`)
        console.log("imgCarrera", imgProducto.src)
        nombreProducto = document.querySelector(`.nombreProducto${productoId}`)
        console.log("nombreCarrera ", nombreProducto.textContent)


        const productoObj = {
            imagen: imgProducto.src,
            nombre: nombreProducto.textContent,
            precio: "16000"
            // precio: precioCarrera
        };




        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // Agregar el producto al carrito
        carrito.push(productoObj);
        console.log("producto:", productoObj)
        console.log("Carrito", carrito)

        
        contador = carrito.length;
        contadorCarrito.innerText = contador

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // window.addEventListener('load', function () {
    //     const btnAgregarAlCarrito = document.querySelector("#agregarAlCarrito");
    //     console.log("btnAgregarAlCarrito ", btnAgregarAlCarrito);
    //     btnAgregarAlCarrito.addEventListener('click', agregarAlCarrito);

    //     const btnAgregarCarrito = document.getElementById('agregarCarritoBtn');
    //     btnAgregarCarrito.addEventListener('click', agregarAlCarrito);

    // });
    

    // const btnAgregarCarrito = document.getElementById('agregarCarritoBtn')
    // btnAgregarCarrito.addEventListener('click', agregarAlCarrito);

