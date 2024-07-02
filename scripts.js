// scripts.js

// array de productos, recuperado de localStorage si existe
const productos = JSON.parse(localStorage.getItem('productos')) || [
    {id: 1, nombre: "arroz", precio: 10, cantidad: 10},
    {id: 2, nombre: "fideo", precio: 1, cantidad: 10},
    {id: 3, nombre: "polenta", precio: 20, cantidad: 10},
    {id: 4, nombre: "papa", precio: 100, cantidad: 10},
];

const getProductIndexByName = (nombre) => {
    return productos.findIndex(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

const updateProductList = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing content
    productos.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}, Cantidad: ${producto.cantidad}`;
        productList.appendChild(productItem);
    });
}

const saveToLocalStorage = () => {
    localStorage.setItem('productos', JSON.stringify(productos));
}

document.getElementById('btn1').addEventListener('click', () => {
    const id = parseInt(prompt("Ingrese ID producto"));
    const nombre = prompt("Ingrese Nombre del producto");
    const precio = parseFloat(prompt("Ingrese Precio del producto"));
    const cantidad = parseInt(prompt("Ingrese la cantidad del producto"));
    const producto = {id: id, nombre: nombre, precio: precio, cantidad: cantidad};
    productos.push(producto);
    saveToLocalStorage();
    updateProductList();
    alert("Producto agregado: id:" + producto.id + " nombre :" + producto.nombre);
    console.log("Lista actualizada de productos:", productos);
});

document.getElementById('btn2').addEventListener('click', () => {
    const productoBuscado = prompt("¿Qué producto quiere comprar?");
    const index = getProductIndexByName(productoBuscado);
    if (index !== -1) {
        const producto = productos[index];
        alert(`La venta es de $${producto.precio}`);
        productos[index].cantidad -= 1;
        saveToLocalStorage();
        updateProductList();
    } else {
        alert("Lo lamentamos, no tenemos este producto");
    }
});

document.getElementById('btn3').addEventListener('click', () => {
    const productoBuscado = prompt("Ingrese el nombre del producto para cambiar el precio");
    const index = getProductIndexByName(productoBuscado);
    if (index !== -1) {
        const nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del producto"));
        productos[index].precio = nuevoPrecio;
        saveToLocalStorage();
        updateProductList();
        alert(`El nuevo precio de ${productoBuscado} es $${productos[index].precio}`);
    } else {
        alert("Producto no encontrado");
    }
});

document.getElementById('btn4').addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const header = document.querySelector('.header');
    header.classList.toggle('dark-mode');
    const botton = document.querySelector('.Botton');
    botton.classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-mode');
    });
    localStorage.setItem('darkMode', isDarkMode); // Guardar estado en local storage
});

// Cargar estado de modo oscuro desde local storage
const loadDarkMode = () => {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const header = document.querySelector('.header');
        header.classList.add('dark-mode');
        const botton = document.querySelector('.Botton');
        botton.classList.add('dark-mode');
        document.querySelectorAll('button').forEach(button => {
            button.classList.add('dark-mode');
        });
    }
}

// Inicializar la lista de productos en la página
updateProductList();
loadDarkMode(); // Aplicar modo oscuro si estaba activado previamente
