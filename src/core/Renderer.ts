import { Game } from './Game.js';

export class Renderer {
    private game: Game;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.game = new Game();
        this.ctx = this.game.ctx;
    }

    public clear(): void {
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.game.width, this.game.height);
        
        // Draw grid pattern
        this.drawGrid();
    }

    private drawGrid(): void {
        const gridSize = 50;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 1;

        for (let x = 0; x < this.game.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.game.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.game.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.game.width, y);
            this.ctx.stroke();
        }
    }

    public drawCircle(
        x: number,
        y: number,
        radius: number,
        color: string,
        glow: boolean = false
    ): void {
        this.ctx.save();
        
        if (glow) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 20;
        }
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    public drawPlayer(
        x: number,
        y: number,
        radius: number,
        color: string,
        angle: number
    ): void {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        // Glow effect
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 30;
        
        // Main body
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Direction indicator
        this.ctx.shadowBlur = 0;
        this.ctx.beginPath();
        this.ctx.moveTo(radius - 5, 0);
        this.ctx.lineTo(radius + 15, 0);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    public drawLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: string,
        width: number = 1
    ): void {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
        this.ctx.restore();
    }

    public drawText(
        text: string,
        x: number,
        y: number,
        fontSize: number,
        color: string,
        align: CanvasTextAlign = 'center'
    ): void {
        this.ctx.save();
        this.ctx.font = `700 ${fontSize}px "Plus Jakarta Sans"`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }
}
