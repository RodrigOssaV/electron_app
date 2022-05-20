/* const { ipcRenderer } = require('electron'); */
const ssttdb = require('../js/ssttdb')
const btnCreateSSTT = document.querySelector('#btnCreateSSTT')
const btnDeleteAll = document.querySelector('#btnDeleteAll')

reloadBox()

btnDeleteAll.addEventListener('click', () => {
    ssttdb.deleteSSTTs((op) => {
        boxSSTT.innerHTML = ''
    })
    /* reloadBox() */
})

btnCreateSSTT.addEventListener('click', () => {
    const name = document.querySelector('#name').value
    const description = document.querySelector('#description').value
    const newSSTT = {
        name: name,
        description: description
    }
    /* console.log(newSSTT) */
    ssttdb.addSSTT(name, description)
    document.querySelector('#name').value = ''
    document.querySelector('#description').value = ''
    reloadBox()
})

function reloadBox(){
    boxSSTT.innerHTML = ''
    ssttdb.getSSTTs((sstts) => {
        console.log(sstts)
        for(const sstt of sstts){
            newTemplate = `
                <tr>
                    <td>${sstt.name}</td>
                    <td>${sstt.description}</td>
                </tr>
            `
            boxSSTT.innerHTML += newTemplate
        }
    })
}

