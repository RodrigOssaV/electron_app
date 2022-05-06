const database = require('../js/database')

class Client {
    constructor(){
        this.formNewClient = document.getElementById('#formNewClient')
        this.btnCreateClient = document.getElementById('#btnCreateClient')
    }

    addEventListeners(){
        this.formNewClient.addEventListener('submit', this.btnCreateClient.bind(this))
    }
}

let client = new Client()