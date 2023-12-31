import {Behaviour, Component, serializable, Rigidbody, Animator, Input, Physics, KeyCode , AssetReference, InstantiateOptions} from "@needle-tools/engine";
import { Object3D, Vector3, Quaternion } from "three";

export class Shovel extends Behaviour {
    @serializable(Animator)
    animator?: Animator;

    triggerDig(){
        this.animator?.setBool("Dig", true);
    }

    endDig(){
        this.animator?.setBool("Dig", false);
    }
}