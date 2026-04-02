export interface InputState {
    keys: Set<string>;
    mouseX: number;
    mouseY: number;
    mouseDown: boolean;
}

export class InputHandler {
    public state: InputState;

    constructor() {
        this.state = {
            keys: new Set(),
            mouseX: 0,
            mouseY: 0,
            mouseDown: false
        };
    }

    public handleKeyDown(event: KeyboardEvent): void {
        this.state.keys.add(event.key.toLowerCase());
    }

    public handleKeyUp(event: KeyboardEvent): void {
        this.state.keys.delete(event.key.toLowerCase());
    }

    public handleMouseMove(event: MouseEvent): void {
        this.state.mouseX = event.clientX;
        this.state.mouseY = event.clientY;
    }

    public handleMouseDown(event: MouseEvent): void {
        this.state.mouseDown = true;
    }

    public handleMouseUp(): void {
        this.state.mouseDown = false;
    }

    public isKeyDown(key: string): boolean {
        return this.state.keys.has(key.toLowerCase());
    }

    public getMovementInput(): { x: number; y: number } {
        let x = 0;
        let y = 0;

        if (this.isKeyDown('w') || this.isKeyDown('arrowup')) y -= 1;
        if (this.isKeyDown('s') || this.isKeyDown('arrowdown')) y += 1;
        if (this.isKeyDown('a') || this.isKeyDown('arrowleft')) x -= 1;
        if (this.isKeyDown('d') || this.isKeyDown('arrowright')) x += 1;

        // Normalize diagonal movement
        const length = Math.sqrt(x * x + y * y);
        if (length > 0) {
            x /= length;
            y /= length;
        }

        return { x, y };
    }

    public getMousePosition(): { x: number; y: number } {
        return { x: this.state.mouseX, y: this.state.mouseY };
    }

    public isMouseDown(): boolean {
        return this.state.mouseDown;
    }
}
