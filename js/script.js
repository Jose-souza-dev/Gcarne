// Garantir que o script só rode quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script principal inicializado");
    document.title = "Gcarnê";

    // 1. Elementos Fixos
    const cabecalho = document.querySelector(".cabecalho");
    const menuCarne = document.querySelector(".menu-carne");
    const btnImprimir = document.querySelector("#btn-fechar");

    if (btnImprimir) {
        btnImprimir.addEventListener("click", () => {
            if (cabecalho) cabecalho.classList.add("displayNone");
            if (menuCarne) menuCarne.classList.add("displayNone");
            window.print();
            setTimeout(() => {
                if (cabecalho) cabecalho.classList.remove("displayNone");
                if (menuCarne) menuCarne.classList.remove("displayNone");
            }, 1000);
        });
    }

    // 2. Funções de Toggle (Mostrar/Esconder campos)
    const mapeamento = [
        { btn: "#btn-nome", labels: ["nome", "nome2"] },
        { btn: "#btn-valor", labels: ["valor", "valor2"] },
        { btn: "#btn-dt_venc", labels: ["dtvenc", "dtvenc2"] },
        { btn: "#btn-dt_pag", labels: ["dtpag", "dtpag2"] },
        { btn: "#btn-aten", labels: ["atendente", "atendente2"] }
    ];

    mapeamento.forEach(item => {
        const botao = document.querySelector(item.btn);
        if (botao) {
            botao.addEventListener("click", () => {
                item.labels.forEach(labelFor => {
                    const todosOsLabels = document.querySelectorAll(`label[for='${labelFor}']`);
                    todosOsLabels.forEach(el => {
                        el.classList.toggle("displayNone");
                    });
                });
            });
        }
    });

    // 3. Lógica do QR Code
    const btnQrcode = document.querySelector("#btn-qrcode");
    const containerQr = document.querySelector("#container_qrcode");
    const inputFile = document.querySelector("#picture__input");

    if (btnQrcode) {
        btnQrcode.addEventListener("click", () => {
            if (containerQr) containerQr.classList.toggle("displayNone");
        });
    }

    if (inputFile) {
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

    // 4. Função Triplicar Folha
    const btnTriplicar = document.getElementById('btn-triplicar');
    if (btnTriplicar) {
        btnTriplicar.addEventListener('click', () => {
            const containerPai = document.querySelector('.folha');
            const folinhaOriginal = document.querySelector('.folinha');
            const elDtvenc = document.getElementById('dtvenc');

            if (!elDtvenc || !elDtvenc.value) {
                alert("Por favor, preencha a data de vencimento na primeira folha.");
                return;
            }

            const dataOriginal = elDtvenc.value;

            for (let i = 1; i <= 3; i++) {
                if (!folinhaOriginal || !containerPai) break;

                const copia = folinhaOriginal.cloneNode(true);

                // Limpar IDs das cópias para evitar duplicidade (embora usemos querySelectorAll)
                // Mas manter o "for" nos labels é essencial para os botões funcionarem

                const inputsOriginais = folinhaOriginal.querySelectorAll('input');
                const inputsCopia = copia.querySelectorAll('input');

                inputsOriginais.forEach((input, index) => {
                    if (input.type !== 'file') {
                        inputsCopia[index].value = input.value;
                    }
                });

                const previewOriginal = folinhaOriginal.querySelector(".picture__image").innerHTML;
                copia.querySelector(".picture__image").innerHTML = previewOriginal;

                let novaData = new Date(dataOriginal + "T00:00:00");
                novaData.setMonth(novaData.getMonth() + i);
                const dataFormatada = novaData.toISOString().split('T')[0];

                const inputsDataCopia = copia.querySelectorAll('input[type="date"]');
                inputsDataCopia.forEach(input => input.value = dataFormatada);

                containerPai.appendChild(copia);
            }
        });
    }
});

// 5. Espelhamento (Fora do DOMContentLoaded para usar delegação global)
document.addEventListener('input', (e) => {
    const mapeamentoEspelho = {
        'nome': 'nome2',
        'valor': 'valor2',
        'dtvenc': 'dtvenc2',
        'dtpag': 'dtpag2',
        'atendente': 'atendente2'
    };

    const idOrigem = e.target.id;
    const idDestino = mapeamentoEspelho[idOrigem];

    if (idDestino) {
        const folinha = e.target.closest('.folinha');
        if (folinha) {
            // Procure o destino DENTRO da mesma folha
            const campoDestino = folinha.querySelector(`input[id^='${idDestino.substring(0, idDestino.length - 1)}']`) || folinha.querySelector(`#${idDestino}`);
            // Simplificando a busca do destino:
            const inputs = folinha.querySelectorAll('input');
            let destino;
            if (idOrigem === 'nome') destino = folinha.querySelector('#nome2');
            if (idOrigem === 'valor') destino = folinha.querySelector('#valor2');
            if (idOrigem === 'dtvenc') destino = folinha.querySelector('#dtvenc2');
            if (idOrigem === 'dtpag') destino = folinha.querySelector('#dtpag2');
            if (idOrigem === 'atendente') destino = folinha.querySelector('#atendente2');

            if (destino) {
                destino.value = e.target.value;
            }
        }
    }
});
