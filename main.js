const { app, BrowserWindow } = require('electron')
const path = require('path')  // Importar 'path' para gestionar rutas

let mainWindow

function createWindow() {
    // Crear una ventana del navegador
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true // Permite usar Node.js en el HTML
        }
    })

    // Cargar el archivo HTML desde la carpeta 'templates'
    mainWindow.loadFile(path.join(__dirname, 'templates', 'index.html'))

    // Abrir las herramientas de desarrollo (opcional)
    // mainWindow.webContents.openDevTools()

    // Cuando la ventana se cierre
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// Cuando Electron termine de inicializar
app.whenReady().then(createWindow)

// En macOS, es común que las aplicaciones estén abiertas mientras haya ventanas abiertas
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Salir cuando todas las ventanas se cierren
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
