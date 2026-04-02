import { Game } from './core/Game.js';
import { InputHandler } from './core/InputHandler.js';
import { Renderer } from './core/Renderer.js';
import { Player } from './entities/Player.js';
import { UIManager } from './ui/UIManager.js';

class App {
    private game: Game;
    private inputHandler: InputHandler;
    private renderer: Renderer;
    private uiManager: UIManager;
    private player: Player;
    private lastTime: number = 0;
    private isRunning: boolean = false;

    constructor() {
        this.inputHandler = new InputHandler();
        this.renderer = new Renderer();
        this.uiManager = new UIManager();
        this.player = new Player(400, 300);
        this.game = new Game();
        
        this.init();
    }

    private init(): void {
        this.game.resize();
        this.setupEventListeners();
        this.uiManager.on('start', () => this.startGame());
        this.uiManager.on('settings', () => this.uiManager.showSettings());
        this.uiManager.on('credits', () => console.log('Credits'));
        this.uiManager.on('resume', () => this.resumeGame());
        this.uiManager.on('quit', () => this.quitToMenu());
        this.uiManager.on('back', () => this.uiManager.showMainMenu());
        
        window.addEventListener('resize', () => this.game.resize());
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => {
            this.inputHandler.handleKeyDown(e);
            
            if (e.key === 'Escape' && this.isRunning) {
                this.pauseGame();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.inputHandler.handleKeyUp(e);
        });
        
        document.addEventListener('mousemove', (e) => {
            this.inputHandler.handleMouseMove(e);
        });
        
        document.addEventListener('mousedown', (e) => {
            this.inputHandler.handleMouseDown(e);
        });
    }

    private startGame(): void {
        this.isRunning = true;
        this.uiManager.hideMenus();
        this.uiManager.showHUD();
        this.player.reset(400, 300);
    }

    private pauseGame(): void {
        this.isRunning = false;
        this.uiManager.showPauseMenu();
    }

    private resumeGame(): void {
        this.isRunning = true;
        this.uiManager.hideMenus();
        this.uiManager.showHUD();
    }

    private quitToMenu(): void {
        this.isRunning = false;
        this.uiManager.showMainMenu();
    }

    private gameLoop(currentTime: number): void {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    private update(deltaTime: number): void {
        if (!this.isRunning) return;
        
        this.player.update(deltaTime, this.inputHandler, this.game.width, this.game.height);
        this.uiManager.updateScore(this.player.score);
        this.uiManager.updateHealth(this.player.health);
    }

    private render(): void {
        this.renderer.clear();
        
        if (this.isRunning) {
            this.player.render(this.renderer);
        }
    }
}

// Initialize the application
new App();
