// Mudando o titulo do site para Gcarne

var titulo = document.querySelector("title");
titulo.innerText = "Gcarnê";

// -------------------------------------------------------

var cabecalho = window.document.querySelector(".cabecalho");
var fechar = document.querySelector("#btn-fechar");
var menuCarne = document.querySelector(".menu-carne")

fechar.addEventListener("click", function () {
        cabecalho.classList.toggle("displayNone");
        menuCarne.classList.toggle("displayNone");
});

//  vamos pegar os botões das opções e quando eles forem clicados apareçam os inputs na folha 
// do carnê

function clickNome() {
        // vamos pegar primeiro os  btns
        let btnNome = document.querySelector("#btn-nome");

        btnNome.addEventListener("click", function () {
                let labelNome = document.querySelector("label[for='nome']"); // pegando a label pelo for
                let labelNome2 = document.querySelector("label[for='nome2']");

                // aplicando a classe displayNone
                labelNome.classList.toggle("displayNone"); // quando for clicado, o toggle mostra ou esconde
                labelNome2.classList.toggle("displayNone");
        });
}
clickNome();

function clickValor() {
        // vamos pegar primeiro os  btns

        let btnValor = document.querySelector("#btn-valor");

        btnValor.addEventListener("click", function () {
                let labelValor = document.querySelector("label[for='valor']");
                let labelValor2 = document.querySelector("label[for='valor2'");

                // aplicando a classe displayNone

                labelValor.classList.toggle("displayNone"); // quando for clicado, o toggle mostra ou esconde
                labelValor2.classList.toggle("displayNone");
        });
}
clickValor();

function clickDtVenc() {
        // vamos pegar primeiro os  btns
        let btnDtVenc = document.querySelector("#btn-dt_venc");

        btnDtVenc.addEventListener("click", function () {
                let labelDtVenc = document.querySelector("label[for='dtvenc']");
                let labelDtVenc2 = document.querySelector("label[for='dtvenc2'");

                // aplicando a classe displayNone

                labelDtVenc.classList.toggle("displayNone"); // quando for clicado, o toggle mostra ou esconde
                labelDtVenc2.classList.toggle("displayNone");
        });
}
clickDtVenc();

function clickDtPag() {
        // vamos pegar primeiro os  btns
        let btnDtPag = document.querySelector("#btn-dt_pag");

        btnDtPag.addEventListener("click", function () {
                let labelDtPag = document.querySelector("label[for='dtpag']");
                let labelDtpag2 = document.querySelector("label[for='dtpag2'");

                // aplicando a classe displayNone

                labelDtPag.classList.toggle("displayNone"); // quando for clicado, o toggle mostra ou esconde
                labelDtpag2.classList.toggle("displayNone");
        });
}
clickDtPag();


function clickDtAten() {
        // vamos pegar primeiro os  btns
        let btnAten = document.querySelector("#btn-aten");

        btnAten.addEventListener("click", function () {
                let labelAten = document.querySelector("label[for='atendente']");
                let labelAten2 = document.querySelector("label[for='atendente2'");

                // aplicando a classe displayNone

                labelAten.classList.toggle("displayNone"); // quando for clicado, o toggle mostra ou esconde
                labelAten2.classList.toggle("displayNone");
        });
}
clickDtAten();

function clickQrcode() {
        // vamos pegar o botão de qrcode
        let btnQrcode = document.querySelector("#btn-qrcode");
        let divContainer_qrcode = document.querySelector("#container_qrcode");

        // aplicando classe displayNone nas labels

        btnQrcode.addEventListener("click", () => {
                divContainer_qrcode.classList.toggle("displayNone");
        });

}

clickQrcode();




// Seleciona os pares de campos (origem -> destino)
const campos = [
        { origem: 'nome', destino: 'nome2' },
        { origem: 'valor', destino: 'valor2' },
        { origem: 'dtvenc', destino: 'dtvenc2' },
        { origem: 'dtpag', destino: 'dtpag2' },
        { origem: 'atendente', destino: 'atendente2' }
];

// Adiciona um evento de escuta para cada campo
campos.forEach(par => {
        const inputOrigem = document.getElementById(par.origem);
        const inputDestino = document.getElementById(par.destino);

        inputOrigem.addEventListener('input', () => {
                inputDestino.value = inputOrigem.value;
        });
});
// 2. Lógica específica para o campo de Valor (Moeda R$)
const inputValor = document.getElementById('valor');
const inputValorDestino = document.getElementById('valor2');


// Botão de Imprimir
document.getElementById('btn-fechar').addEventListener('click', () => {
        window.print();
});
