const electron = require('electron');
const app = electron.app;
const menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
	
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL('file://' + __dirname + '/src/main/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Exit",
          click: function() {
              app.quit();
          }
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Author",
          click: function() {
            const options = {
            type: 'info',
            buttons: ['OK'],
            defaultId: 0,
            title: 'Author',
            message: 'Author: Astapenka Pavel, 753501, 2020'
          };
        
          electron.dialog.showMessageBox(null, options);
          }
        },
        {
          label: "About Electron",
          click: function() {
            electron.shell.openExternal("https://electron.atom.io");
          }
        }
      ]
    }
  ];

  const _menu = menu.buildFromTemplate(template);
  menu.setApplicationMenu(_menu);
});