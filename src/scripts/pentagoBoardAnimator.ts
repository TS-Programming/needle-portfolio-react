import {Behaviour, serializable} from "@needle-tools/engine";
import { Object3D, Vector3} from "three";
import Item from "./item";


export class PentagoBoardAnimator extends Item {
    @serializable(Object3D)
    quadrant: Object3D [] | null = null;
    @serializable(Object3D)
    board: Object3D | null = null;

    private currentQuadrant: number = 0;
    private speed: number = 2;
    private isQuadrantRaised: boolean = false;
    private isQuadrantRotated: boolean = false;
    private isQuadrantDone: boolean = false;
    private lerpStartPosition: Vector3 = new Vector3(0,0,0);
    private lerpEndPosition: Vector3 = new Vector3(0,0,0);
    private lerpHeight: number = 1;
    private lastRotation: number = 0;


    start() {
        this.lerpStartPosition.y = this.quadrant![this.currentQuadrant].position.y;
        this.lerpEndPosition.y = this.quadrant![this.currentQuadrant].position.y + this.lerpHeight;
    }
    
    update() {
        this.board!.rotation.y +=  this.context.time.deltaTime;

        if (this.isQuadrantDone) {
            this.isQuadrantDone = false;
            
            this.currentQuadrant = this.currentQuadrant < 3  
                ? this.currentQuadrant + 1  
                : this.currentQuadrant = 0;
            if (this.currentQuadrant === 0) {
                this.lastRotation += Math.PI / 2; 
            }
        }
        if (!this.isQuadrantRaised) {
            this.raiseQuadrant();
        }

        else if (!this.isQuadrantRotated) {
            this.rotateQuadrant();
        }
        else this.lowerQuadrant();
    }
    

    raiseQuadrant() {
        if(this.quadrant![this.currentQuadrant].position.y < this.lerpEndPosition.y) {
            this.quadrant![this.currentQuadrant].position.y += this.speed * this.context.time.deltaTime;
        }
        else {
            this.quadrant![this.currentQuadrant].position.y = this.lerpEndPosition.y
            this.isQuadrantRaised = true;
        }
    }

    lowerQuadrant() {
        if(this.quadrant![this.currentQuadrant].position.y > this.lerpStartPosition.y) {
            this.quadrant![this.currentQuadrant].position.y -= this.speed * this.context.time.deltaTime;
        }
        else {
            this.quadrant![this.currentQuadrant].position.y = this.lerpStartPosition.y
            this.isQuadrantDone = true;
            this.isQuadrantRaised = false;
            this.isQuadrantRotated = false;
        }
    }

    rotateQuadrant() {
        // Define the target rotation angle (in radians) - 90 degrees
        const targetRotation = Math.PI / 2; // 90 degrees in radians
        
        // Get the current rotation of the quadrant
        let currentRotation = this.quadrant![this.currentQuadrant].rotation.y;
    
        // Define a rotation speed (adjust this value as needed)
        const rotationSpeed = 3; // example speed value
    
        // Check if the current rotation is less than the target rotation
        if (currentRotation < this.lastRotation + targetRotation) {
            // Increment the rotation
            this.quadrant![this.currentQuadrant].rotation.y += rotationSpeed * this.context.time.deltaTime;
    
            // Clamp the rotation to not exceed the target rotation
            if (this.quadrant![this.currentQuadrant].rotation.y > this.lastRotation + targetRotation) {
                this.quadrant![this.currentQuadrant].rotation.y = this.lastRotation + targetRotation;
            }
        } else {
            // Rotation completed
            this.quadrant![this.currentQuadrant].rotation.y = this.lastRotation + targetRotation
            this.isQuadrantRotated = true;
        }
    }
}
 
