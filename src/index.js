const { app, BrowserWindow, Menu, ipcMain } = require('electron')

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

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
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
        height: 600,
        title: 'Add a New Product',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    /* newProductWindow.setMenu(null) */
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', () => {
        newProductWindow = null
        /* require('dialog').showMessageBox({
            message: "Close button has been pressed!",
            buttons: ["OK"]
        }) */
    })
}

function createTaskWindow(){
    taskWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Task',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    
    taskWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/task.html'),
        protocol: 'file',
        slashes: true
    }))

    taskWindow.on('closed', () => {
        taskWindow = null
    })
}

ipcMain.on('product:new', (event, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct)
    /* newProductWindow.close()  */   
})

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Client',
                accelerator: 'Ctrl+A',
                click(){
                    createNewProductWindow()
                }
            },
            {
                label: 'Task',
                accelerator: 'Ctrl+S',
                click(){
                    createTaskWindow()
                }
            },
            {
                label: 'Remove All Products',
                click(){
                    mainWindow.webContents.send('products:remove-all');
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