function cpf(v) {
    v = v.replace(/([^0-9\.]+)/g, '');
    v = v.replace(/^[\.]/, '');
    v = v.replace(/[\.][\.]/g, '');
    v = v.replace(/\.(\d)(\d)(\d)/g, '.$1$2');
    v = v.replace(/\.(\d{1,2})\./g, '.$1');
    v = v.toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,');
    v = v.split('').reverse().join('').replace(/^[\,]/, '');
    return v;
}

function mascara(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout("execmascara()", 1);
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}


    const { ipcRenderer } = require('electron');
    const sqlite3 = require('sqlite3').verbose();
    const fs = require('fs');
    //const closeWindowDebtor = ipcRenderer.send('debtor:new');
    const formNewDebtor = document.querySelector('#form-NewDebtor');

    /*formNewDebtor.addEventListener("submit", (e) => {
        const nameDebtor = document.querySelector('#nameDebtor').value;
        const descriptionDebtor = document.querySelector('#descriptionDebtor').value;
        const montoDebtor = document.querySelector('#montoDebtor').value;

        const new_Debtor = {
            name: nameDebtor,
            description: descriptionDebtor,
            monto: montoDebtor
        }


        ipcRenderer.send('debtor:new', new_Debtor);

        e.preventDefault();
    });
    */

    //const btnbasedatos = document.querySelector('#btn-createbase');
   function CloseWindow () {
      ipcRenderer.send('debtor:new');
   }

    function CreateDB() {

        const nameDebtor = document.querySelector('#nameDebtor').value;
        const descriptionDebtor = document.querySelector('#descriptionDebtor').value;
        const montoDebtor = document.querySelector('#montoDebtor').value;

        // Creando archivo de base de datos
        var base_datos = new sqlite3.Database('src/db/debtor.db');

        // Espacio para hacer operaciones en base de datos
        base_datos.serialize(function() { 

            // Crear tabla personas
            base_datos.run("CREATE TABLE IF NOT EXISTS debtor (nombre_apellido TEXT, description TEXT, monto TEXT)");

            // Insertando personas
            var stmt = base_datos.prepare("INSERT INTO debtor VALUES (?,?,?)");
            stmt.run(nameDebtor, descriptionDebtor, montoDebtor);
            stmt.finalize();

            // Consultando base de datos
            base_datos.each("SELECT rowid AS id, nombre_apellido FROM debtor", function(err, debtor) {
                console.log(debtor.id + ": " + debtor.nombre_apellido);
            });

        });

        // Cerrando acceso a base de datos
        base_datos.close();
        ipcRenderer.send('debtor:new');
    };

    function InsertDB() {

        const nameDebtor = document.querySelector('#nameDebtor').value;
        const descriptionDebtor = document.querySelector('#descriptionDebtor').value;
        const montoDebtor = document.querySelector('#montoDebtor').value;
        // Creando archivo de base de datos
        var base_datos = new sqlite3.Database('src/db/debtor.db');

        // Espacio para hacer operaciones en base de datos
        base_datos.serialize(function() {

            // Insertando personas
            var stmt = base_datos.prepare("INSERT INTO debtor VALUES (?,?,?)");

            stmt.run(nameDebtor, descriptionDebtor, montoDebtor);
            stmt.finalize();

            // Consultando base de datos
            base_datos.each("SELECT rowid AS id, nombre FROM debtor", function(err, debtor) {
                console.log(debtor.id + ": " + debtor.nombre);
            });

        });

        // Cerrando acceso a base de datos
        base_datos.close();
        ipcRenderer.send('debtor:new');
    };

    formNewDebtor.addEventListener("submit", (e) => {
        if (fs.existsSync('src/db/debtor.db')) {
            InsertDB();


        } else {

            CreateDB();
        }

    });