var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");

menu_btn.addEventListener("click", () => {

    	sidebar.classList.toggle("active-nav");
    	container.classList.toggle("active-cont");
});

// Ventana nuevo deudor 

const electron = require('electron');
// path ya está declarado
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow;

const btnAdd = document.getElementById('form-debtor');

btnAdd.addEventListener('click', function (event) {

      const modalPath = path.join('file://', __dirname, 'new_debtor.html');

    let win = new BrowserWindow({ width: 650, height: 580})

    win.on('close', function () {win= null})
    win.loadURL(modalPath)
    win.show()

})

	// const { ipcRenderer } = require('electron');
	// const sqlite3 = require('sqlite3').verbose();
	// const fs = require('fs');

	// const debtor = document.querySelector('#debtor');

	// function deleteDebtor(name) {
	// 	var base_datos = new sqlite3.Database('src/db/debtor.db');
	// 	const nombreApellido = document.querySelectorAll('.card-title').value;

	// 	base_datos.serialize(function() {
	// 		base_datos.run('DELETE FROM debtor WHERE nombre_apellido = ?', name)
	// 	});
	// 	base_datos.close();

	// };


	// // Consultando base de datos
	// function selectDb() {
	// 	var base_datos = new sqlite3.Database('src/db/debtor.db');

	// 	base_datos.serialize(function() {

	// 		base_datos.each("SELECT rowid AS id, nombre_apellido, description, monto FROM debtor", function(err, debtorDB) {
	// 			const id = debtorDB.id;
	// 			const nombre_apellido = debtorDB.nombre_apellido;
	// 			const description = debtorDB.description;
	// 			const monto = debtorDB.monto;

	// 			const newDebtorTemplate = `
	// 						<div class = "col-xs-4 p-2 ">
	// 								<p class="text-center id-card box-shadow">${id}</p>
	// 							<div class="card text-center box-shadow">
	// 								<div class="card-header">
	// 									<h5 class="card-title">${nombre_apellido}</h5>
	// 								</div>
	// 								<div class="card-body">
	// 									<p class="text-break">${description}</p>
	// 									<hr/>
	// 									<p>${monto}</p>
	// 								</div>
	// 								<div class="card-footer">
	// 									<button class="btn btn-danger btn-sm">ELIMINAR</button>
	// 								</div>
	// 							 </div>
	// 						</div>`;
	// 			debtor.innerHTML += newDebtorTemplate;
	// 			const btnDelate = document.querySelectorAll('.btn.btn-danger.btn-sm');
	// 			btnDelate.forEach(btn => {
	// 				btn.addEventListener('click', e => {
	// 					console.log("ELMINAR ACTIVO")
	// 					deleteDebtor(nombreApellido)
	// 					var cls = setTimeout(function cls(){ipcRenderer.send('reload:index');}, 3000)
						

	// 					e.target.parentElement.parentElement.parentElement.remove();
	// 				});
	// 			});
	// 		});
	// 		base_datos.close();
	// 	})
	// };

	// setTimeout(selectDb, 2000);


	/*ipcRenderer.on('debtor:new', (e, new_Debtor) => {

		const newDebtorTemplate = `
					<div class = "col-xs-4 p-2">
						<div class="card text-center">
							<div class="card-header">
								<h5 class="card-title">${new_Debtor.name}</h5>
							</div>
							<div class="card-body">
								<p>${new_Debtor.description}</p>
								<hr/>
								<p>${new_Debtor.monto}</p>
							</div>
							<div class="card-footer">
								<button class="btn btn-danger btn-sm">ELIMINAR</button>
							</div>
						 </div>
					</div>`;

		debtor.innerHTML += newDebtorTemplate;

	});*/