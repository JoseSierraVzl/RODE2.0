const {app,BrowserWindow, Menu} = require('electron');
const url = require('url');
const paht = require('path');


if (process.env.NODE_ENV !== 'production'){
	
	require('electron-reload')(__dirname, {
		electron: paht.join(__dirname, '../node_modules', '.bin', 'electron')
	})
};


let mainWindow;
let newDebtor;

app.on('ready', () =>{
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: paht.join(__dirname,'views/index.html'),
		protocol: 'file',
		slashes: true
	}));

	const mainMenu = Menu.buildFromTemplate(templateMenu);
	Menu.setApplicationMenu(mainMenu);

	mainWindow.on('closed', () => {
		app.quit();
	})
});


function addNewDebtor() {
	newDebtor = new BrowserWindow({
		width: 550,
		height: 550,
		titel: 'Agregar nuevo deudor'

	});

	newDebtor.setMenu(null);

	newDebtor.loadURL(url.format({
		pathname: paht.join(__dirname,'views/new_debtor.html'),
		protocol: 'file',
		slashes: true
	}));

	newDebtor.on('closed', () => {
		newDebtor = null;
	});
}


const templateMenu = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Nuevo Deudor',
				accelerator:'Ctrl+N',
				click(){
					addNewDebtor();
				}
			},
			
			{
				label: 'Exit',
				accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}	
			}
		]		
	}
];

if (process.platform === 'darwin'){
	templateMenu.unshift({
		label: app.getName()
	});
};

if (process.env.NODE_ENV !== 'production'){
	templateMenu.push({
		label:'DevTools',
		submenu: [
			{
				label:'Show/Hide DevTools',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools()
				}
			},
			{
				role: 'reload'
			}
		]
	})
}
