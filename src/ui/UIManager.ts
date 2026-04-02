type MenuAction = 'start' | 'settings' | 'credits' | 'resume' | 'quit' | 'back' | 'settings-pause';
type MenuCallback = () => void;

export class UIManager {
    private mainMenu: HTMLElement;
    private settingsMenu: HTMLElement;
    private pauseMenu: HTMLElement;
    private hud: HTMLElement;
    private scoreElement: HTMLElement;
    private healthFill: HTMLElement;
    private healthText: HTMLElement;
    private callbacks: Map<MenuAction, MenuCallback>;

    constructor() {
        this.mainMenu = document.getElementById('main-menu')!;
        this.settingsMenu = document.getElementById('settings-menu')!;
        this.pauseMenu = document.getElementById('pause-menu')!;
        this.hud = document.getElementById('hud')!;
        this.scoreElement = document.getElementById('score')!;
        this.healthFill = document.getElementById('health-fill')!;
        this.healthText = document.getElementById('health-text')!;
        this.callbacks = new Map();
        
        this.setupMenuListeners();
        this.setupSettingsListeners();
    }

    private setupMenuListeners(): void {
        const buttons = document.querySelectorAll('.menu-btn[data-action]');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action') as MenuAction;
                const callback = this.callbacks.get(action);
                if (callback) callback();
            });
        });
    }

    private setupSettingsListeners(): void {
        const volumeSlider = document.getElementById('volume') as HTMLInputElement;
        const sensitivitySlider = document.getElementById('sensitivity') as HTMLInputElement;
        const volumeDisplay = volumeSlider?.nextElementSibling as HTMLElement;
        const sensitivityDisplay = sensitivitySlider?.nextElementSibling as HTMLElement;

        if (volumeSlider && volumeDisplay) {
            volumeSlider.addEventListener('input', () => {
                volumeDisplay.textContent = `${volumeSlider.value}%`;
            });
        }

        if (sensitivitySlider && sensitivityDisplay) {
            sensitivitySlider.addEventListener('input', () => {
                sensitivityDisplay.textContent = sensitivitySlider.value;
            });
        }
    }

    public on(action: MenuAction, callback: MenuCallback): void {
        this.callbacks.set(action, callback);
    }

    public showMainMenu(): void {
        this.hideAllMenus();
        this.mainMenu.classList.add('active');
    }

    public showSettings(): void {
        this.hideAllMenus();
        this.settingsMenu.classList.add('active');
    }

    public showPauseMenu(): void {
        this.hud.classList.remove('active');
        this.pauseMenu.classList.add('active');
    }

    public hideMenus(): void {
        this.hideAllMenus();
    }

    public showHUD(): void {
        this.hud.classList.add('active');
    }

    private hideAllMenus(): void {
        this.mainMenu.classList.remove('active');
        this.settingsMenu.classList.remove('active');
        this.pauseMenu.classList.remove('active');
        this.hud.classList.remove('active');
    }

    public updateScore(score: number): void {
        this.scoreElement.textContent = score.toString();
    }

    public updateHealth(health: number): void {
        const percentage = Math.max(0, Math.min(100, health));
        this.healthFill.style.width = `${percentage}%`;
        this.healthText.textContent = `${Math.round(percentage)}%`;
        
        // Update color based on health
        if (percentage > 60) {
            this.healthText.style.color = 'var(--color-success)';
        } else if (percentage > 30) {
            this.healthText.style.color = 'var(--color-warning)';
        } else {
            this.healthText.style.color = 'var(--color-danger)';
        }
    }
}
