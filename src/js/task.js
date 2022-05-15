const { ipcRenderer } = require('electron');
const db = require('../js/database');
const ssttdb = require('../js/ssttdb')

const selectID = document.querySelector('#selectID')
const boxClientOne = document.querySelector('#boxClientOne')
const boxClientTwo = document.querySelector('#boxClientTwo')
const showSSTT = document.querySelector('#showSSTT')
const btnGenerate = document.querySelector('#btnGenerate')
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
                <input type="text" class="input is-small" disabled value="${clients.idCall}">
            </div>
            <div class="control">
                <label for="" class="label is-size-7">Teléfono</label>
                <input type="text" class="input is-small" disabled value="${clients.phone}">
            </div>
        `
        boxClientOne.innerHTML += templateClient
        const templateClientTwo = `
            <div class="control">
                <label for="" class="label is-size-7">Nombre</label>
                <input type="text" class="input is-small" disabled value="${clients.name}">
            </div>
            <div class="control">
                <label for="" class="label is-size-7">Comuna</label>
                <input type="text" class="input is-small" disabled value="${clients.comuna}">
            </div> 
        `
        boxClientTwo.innerHTML +=templateClientTwo
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

ssttdb.getSSTTs((sstts) => {
    console.log(sstts)
    for(const sstt of sstts){
        const newTemplateSSTT = `
            <label for="" class="radio">
                <input type="radio" name="Test" value="${sstt.description}"> ${sstt.name}
            </label>
        `
        showSSTT.innerHTML += newTemplateSSTT
        const radioButtons = document.querySelectorAll('input[name="Test"]')
        btnGenerate.addEventListener('click', () => {
            let selectedTest;
            let date = new Date();
            /* console.log(radioButtons) */
            for (const radioButton of radioButtons){
                if(radioButton.checked){
                    selectedTest = radioButton.value;
                    break;
                }
            }
            const prueba = {
                prueba: selectedTest
            }
            console.log(selectedTest)
            console.log(newClient)
            const newTestTemplate = `
                SOP ${date.toLocaleDateString()} - ${prueba.prueba}
                ID: ${newClient[0].idCall}
                TEL: ${newClient[0].tel}
                NOM: ${newClient[0].nom}
            `
            boxClient.innerText = newTestTemplate;
        })
    }
})







