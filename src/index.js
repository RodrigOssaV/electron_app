const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron')

const path = require('path')
const url = require('url')

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow
let newProductWindow
let taskWindow
let ssttWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 450,
        height: 800,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed', () => {
        app.quit()
    })
})

function createNewProductWindow(){
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 420,
        resizable: false,
        title: 'Nueva llamada',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    newProductWindow.setMenu(null)
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', () => {
        newProductWindow = null
    })
}

function createTaskWindow(){
    taskWindow = new BrowserWindow({
        width: 800,
        height: 620, 
        title: 'Tarea',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    taskWindow.setMenu(null)
    taskWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/task.html'),
        protocol: 'file',
        slashes: true
    }))

    taskWindow.on('closed', () => {
        taskWindow = null
    })
}

function createSSTTWindow(){
    ssttWindow = new BrowserWindow({
        title: 'Comentarios',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    ssttWindow.setMenu(null)
    ssttWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-sstt.html'),
        protocol: 'file',
        slashes: true
    }))

    ssttWindow.on('close', () => {
        ssttWindow = null
    })
}

ipcMain.on('product:new', (event, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct)
    newProductWindow.close()    
})

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Nueva llamada',
                accelerator: 'Ctrl+D',
                click(){
                    createNewProductWindow()
                }
            },
            {
                label: 'Tareas',
                accelerator: 'Ctrl+F',
                click(){
                    createTaskWindow()
                }
            },
            {
                label: 'Descripción Tareas',
                accelerator: 'Ctrl+G',
                click(){
                    createSSTTWindow()
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            }
        ]
    }    
]

/* if(process.platform !== 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    })
} */

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}