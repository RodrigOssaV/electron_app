const { ipcRenderer } = require('electron');
const db = require('../js/database');

const selectID = document.querySelector('#selectID')
const boxClient = document.querySelector('#boxClient')
const btnGenerate = document.querySelector('#btnGenerate')
const radioButtons = document.querySelectorAll('input[name="Test"]')
const textArea = document.querySelector('#textArea')
const newClient = []

db.getClients((clients) => {
    for(const client of clients){
        const newTemplateClients = `
            <option value="${client.idCall}">${client.idCall}</option>
        `
        selectID.innerHTML += newTemplateClients
    }
})

btnSearch.addEventListener('click', () => {
    const selectValue = selectID.value
    db.getClient(selectValue, (clients) => {
        /* console.log(clients) */
        const templateClient = `
        <div class="control">
            <label for="" class="label is-size-7">ID</label> 
            <input type="text" class="input is-small" disabled value="${clients.idCall}" placeholder="ID">
        </div>
        <div class="control">
            <label for="" class="label is-size-7">Teléfono</label>
            <input type="text" class="input is-small" disabled value="${clients.phone}" placeholder="TEL">
        </div>
        <div class="control">
            <label for="" class="label is-size-7">Nombre</label>
            <input type="text" class="input is-small" disabled placeholder="Nombre" value="${clients.name}">
        </div>
        <div class="control">
            <label for="" class="label is-size-7">RUT</label>
            <input type="text" class="input is-small" disabled placeholder="Nombre" value="${clients.rut}">
        </div>
        `
        boxClient.innerHTML += templateClient
        const btnGenerateExtra = document.querySelector('#btnGenerateExtra')
        btnGenerateExtra.addEventListener('click', () => {
            const ont = document.querySelector('#ont').value
            const nodo = document.querySelector('#nodo').value
            const olt = document.querySelector('#olt').value
            const clientExtraInfo = {
                idCall: clients.idCall,
                rut: clients.rut,
                tel: clients.phone,
                nom: clients.name,
                ont: ont,
                nodo: nodo,
                olt: olt
            }
            newClient.push(clientExtraInfo)       
        })
    })
    boxClient.innerHTML = ''
})



btnGenerate.addEventListener('click', () => {
    let selectedTest;
    let date = new Date();
    for (const radioButton of radioButtons){
        if(radioButton.checked){
            selectedTest = radioButton.value;
            break;
        }
    }
    const prueba = {
        prueba: selectedTest
    }
    /* console.log(selectedTest)
    console.log(newClient) */
    const newTestTemplate = `
        SOP ${date.toLocaleDateString()} - ${prueba.prueba}
        ID: ${newClient[0].idCall}
    `
    boxClient.innerText = newTestTemplate;
});