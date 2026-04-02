import { Renderer } from '../core/Renderer.js';
import { InputHandler } from '../core/InputHandler.js';

export class Player {
    public x: number;
    public y: number;
    public radius: number = 20;
    public speed: number = 300;
    public health: number = 100;
    public score: number = 0;
    public angle: number = 0;
    
    private velocityX: number = 0;
    private velocityY: number = 0;
    private friction: number = 0.92;
    private acceleration: number = 0.8;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public reset(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.health = 100;
        this.score = 0;
    }

    public update(
        deltaTime: number,
        input: InputHandler,
        canvasWidth: number,
        canvasHeight: number
    ): void {
        const movement = input.getMovementInput();
        
        // Apply acceleration
        this.velocityX += movement.x * this.acceleration;
        this.velocityY += movement.y * this.acceleration;
        
        // Apply friction
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
        
        // Update position
        this.x += this.velocityX * (deltaTime / 16);
        this.y += this.velocityY * (deltaTime / 16);
        
        // Boundary collision
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.velocityX = 0;
        }
        if (this.x + this.radius > canvasWidth) {
            this.x = canvasWidth - this.radius;
            this.velocityX = 0;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocityY = 0;
        }
        if (this.y + this.radius > canvasHeight) {
            this.y = canvasHeight - this.radius;
            this.velocityY = 0;
        }
        
        // Calculate angle towards mouse
        const mousePos = input.getMousePosition();
        this.angle = Math.atan2(mousePos.y - this.y, mousePos.x - this.x);
        
        // Handle shooting
        if (input.isMouseDown()) {
            this.shoot();
        }
    }

    private shoot(): void {
        // Shooting logic will be implemented later
        // For now, just a placeholder for the mechanic
    }

    public render(renderer: Renderer): void {
        renderer.drawPlayer(this.x, this.y, this.radius, '#6366f1', this.angle);
        
        // Draw velocity trail effect
        const trailLength = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (trailLength > 1) {
            const trailX = this.x - this.velocityX * 3;
            const trailY = this.y - this.velocityY * 3;
            renderer.drawCircle(trailX, trailY, this.radius * 0.7, 'rgba(99, 102, 241, 0.3)');
        }
    }

    public takeDamage(amount: number): void {
        this.health = Math.max(0, this.health - amount);
    }

    public addScore(points: number): void {
        this.score += points;
    }
}
