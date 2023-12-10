import {Behaviour, serializable, Animator, AssetReference, InstantiateOptions, Camera, GameObject} from "@needle-tools/engine";
import { Euler, Object3D, Quaternion, Vector3 } from "three";
import Item from "./item";
import { degToRad, lerp } from "three/src/math/MathUtils";

export class Chest extends Behaviour {
    @serializable(Object3D)
    camera?: Object3D;
    @serializable(Animator)
    animator?: Animator;
    @serializable(AssetReference)
    item?: AssetReference [] | null = null;

    private pool: Object3D[] = [];

    @serializable(Object3D)
    restingPoint: Object3D[] | null = null;;

    @serializable(Object3D)
    pullPoint?: Object3D;
    @serializable(Object3D)
    raisePoint?: Object3D;
    @serializable(Object3D)
    displayPoint?: Object3D;
    @serializable(Object3D)
    chestPoint?: Object3D;
    
    private wantsToOpen: boolean = false;
    private chestIsOpen: boolean = false;
    private wantsToClose: boolean = false;
    private pulledItem: Object3D | null = null;
   
    lastObjectRotation: Quaternion = new Quaternion();
    lastObjectScale: Vector3 = new Vector3();
    private currentObjectIndex: number = 0;

    async start() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));

        const options = new InstantiateOptions();
        //options.visible = true;

        // pool the objects
        for (let i = 0; i <this.item!.length; i++) {
            let toSpawn = this.item![i];
            const myInstance = await toSpawn?.instantiate(options);
            if (myInstance) {
                myInstance.visible = false;
                this.pool.push(myInstance);
                //console.log(myInstance)
            }
        }
        //this.animator?.play("Close_Lid");
        await this.delay(1000); // Delays for 2000 milliseconds (2 seconds)
        this.isDroppingChest = true;
    }



    delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    dropChest() {
        this.raiseLerpAlpha += this.context.time.deltaTime *2;

        let startPosition = this.chestPoint?.position.clone();
        startPosition!.y += 10;

        // clamp raiseLerpAlpha to 1
        if(this.raiseLerpAlpha > 1){
            this.raiseLerpAlpha = 1;
        }

        // Calculate new position
        let newPosition = startPosition!.lerp(this.chestPoint!.position, this.raiseLerpAlpha);
        //Update object's position
        this.gameObject.position.copy(newPosition!);

        if(this.raiseLerpAlpha >= 1){
            this.isDroppingChest = false;
            this.raiseLerpAlpha = 0.0;
        }
    }



    getObject(): Object3D | null {
        const obj = this.pool.pop();
        if (obj) {
            return obj;
        } 
        else {
            console.error("No more objects in pool");
            return null
        }
    }

    update()   {
        if(this.currentObjectIndex >= this.restingPoint!.length) return;
        if(this.isDroppingChest){
            this.dropChest();
        }
        else if (this.wantsToOpen && this.isDisplayingItem) {
            this.releaseItem();
        }
        else if (this.wantsToOpen && !this.chestIsOpen) {
             //this.chestIsOpen = true;
         //rthis.animator?.play("Fantasy_Polygon_Chest_Animation");
            this.pullItem();
        }
    }



    private lerpAlpha: number = 0.0;
    private raiseLerpAlpha: number = 0.0;
    private animationTime: number = 0.0;
    private  isInRaisedState: boolean = false
    private  isDroppingChest: boolean = false
    private  isDisplayingItem: boolean = false
    private itemData: Item | null = null;

    pullItem() {
        if(this.pulledItem === null) {
            this.pulledItem = this.getObject();   
            console.log("pulled Item: ", this.pulledItem?.name);
            this.itemData = GameObject.getComponent(this.pulledItem, Item);
            console.log(this.pulledItem);
            this.pulledItem?.position.copy(this.pullPoint!.position); 
            this.pulledItem!.visible = false;
            this.lastObjectRotation = this.pulledItem!.quaternion.clone();
            this.lastObjectScale = this.pulledItem!.scale.clone();
            this.animator?.play("Fantasy_Polygon_Chest_Animation");
        }
        // else if(this.animationTime < 2) {
        //     this.animationTime += this.context.time.deltaTime;
        //     return;
        // }
        if(!this.isInRaisedState){
            this.pulledItem!.visible = true;
            this.raiseLerpAlpha += this.context.time.deltaTime * 0.3;

            
            // Calculate new position
            let newPosition = this.pullPoint?.position.clone().lerp(this.raisePoint!.position, this.raiseLerpAlpha);
            //Update object's position
            this.pulledItem!.position.copy(newPosition!);

            if(this.raiseLerpAlpha >= 1){
                this.isInRaisedState = true;
            }
        }
        else if (this.lerpAlpha < 1){ //lerp to display point
            this.lerpAlpha += this.context.time.deltaTime;


            // Calculate new position
            let newPosition = this.raisePoint?.position.clone().lerp(this.displayPoint!.position, this.lerpAlpha);
            //Update object's position
            this.pulledItem!.position.copy(newPosition!);

            //90 degrees about x/z axis
            let q = new Quaternion();
            
            //q.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
            q.setFromAxisAngle(this.itemData!.displayRotationAxis!, this.itemData!.displayRotationAngle!);
            let newRotation = this.lastObjectRotation.clone().slerp(q, this.lerpAlpha);
            this.pulledItem!.quaternion.copy(newRotation);
        }
        else {
            this.lerpAlpha = 0.0;
            this.raiseLerpAlpha = 0.0;
            // this.pulledItem = null;
            this.wantsToOpen = false;
            this.isDisplayingItem = true;
            this.chestIsOpen = true;
        }
    }

    flag: boolean = false;

    releaseItem() {
        if(!this.flag){
            this.animator?.play("Close_Lid");
            this.flag = true;
        }
        if (this.lerpAlpha < 1){ //lerp to display point
            this.lerpAlpha += this.context.time.deltaTime;

            
            // Calculate new position
            let newPosition = this.displayPoint?.position.clone().lerp(this.restingPoint![this.currentObjectIndex].position, this.lerpAlpha);
            //Update object's position
            this.pulledItem!.position.copy(newPosition!);

            
            //let q = new Quaternion( 0.7, 0, 0, 0.7);
            if(this.itemData!.displayRotationQuaternion)
            {let q = new Quaternion(this.itemData!.displayRotationQuaternion!.x, this.itemData!.displayRotationQuaternion!.y, this.itemData!.displayRotationQuaternion!.z, this.itemData!.displayRotationQuaternion!.w);

            let nextRotation = new Quaternion(this.itemData!.restRotationQuaternion!.x, this.itemData!.restRotationQuaternion!.y, this.itemData!.restRotationQuaternion!.z, this.itemData!.restRotationQuaternion!.w);  

             let newRotation = q.slerp(nextRotation, this.lerpAlpha);
            // let newRotation = q.slerp(this.restingPoint![0].quaternion, this.lerpAlpha);
            this.pulledItem!.quaternion.copy(newRotation);}

            // lerp scale
            let newScale = this.lastObjectScale.clone().lerp(this.restingPoint![this.currentObjectIndex].scale, this.lerpAlpha);
            this.pulledItem!.scale.copy(newScale);
        }
        else {
            let a = new Quaternion();
            a.setFromEuler(this.pulledItem!.rotation);
            console.log("reached resting point ", a);
            this.chestIsOpen = false;
            this.lerpAlpha = 0.0;
            this.raiseLerpAlpha = 0.0;
            this.isDisplayingItem = false;
            this.flag = false
            this.pulledItem = null;
            this.wantsToOpen = false;
            this.currentObjectIndex +=1;// this.currentObjectIndex < this.restingPoint!.length - 1 ? this.currentObjectIndex + 1 : 0;
            this.isInRaisedState = false;
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === "e") {
            this.wantsToClose = true;
        }
        if (event.key === "r") {
            this.wantsToOpen = true;
        }
    }

    lateUpdate() {
        //this.wantsToClose = false;
       // this.wantsToOpen = false;
    }
}
 