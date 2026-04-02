export class Game {
    public width: number;
    public height: number;
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    public resize(): void {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    public get center(): { x: number; y: number } {
        return {
            x: this.width / 2,
            y: this.height / 2
        };
    }
}
