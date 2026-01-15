// 1. Configurações Iniciais e Título
document.title = "Gcarnê";

// 2. Elementos Fixos
const cabecalho = document.querySelector(".cabecalho");
const menuCarne = document.querySelector(".menu-carne");
const btnImprimir = document.querySelector("#btn-fechar");

// Função para imprimir (esconde o menu antes)
btnImprimir.addEventListener("click", function () {
    cabecalho.classList.add("displayNone");
    menuCarne.classList.add("displayNone");
    window.print();
    // Remove a classe depois de imprimir para o menu voltar
    setTimeout(() => {
        cabecalho.classList.remove("displayNone");
        menuCarne.classList.remove("displayNone");
    }, 1000);
});

// 3. Funções de Toggle (Mostrar/Esconder campos)
// Corrigido os seletores que estavam sem o "]" final
function configurarToggles() {
    const mapeamento = [
        { btn: "#btn-nome", labels: ["nome", "nome2"] },
        { btn: "#btn-valor", labels: ["valor", "valor2"] },
        { btn: "#btn-dt_venc", labels: ["dtvenc", "dtvenc2"] },
        { btn: "#btn-dt_pag", labels: ["dtpag", "dtpag2"] },
        { btn: "#btn-aten", labels: ["atendente", "atendente2"] }
    ];

    mapeamento.forEach(item => {
        const botao = document.querySelector(item.btn);
        botao.addEventListener("click", () => {
            item.labels.forEach(labelFor => {
                const el = document.querySelector(`label[for='${labelFor}']`);
                if (el) el.classList.toggle("displayNone");
            });
        });
    });
}
configurarToggles();

// 4. Lógica do QR Code (Preview e Clonagem)
function configurarQrcode() {
    const btnQrcode = document.querySelector("#btn-qrcode");
    const containerQr = document.querySelector("#container_qrcode");
    const inputFile = document.querySelector("#picture__input");

    // Mostrar/Esconder container do QR Code
    btnQrcode.addEventListener("click", () => {
        containerQr.classList.toggle("displayNone");
    });

    // Carregar imagem e aplicar a todos os campos de preview existentes
    inputFile.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const previews = document.querySelectorAll(".picture__image");
                previews.forEach(p => {
                    p.innerHTML = `<img src="${event.target.result}" style="max-width:100%; display:block;">`;
                });
            };
            reader.readAsDataURL(file);
        }
    });
}
configurarQrcode();

// 5. Função Triplicar Folha (Ajustada para clonar tudo corretamente)
function triplicarFolha() {
    const btnTriplicar = document.getElementById('btn-triplicar');
    
    btnTriplicar.addEventListener('click', () => {
        const containerPai = document.querySelector('.folha');
        const folinhaOriginal = document.querySelector('.folinha');
        const dataOriginal = document.getElementById('dtvenc').value;

        if (!dataOriginal) {
            alert("Por favor, preencha a data de vencimento na primeira folha.");
            return;
        }

        // Criar 3 novas cópias
        for (let i = 1; i <= 3; i++) {
            const copia = folinhaOriginal.cloneNode(true);

            // 1. Sincronizar valores de todos os inputs (cloneNode não copia valores digitados)
            const inputsOriginais = folinhaOriginal.querySelectorAll('input');
            const inputsCopia = copia.querySelectorAll('input');
            
            inputsOriginais.forEach((input, index) => {
                if (input.type !== 'file') {
                    inputsCopia[index].value = input.value;
                }
            });

            // 2. Sincronizar o QR Code se ele já existir
            const previewOriginal = folinhaOriginal.querySelector(".picture__image").innerHTML;
            copia.querySelector(".picture__image").innerHTML = previewOriginal;

            // 3. Calcular nova data (+ i meses)
            let novaData = new Date(dataOriginal + "T00:00:00");
            novaData.setMonth(novaData.getMonth() + i);
            
            const dataFormatada = novaData.toISOString().split('T')[0];
            
            // Aplicar a nova data nos inputs de data da cópia
            const inputsDataCopia = copia.querySelectorAll('input[type="date"]');
            inputsDataCopia.forEach(input => input.value = dataFormatada);

            // Adicionar ao container principal
            containerPai.appendChild(copia);
        }
    });
}
triplicarFolha();

// 6. Espelhamento em Tempo Real (Empresa -> Cliente)
const camposEspelho = [
    { orig: 'nome', dest: 'nome2' },
    { orig: 'valor', dest: 'valor2' },
    { orig: 'dtvenc', dest: 'dtvenc2' },
    { orig: 'dtpag', dest: 'dtpag2' },
    { orig: 'atendente', dest: 'atendente2' }
];

camposEspelho.forEach(par => {
    const origem = document.getElementById(par.orig);
    const destino = document.getElementById(par.dest);
    origem.addEventListener('input', () => {
        destino.value = origem.value;
    });
});