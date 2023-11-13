'use strict'

function trocarImagem() {
    console.log('trocar imagem');
    var image = document.getElementById("myImage");
    var image2 = document.getElementById("terra2");

    if (image.classList.contains("hidden")) {
        image.classList.remove("hidden");
        image2.classList.contains("hidden");
        image2.classList.remove("hidden");
    } else {
        image.classList.add("hidden");
        image2.classList.add("hidden");
    }
}

const setaLista = document.getElementById("seta-lista");
const listaTurma = document.getElementById("lista-turma");
const menuSize = '250px';

let open = false;

document.querySelector('#menu').style.marginLeft = `-${menuSize}`;

setInterval(5000,trocarImagem);

document.querySelector('#btnMenu').addEventListener('click', e => {
    open = !open;
    toggleMenu();
});

function toggleMenu() {
    console.log('ENTREI')
    if (open) {
        document.querySelector('#menu').style.marginLeft = 0;
        return;
    }
    document.querySelector('#menu').style.marginLeft = `-${menuSize}`;
}

window.addEventListener("DOMContentLoaded", (event) => { 
    if (setaLista) {
        setaLista.addEventListener("click", () => {
            if (listaTurma.classList.contains("hidden")) {
                listaTurma.classList.remove("hidden");
                setaLista.src = "../IMG/arrow-up-removebg-preview.png";
            } else {
                listaTurma.classList.add("hidden");
                setaLista.src = "../IMG/arrow-down-removebg-preview.png";
            }
        });
    }
});
