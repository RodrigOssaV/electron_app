const { ipcRenderer } = require('electron');
const db = require('../js/database');
const ssttdb = require('../js/ssttdb')

const selectID = document.querySelector('#selectID') /* select */

db.getClients((clients) => {
    for(const client of clients){
        const newTemplateClients = `
            <option value="${client.idCall}">${client.idCall}</option>
        `
        selectID.innerHTML += newTemplateClients
    }
})

let optionRUT
const boxClientOne = document.querySelector('#boxClientOne')
const boxClientTwo = document.querySelector('#boxClientTwo')
const btnSearch = document.querySelector('#btnSearch')
btnSearch.addEventListener('click', () => {
    const selectValue = selectID.value
    db.getClient(selectValue, (clients) => {
        /* console.log(clients) */
        optionRUT = clients.rut
        const templateClient = `
            <div class="control">
                <label for="" class="label is-size-7">ID</label>
                <input type="text" class="input is-small" disabled value="${clients.idCall}" id="optionIDCall">
            </div>
            <div class="control">
                <label for="" class="label is-size-7">Teléfono</label>
                <input type="text" class="input is-small" disabled value="${clients.phone}" id="optionPhone">
            </div>
        `
        boxClientOne.innerHTML += templateClient
        const templateClientTwo = `
            <div class="control">
                <label for="" class="label is-size-7">Nombre</label>
                <input type="text" class="input is-small" disabled value="${clients.name}" id="optionName">
            </div>
            <div class="control">
                <label for="" class="label is-size-7">Comuna</label>
                <input type="text" class="input is-small" disabled value="${clients.comuna}" id="optionComuna">
            </div> 
        `
        boxClientTwo.innerHTML += templateClientTwo
    })
    boxClientOne.innerHTML = ''
    boxClientTwo.innerHTML = ''
    btnSearch.disabled = true
})

const newClient = []
/* console.log('This is list new client: ', newClient.length) */
const boxTemplateClient = document.querySelector('#boxTemplateClient')
const btnGenerateExtra = document.querySelector('#btnGenerateExtra')
btnGenerateExtra.addEventListener('click', () => {
    const optionIDCall = document.querySelector('#optionIDCall').value
    const optionPhone = document.querySelector('#optionPhone').value
    const optionName = document.querySelector('#optionName').value
    const optionComuna = document.querySelector('#optionComuna').value
    const optionONT = document.querySelector('#ont').value
    const optionNODO = document.querySelector('#nodo').value
    const optionOLT = document.querySelector('#olt').value
    const newTemplate = {
        optionRUT,
        optionIDCall,
        optionPhone,
        optionName,
        optionComuna,
        optionONT,
        optionNODO,
        optionOLT
    }
    newClient.push(newTemplate)
    /* console.log('this is a newTemplateClient: ', newTemplate) */
    const newTemplateClient = `
        <p>ID: ${newTemplate.optionIDCall}</p>
        <p>Nom: ${newTemplate.optionName}</p>
        <p>Tel: ${newTemplate.optionPhone}</p>
        <p>ONT: ${newTemplate.optionONT}</p>
        <p>OLT: ${newTemplate.optionOLT}</p>
        <p>Nodo: ${newTemplate.optionNODO}</p>
        <p>Comuna: ${newTemplate.optionComuna}</p>
    `
    boxTemplateClient.innerHTML += newTemplateClient
    /* console.log('This is list new client first insert: ', newClient.length) */
    btnGenerateExtra.disabled = true
})

const boxClient = document.querySelector('#boxClient')
const showSSTT = document.querySelector('#showSSTT')
ssttdb.getSSTTs((sstts) => {
    /* console.log(sstts) */
    for(const sstt of sstts){
        const newTemplateSSTT = `
            <option id="selectedTest" value="${sstt.description}">${sstt.name}</option>
        `
        showSSTT.innerHTML += newTemplateSSTT
    }
})
const btnGenerate = document.querySelector('#btnGenerate')
/* const ssttAdvanced = document.querySelector('#ssttAdvanced') */
/* const radioButtons = document.querySelectorAll('input[name="Test"]') */
btnGenerate.addEventListener('click', () => {
    boxClient.innerHTML = ''    
    /* console.log(radioButtons) */
    /* for (const radioButton of radioButtons){
        if(radioButton.checked){
            selectedTest = radioButton.value;
            break;
        }
    } */
    const selectedTest = showSSTT.value
    generateSSTTAdvanced(selectedTest, newClient)
})

function generateSSTTAdvanced(option, newClient){
    let date = new Date()
    const prueba = {
        prueba: option
    }
    /* console.log('this is option enter switch: ', option) */
    switch (option) {
        case '1':
            const templateFallaMasiva = 
            `ID: ${newClient[0].optionIDCall}\nNombre: ${newClient[0].optionName}\nRUT: ${newClient[0].optionRUT}\nTEL: ${newClient[0].optionPhone}\nONT/EMTA: ${newClient[0].optionONT}\nOLT: ${newClient[0].optionOLT}\nNODO: ${newClient[0].optionNODO}\nOBS: 
            `
            boxClient.innerHTML = templateFallaMasiva
            break;
        case '2':
            const templateSondeoLlamada = 
            `com: ${newClient[0].optionComuna} // mot: 
            `
            boxClient.innerHTML = templateSondeoLlamada
            break;
        case '3':
            const templateLatenciaJuego = 
            `Nombre: ${newClient[0].optionName}\nRUT: ${newClient[0].optionRUT}\nTEL: ${newClient[0].optionPhone}\nONT/EMTA: ${newClient[0].optionONT}\nOLT: ${newClient[0].optionOLT}\nNODO: ${newClient[0].optionNODO}\nIP:\nOBS:
            `
            boxClient.innerHTML = templateLatenciaJuego
            break;
        case '4':
            const templateNoRespondeLlamada = 
            `Se corta llamada y se devuelde en 3 oportunidades sin tener respuesta. No se da invitación a encuesta ni número de orden.\nID: ${newClient[0].optionIDCall} -
            `
            boxClient.innerHTML = templateNoRespondeLlamada
            break;
        case '5':
            const templatePersonal = `
            ID: ${newClient[0].optionIDCall}
            Nombre: ${newClient[0].optionName}
            RUT: ${newClient[0].optionRUT}
            TEL: ${newClient[0].optionPhone}
            ONT/EMTA: ${newClient[0].optionONT}
            OLT: ${newClient[0].optionOLT}
            NODO: ${newClient[0].optionNODO}
            OBS:
            `
            boxClient.innerHTML = templatePersonal
            break;
        default:            
            /* console.log(selectedTest)
            console.log(newClient) */
            const newTestTemplate =
            `SOP ${date.toLocaleDateString()} - ${prueba.prueba}\nID: ${newClient[0].optionIDCall}\nTEL: ${newClient[0].optionPhone}
            `
            boxClient.innerHTML = newTestTemplate
            break;
    }
}






