let respuesta1 = false;
let respuesta2 = false;


class Jorge {
    constructor() {
        this.addStyles();
    }

        alert(contenido) {
            const overlay = document.createElement("div");
            overlay.className = "dialogOverlay";
            overlay.innerHTML = `<div class="alertBox" role="alertdialog" aria-modal="true" tabindex="-1">
                <h2 class="dialogTitle"></h2>
                <div class="dialogActions">
                    <button class="primaryS" type="button">Aceptar</button>
                </div>
            </div>`;
            document.body.appendChild(overlay);

            overlay.querySelector(".dialogTitle").textContent = contenido;
            const close = () => overlay.remove();
            overlay.querySelector("button").addEventListener("click", close);
            overlay.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === "Escape") close();
            });
            overlay.tabIndex = -1;
            overlay.focus();
        }

        prompt(contenido, value = '') {
            const overlay = document.createElement("div");
            overlay.className = "dialogOverlay";
            overlay.innerHTML = `<div class="promptBox" role="dialog" aria-modal="true" tabindex="-1">
                <h2 class="dialogTitle"></h2>
                <input type="text">
                <div class="dialogActions">
                    <button id="secondary" class="secondaryS" type="button">Cancelar</button>
                    <button id="primary" class="primaryS" type="button">Aceptar</button>
                </div>
            </div>`;
            document.body.appendChild(overlay);

            return new Promise((resolve) => {
                const input = overlay.querySelector("input");
                overlay.querySelector(".dialogTitle").textContent = contenido;
                input.value = value;
                const close = (result) => {
                    if (!document.body.contains(overlay)) return;
                    overlay.remove();
                    resolve(result);
                };
                overlay.querySelector("#secondary").addEventListener("click", () => close(null));
                overlay.querySelector("#primary").addEventListener("click", () => close(input.value));
                input.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") close(input.value);
                    if (event.key === "Escape") close(null);
                });
                input.focus();
            });
        }

        confirm(contenido = "¿Estás seguro?", value1 = 'Cancelar', value2 = 'Aceptar') {
            const overlay = document.createElement("div");
            overlay.className = "dialogOverlay";
            overlay.innerHTML = `<div class="confirmBox" role="dialog" aria-modal="true" tabindex="-1">
                <h2 class="dialogTitle"></h2>
                <div class="dialogActions">
                    <button id="secondaryC" class="secondaryS" type="button">${value2}</button>
                    <button id="primaryC" class="primaryS" type="button">${value1}</button>
                </div>
            </div>`;
            document.body.appendChild(overlay);

            return new Promise((resolve) => {
                overlay.querySelector(".dialogTitle").textContent = contenido;
                const close = (result) => {
                    if (!document.body.contains(overlay)) return;
                    overlay.remove();
                    resolve(result);
                };
                overlay.querySelector("#secondaryC").addEventListener("click", () => close(false));
                overlay.querySelector("#primaryC").addEventListener("click", () => close(true));
                overlay.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") close(true);
                });                
            });

        }

        addStyles() {
            const estilo = document.createElement('style');
            estilo.innerHTML = `
        
        .dialogOverlay {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: grid;
            place-items: center;
            padding: 20px;
            background: rgba(12, 20, 32, .48);
            backdrop-filter: blur(4px);
            animation: none;
        }

        .promptBox,
        .alertBox,
        .confirmBox {
            position: fixed;
            position: relative;
            width: min(100%, 390px);
            min-height: 185px;
            box-sizing: border-box;
            padding: 30px;
            background: #fff;
            border: 1px solid rgba(24, 34, 48, .12);
            border-radius: 18px;
            box-shadow: 0 24px 70px rgba(12, 20, 32, .28);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            animation: dialogIn .2s cubic-bezier(.2, .8, .2, 1);
        }

        .dialogTitle {
            margin: 0;
            font-size: 19px;
            line-height: 1.35;
            font-weight: 700;
        }

        .dialogMark {
            width: 38px;
            height: 5px;
            border-radius: 5px;
            background: #2f80ed;
        }

        .promptBox input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            border: 1px solid #cbd3df;
            border-radius: 10px;
            outline: none;
            font: inherit;
            color: inherit;
        }

        .promptBox input:focus {
            border-color: #2f80ed;
            box-shadow: 0 0 0 3px rgba(47, 128, 237, .16);
        }

        .dialogActions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 2px;
        }
        
        .dialogActions button {
            min-width: 100px;
            padding: 10px 16px;
            border: 0;
            border-radius: 9px;
            font: inherit;
            cursor: pointer;
        }

        .dialogActions .primaryS { background: #2f80ed; color: white; }
        .dialogActions .secondaryS { background: #edf1f6; color: #344054; }
        .dialogActions button:hover { filter: brightness(.96); }

        @keyframes dialogIn { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `;
            document.head.appendChild(estilo);
        }
}

window.Jorge = Jorge;

const styled = new Jorge();




