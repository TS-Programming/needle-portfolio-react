import {Behaviour, serializable} from "@needle-tools/engine";
import { Object3D, Vector3} from "three";
import Item from "./item";


export class Cactus extends Item {
    @serializable(Object3D)
    model: Object3D | null = null;


    update(){
        //this.model!.rotation.y +=  this.context.time.deltaTime;
    }
}