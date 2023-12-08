import {Behaviour, Component, serializable, Rigidbody, Animator, Input, Physics, KeyCode , AssetReference, InstantiateOptions} from "@needle-tools/engine";
import { Object3D, Vector3, Quaternion } from "three";
import { Shovel } from "./shovel";

export class PlayerController extends Behaviour {

    @serializable(Animator)
    animator?: Animator;
    @serializable(Object3D)
    player?: Object3D;
    @serializable(Shovel)
    shovel?: Shovel;

    @serializable(AssetReference)
    myPrefab?: AssetReference [] | null = null;

    @serializable(Object3D)
    spawnPoint?: Object3D;

   
    private speed: number = 8;
    private turnSpeed: number = 30;
    private wantsToDig: boolean = false;
    private wantsToEnter: boolean = false;
    private lookingAtObject: boolean = false;

    private direction: Vector3 = new Vector3(0,0,0);

    private activeObject: Object3D = new Object3D();


    pool: Object3D[] = [];
    seenObjects: Object3D[] = [];

   async start() {
        // window.addEventListener('keydown', this.onKeyDown.bind(this));
        // window.addEventListener('keyup', this.onKeyUp.bind(this));

        const options = new InstantiateOptions();
        options.visible = false;

        //get random object from list
        let randomIndex = Math.floor(Math.random() * this.myPrefab!.length);
        let randomObject = this.myPrefab![randomIndex];

        // pool the objects
        for (let i = 0; i <this.myPrefab!.length; i++) {
            const myInstance = await randomObject?.instantiate(options);
            if (myInstance) {
                this.pool.push(myInstance);
            }
        }
    }

    private lerpStartPosition: Vector3 = new Vector3(0,0,0);
    private lerpEndPosition: Vector3 = new Vector3(0,0,0);
    lerpProgress: number = 0;
    lerpSpeed: number = 10; // Adjust this speed as necessary
    private newObject: Object3D = new Object3D();

    async digUpObject() {
        this.shovel?.triggerDig();
        this.lookingAtObject = true;
        //wait 2 seconds
        await new Promise(r => setTimeout(r, 2000));
        this.shovel?.endDig();
        this.newObject = this.getObject();
        if (this.newObject && this.spawnPoint && this.player) {
            // Calculate world position of the spawn point
            let worldPosition = this.spawnPoint.position.clone();
            this.spawnPoint.parent?.localToWorld(worldPosition);

            // Start position: 1 unit above the player's position
            this.lerpStartPosition = this.player.position.clone().add(new Vector3(0, 1, 0));

            // End position: Spawn point position
            this.lerpEndPosition = worldPosition;

            // Reset lerp progress
            this.lerpProgress = 0;

            // Set initial position and make the object visible
            this.newObject.position.copy(this.lerpStartPosition);
            this.newObject.visible = true;

        }
    }

    updateObjectPosition() {
        if (this.lerpProgress < 1 && this.newObject) {
            // Update lerp progress based on deltaTime and lerpDuration
            this.lerpProgress += this.context.time.deltaTime / 0.5;
            this.lerpProgress = Math.min(this.lerpProgress, 1); // Clamp to 1

            // Calculate new position
            let newPosition = this.lerpStartPosition.clone().lerp(this.lerpEndPosition, this.lerpProgress);

            // Update object's position
            this.newObject.position.copy(newPosition);
        }
    }


    releaseObject() {
        if (this.activeObject) {
            this.activeObject.visible = false;
            this.seenObjects.push(this.activeObject);
            this.lookingAtObject = false;
        }
    }

    getObject(): Object3D {
        const obj = this.pool.pop();
        if (obj) {
            this.activeObject = obj;
            return obj;
        } 
        else {
            console.log("Pool is empty, resetting pool");
            this.resetPool();
            return this.getObject();
        }
    }

    resetPool() {
        this.pool = this.pool.concat(this.seenObjects);
        this.seenObjects = [];
    }



    update() {
        this.handleInput();
        this.updateObjectPosition();

        if (this.direction.length() > 0) {
            this.direction.normalize();
        }
        
        if(this.lookingAtObject)
        {
            if(this.wantsToEnter){
                this.releaseObject();
                this.wantsToEnter = false;
            }
        }
        else if(this.wantsToDig){
            this.digUpObject();
        }

        else if (this.direction.length() > 0) {
            this.direction.normalize();
    
            // Map the input direction to one of the eight cardinal or diagonal directions
            let mappedDirection = this.mapToEightDirections(this.direction);
            let targetRotation: Quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), mappedDirection);
    
            // Slerp for smooth rotation towards the target direction
            this.gameObject.quaternion.slerp(targetRotation, this.turnSpeed * this.context.time.deltaTime).normalize();
    
            // Move the gameObject forward in the direction it's facing
            let moveAmount: Vector3 = new Vector3(0, 0, 1).applyQuaternion(this.gameObject.quaternion).multiplyScalar(this.speed * this.context.time.deltaTime);
            this.gameObject.position.add(moveAmount);
        }
    }

    mapToEightDirections(direction: Vector3): Vector3 {
        let angles = [
            new Vector3(0, 0, -1),  // North
            new Vector3(1, 0, -1),  // North-East
            new Vector3(1, 0, 0),   // East
            new Vector3(1, 0, 1),   // South-East
            new Vector3(0, 0, 1),   // South
            new Vector3(-1, 0, 1),  // South-West
            new Vector3(-1, 0, 0),  // West
            new Vector3(-1, 0, -1)  // North-West
        ];
    
        // Normalize the directions
        angles = angles.map(angle => angle.normalize());
    
        // Determine the angle closest to the input direction
        let closestAngle = angles[0];
        let maxDot = -Infinity;
    
        angles.forEach(angle => {
            let dot = angle.dot(direction);
            if (dot > maxDot) {
                maxDot = dot;
                closestAngle = angle;
            }
        });
    
        return closestAngle;
    }

    handleInput() {
        if (this.context.input.isKeyPressed("KeyW") || this.context.input.isKeyPressed("ArrowUp")) {
            this.direction.z = -1;
        } else if (this.context.input.isKeyPressed("KeyS") || this.context.input.isKeyPressed("ArrowDown")) {
            this.direction.z = 1;
        } else {
            this.direction.z = 0;
        }
    
        if (this.context.input.isKeyPressed("KeyA") || this.context.input.isKeyPressed("ArrowLeft")) {
            this.direction.x = -1;
        } else if (this.context.input.isKeyPressed("KeyD") || this.context.input.isKeyPressed("ArrowRight")) {
            this.direction.x = 1;
        } else {
            this.direction.x = 0;
        }
    
        if (this.context.input.isKeyDown("KeyE")) {
            this.wantsToDig = true;
        } else {
            this.wantsToDig = false;
        }
    
        if (this.context.input.isKeyDown("KeyR")) {
            this.wantsToEnter = true;
        } else {
            this.wantsToEnter = false;
        }
    }
    
    




    lateUpdate(){
        this.wantsToDig = false;
    }
}
 
