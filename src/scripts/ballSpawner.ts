import { Behaviour, serializable, AssetReference, InstantiateOptions, FrameEvent } from "@needle-tools/engine";
import { Object3D } from "three";

export class ballSpawner extends Behaviour {

    @serializable(AssetReference)
    myPrefab?: AssetReference;

    @serializable(Object3D)
    leftSpawnPoint?: Object3D;

    @serializable(Object3D)
    rightSpawnPoint?: Object3D;

    @serializable()
    numToPool: number = 100;

    pool: Object3D[] = [];

    activeObjects: Object3D[] = [];

    timer: number = 0;

    lastSpawnWasLeft: boolean = true;

    currentCoroutine: any;

    async start() {
        const options = new InstantiateOptions();
        options.visible = false;

        // pool the objects
        for (let i = 0; i < this.numToPool; i++) {
            const myInstance = await this.myPrefab?.instantiate(options);
            if (myInstance) {
                //myInstance.position.copy(this.spawnPoint?.position || new Object3D().position);
                this.pool.push(myInstance);
            }
        }

        //this.startCoroutine(this.spawnBalls(100), FrameEvent.Update);
    }

    // public update(): void {}

    public startSpawning(amount: number): void {
        console.log("start spawning");
       this.currentCoroutine = this.startCoroutine(this.spawnBalls(amount), FrameEvent.Update);
    }

    public startClearing(): void {
        console.log("start clearing");
        this.freeAllObjects();
    }


    freeAllObjects() {
        this.stopCoroutine(this.currentCoroutine);
        let objGroup = [...this.activeObjects];
        this.activeObjects.length = 0; // Clear the activeObjects array
        for (let obj of objGroup) {
            this.freeObject(obj);
        }
    }
    
    


    *spawnBalls(amount : number){
        console.log("spawn balls");
        if(this.pool.length == 0) return;
        console.log("pool length: " + this.pool.length);
        while(amount > 0){
            if (this.pool.length > 0 && this.leftSpawnPoint && this.rightSpawnPoint && this.timer > .75) {

                const newBall = this.getObject();
                
                if(newBall) {
                    if(this.lastSpawnWasLeft) 
                        newBall.position.copy(this.rightSpawnPoint.position);
                    else
                        newBall.position.copy(this.leftSpawnPoint.position);
            
                    newBall.visible = true;
                    
                    this.lastSpawnWasLeft = !this.lastSpawnWasLeft;
                    
                    amount--;
                    this.timer = 0;
                }
            }
    
            this.timer += this.context.time.deltaTime;
            yield;
        }
    }


    getObject(): Object3D | null {
        const obj = this.pool.pop();
        if (obj) {
            this.activeObjects.push(obj);
            return obj;
        } 
        else {
            console.error("No objects available in the pool.");
            return null;
        }
    }
    
    // Method to return an object to the pool
    freeObject(obj: Object3D): void {
        obj.visible = false;
        this.pool.push(obj);
    }



    public test(){
        console.log("testttttt");
    }
    
}
