import {Behaviour, serializable, Animator} from "@needle-tools/engine";
import { Object3D, Quaternion, Vector3, Vector4} from "three";

export default class Item extends Behaviour {
    @serializable(Vector3) pullRotation?: Vector3;

    @serializable(Vector4) displayRotationQuaternion?: Vector4;
    @serializable(Vector3) displayRotationAxis?: Vector3;
    public displayRotationAngle?: number;

    @serializable(Vector4) restRotationQuaternion?: Vector4;
    @serializable(Vector3) restRotationAxis?: Vector3;
    public restRotationAngle?: number;

    @serializable(Vector3) pullScale?: Vector3;
    @serializable(Vector3) dislayScale?: Vector3;
}