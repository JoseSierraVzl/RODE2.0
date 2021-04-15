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

var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-nav");
    container.classList.toggle("active-cont");
});
