const { ipcRenderer } = require('electron');
const db = require('../js/database');

const selectID = document.querySelector('#selectID')
const boxClient = document.querySelector('#boxClient')
const btnGenerate = document.querySelector('#btnGenerate');
const radioButtons = document.querySelectorAll('input[name="Test"]');
const textArea = document.querySelector('#textArea'); 

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
            <div class="columns">
                <div class="column is-half">
                    <div class="control">
                        <label for="" class="label is-size-7">ID</label> 
                        <input type="text" class="input is-small" disabled value="${clients.idCall}" placeholder="ID">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">Teléfono</label>
                        <input type="text" class="input is-small" disabled value="${clients.phone}" placeholder="TEL">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">ONT</label>
                        <input type="text" class="input is-small"  value="" placeholder="ONT">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">Nodo</label>
                        <input type="text" class="input is-small" value="" placeholder="Nodo">
                    </div>
                </div>
                <div class="column is-half">
                    <div class="control">
                        <label for="" class="label is-size-7">Nombre</label>
                        <input type="text" class="input is-small" disabled placeholder="Nombre" value="${clients.name}">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">RUT</label>
                        <input type="text" class="input is-small" disabled placeholder="Nombre" value="${clients.rut}">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">OLT</label>
                        <input type="text" class="input is-small" value="" placeholder="OLT">
                    </div>
                    <div class="control">
                        <label for="" class="label is-size-7">.</label>
                        <button class="button is-primary is-size-7" id="btnGenerate">
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        `
        boxClient.innerHTML += templateClient
        /* textArea.innerHTML = templateClient */
    })
    boxClient.innerHTML = ''
    /* textArea.innerHTML = '' */
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
    console.log(selectedTest);
    const newTestTemplate = `
        SOP ${date.toLocaleDateString()} - ${prueba.prueba}
    `
    boxClient.innerText = newTestTemplate;
});