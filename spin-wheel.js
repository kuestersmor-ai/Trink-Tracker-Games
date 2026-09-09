class SpinWheelWidget extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .summary {
                    align-self: start;
                    padding: 18px;
                    background-color: white;
                    border: 1px solid #b2dfdb;
                    border-radius: 8px;
                    text-align: center;
                }
                h3 {
                    margin: 0 0 16px;
                    color: #e65100;
                    font: bold 1.05rem 'Segoe UI', Tahoma, sans-serif;
                }
                .wheel {
                    position: relative;
                    width: min(100%, 220px);
                    aspect-ratio: 1;
                    margin: 0 auto 14px;
                    border: 8px solid #b2dfdb;
                    border-radius: 50%;
                    background: conic-gradient(#ff6b6b 0deg 45deg, #ffd166 45deg 90deg, #06d6a0 90deg 135deg, #4dabf7 135deg 180deg, #c77dff 180deg 225deg, #ff9f1c 225deg 270deg, #2ec4b6 270deg 315deg, #f15bb5 315deg 360deg);
                    box-shadow: 0 4px 12px rgba(0, 131, 143, 0.25);
                    transition: transform 800ms cubic-bezier(0.17, 0.67, 0.2, 1.02);
                }
                .wheel::before {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 34px;
                    height: 34px;
                    border: 4px solid white;
                    border-radius: 50%;
                    background: #00838f;
                    content: '';
                    transform: translate(-50%, -50%);
                }
                .pointer {
                    position: absolute;
                    top: -18px;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-right: 10px solid transparent;
                    border-bottom: 22px solid #d84315;
                    border-left: 10px solid transparent;
                    transform: translateX(-50%);
                }
                .result {
                    min-height: 1.4em;
                    margin: 0;
                    color: #e65100;
                    font: bold 1rem 'Segoe UI', Tahoma, sans-serif;
                }
            </style>
            <aside class="summary" aria-label="Euro-Spin-Wheel">
                <div class="wheel" aria-hidden="true">
                    <span class="pointer"></span>
                </div>
                <p class="result">Noch nicht gedreht</p>
            </aside>
        `;

        this.wheel = this.shadowRoot.querySelector('.wheel');
        this.result = this.shadowRoot.querySelector('.result');
        this.rotation = 0;
    }

    spin(maximum) {
        this.rotation += 1440 + Math.floor(Math.random() * 360);
        this.wheel.style.transform = `rotate(${this.rotation}deg)`;
        this.result.textContent = 'Spin Baby Spin!';

        return new Promise((resolve) => {
            window.setTimeout(() => {
                const amount = Math.floor(Math.random() * maximum) + 1;
                this.result.textContent = new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(amount);
                resolve(amount);
            }, 800);
        });
    }
}

customElements.define('spin-wheel-widget', SpinWheelWidget);
