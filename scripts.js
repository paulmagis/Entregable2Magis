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

// Manejo de formularios y botones
document.getElementById('btn1').addEventListener('click', () => {
    toggleFormVisibility('add-product-form');
});

document.getElementById('btn2').addEventListener('click', () => {
    toggleFormVisibility('sell-product-form');
});

document.getElementById('btn3').addEventListener('click', () => {
    toggleFormVisibility('change-price-form');
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

// Funciones de formulario
const toggleFormVisibility = (formId) => {
    document.querySelectorAll('#form-container form').forEach(form => {
        if (form.id === formId) {
            form.classList.toggle('hidden');
        } else {
            form.classList.add('hidden');
        }
    });
};

document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = parseInt(document.getElementById('product-id').value);
    const nombre = document.getElementById('product-name').value;
    const precio = parseFloat(document.getElementById('product-price').value);
    const cantidad = parseInt(document.getElementById('product-quantity').value);
    const producto = {id: id, nombre: nombre, precio: precio, cantidad: cantidad};
    productos.push(producto);
    saveToLocalStorage();
    updateProductList();
    alert("Producto agregado: id:" + producto.id + " nombre :" + producto.nombre);
    document.getElementById('add-product-form').reset();
    toggleFormVisibility('add-product-form');
});

document.getElementById('sell-product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const productoBuscado = document.getElementById('sell-product-name').value;
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
    document.getElementById('sell-product-form').reset();
    toggleFormVisibility('sell-product-form');
});

document.getElementById('change-price-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const productoBuscado = document.getElementById('change-product-name').value;
    const index = getProductIndexByName(productoBuscado);
    if (index !== -1) {
        const nuevoPrecio = parseFloat(document.getElementById('new-product-price').value);
        productos[index].precio = nuevoPrecio;
        saveToLocalStorage();
        updateProductList();
        alert(`El nuevo precio de ${productoBuscado} es $${productos[index].precio}`);
    } else {
        alert("Producto no encontrado");
    }
    document.getElementById('change-price-form').reset();
    toggleFormVisibility('change-price-form');
});
