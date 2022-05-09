const { ipcRenderer } = require('electron');
const db = require('../js/database');

const form = document.querySelector('#form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const idCall = document.querySelector('#idCall').value;
    const phone = document.querySelector('#phone').value;
    const name = document.querySelector('#name').value;
    const rut = document.querySelector('#rut').value;
    const comuna = document.querySelector('#comuna').value;
    const newProduct = {
        idCall: idCall,
        phone: phone,
        name: name,
        rut: rut,
        comuna: comuna
    };
    db.addClient(idCall, phone, name, rut, comuna);
    ipcRenderer.send('product:new', newProduct);
});