import { getProducts, getProduct } from "./firebase.js";

let carrito = [];

let precioTotal = 0;

const vaciarCarro = document.querySelector('.vaciarCarro');

const vaciarCarrito = () =>{

    precioTotal = 0;

    carrito.length = 0;

    document.querySelector('.visual-total').textContent = precioTotal;

    document.querySelector('.inner-cart').innerHTML = '';
}

vaciarCarro.addEventListener('click', vaciarCarrito);


const confirmarCompra = document.querySelector('.confirmarCompra');

const realizarCompra = () =>{

  if (carrito.length === 0) { 
    return 
}else{
    Swal.fire({
            title: 'Desea continuar con la compra?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar compra'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Compra Realizada',
                'Su paquete sera despachado pronto',
                'success'
            )
            }
})
    precioTotal = 0;

    carrito.length = 0;

    document.querySelector('.visual-total').textContent = precioTotal;

    document.querySelector('.inner-cart').innerHTML = '';
}
}

confirmarCompra.addEventListener('click', realizarCompra);



const actualizarPrecio = (precio) =>{

    const visualTotal = document.querySelector('.visual-total');

    precioTotal += precio

    visualTotal.textContent= precio;
}

const chequearCarrito = (id) => carrito.some(producto => producto.id=== id);


const añadirAlCarrito = async  (e) =>{

    

    if(chequearCarrito(e.target.id)){
        
      carrito = carrito.map((producto) => {
            
        if (producto.id === e.target.id) {
            
            producto.cantidad += 1;
            
           
          }
          return producto;
        });

    }else{
    
        const productoAlCarrito = await getProduct(e.target.id);
        
        productoAlCarrito.cantidad = 1;

        productoAlCarrito.precio = (productoAlCarrito.data().Precio);

        carrito.push(productoAlCarrito);
        
        
    }

    let precio = 0;

    carrito.forEach((producto) => {

      precio += producto.cantidad * producto.data().Precio;
    });

    actualizarPrecio(precio);

    renderCarrito();
}

const renderCarrito = () => {

    const dentroDelCarrito = document.querySelector('.inner-cart');

    dentroDelCarrito.innerHTML= '';

    carrito.forEach(producto => {

        const carta = document.createElement('div');

        carta.className = 'card col-10 col-md-12 col-xxl-12 mb-3';

        carta.innerHTML = `
        
        <div class="row g-0">
            <div class="col-3 col-md-2">
                <img src=${producto.data().IMG} class="img-fluid rounded-start" alt=${producto.data().Nombre}>
            </div>
            <div class="col-9 col-md-10 col-xxl-12">
                <div class="card-body col-md-12 col-xxl-12">
                <h6 class="col-12 col-md-6 col-xxl-6 card-title">${producto.data().Nombre}</h6>
                <p class=" col-12 col-md-3 card-text">Cant.${producto.cantidad}</p>
            </div>
        </div>
        </div>
        `;

        dentroDelCarrito.append(carta);
    });

}

const añadirEvento = () =>{

    const comprarBtns = document.querySelectorAll('.comprar-btns');

    comprarBtns.forEach(btn => btn.addEventListener('click', añadirAlCarrito));
}

const renderCartas= async (productosArr) =>{

    const productos = await productosArr;

    const cartas = document.querySelector('.cards');

    productos.forEach(producto =>{

        const carta= document.createElement('div');
    
        carta.className = 'card col-7 col-md-5 col-lg-3 col-xl-2 col-xxl-1 m-2 style="width: 18rem;"' ;

        carta.innerHTML = `
        
            <img src=${producto.data().IMG} class="card-img-top product-img" alt=${producto.data().Nombre}>
        <div class="card-body">
            <h5 class="card-title">${producto.data().Nombre}</h5>
            <p class="card-text">$ ${producto.data().Precio}</p>
            <button class="btn btn-primary comprar-btns" id=${producto.id}>Añadir al Carrito </button>
        </div>
        
        `;
    
        cartas.append(carta);
    
    });
        
    añadirEvento();
}

renderCartas(getProducts());

