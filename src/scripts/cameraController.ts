import {Behaviour, serializable} from "@needle-tools/engine";
import {Object3D, Quaternion, Vector3 } from "three";


export class CameraController extends Behaviour {
    @serializable(Object3D)
    camera?: Object3D;

    @serializable(Object3D)
    camPosition: Object3D[] | null = null;

    @serializable(Object3D)
    camButtons: Object3D[] | null = null;

    isCamActive: boolean[] = [false, true, false];

    truthTheCam: number = 0
    private isSwitchingCam: boolean = false;
    private cameraLerpAlpha: number = 0.0;
    nextCameraIndex: number = 1;
    private lastCamPosition: Vector3 = new Vector3();
    private lastCamRotation: Quaternion = new Quaternion();
    //private lastCamButtons: Object3D = new Object3D();
    private cameraLerpTime: number = 0.5;


    update() {
        if(this.isSwitchingCam){
            this.updateCamera();
        }
    }


    setCamera(isLeft: boolean) {
        // Update the last camera state
        this.lastCamPosition = this.camera!.position.clone();
        this.lastCamRotation = this.camera!.quaternion.clone();

        // Hide the current camera buttons
        this.camButtons![this.nextCameraIndex].visible = false;
    
        // Determine the next camera index
        const totalPositions = this.camPosition!.length;
        if (isLeft) 
            this.nextCameraIndex = (this.nextCameraIndex <= 0) ? totalPositions - 1 : this.nextCameraIndex - 1;
        else 
            this.nextCameraIndex = (this.nextCameraIndex < totalPositions - 1) ? this.nextCameraIndex + 1 : 0;
    
        // Attempt to switch camera
        if (this.isCamActive![this.nextCameraIndex] === false) {
            this.setCamera(isLeft);
        } else {
            this.cameraLerpAlpha = 0.0;
            this.isSwitchingCam = true;
        }
    }
    

    updateCamera() {
        let alpha = 0.0;
        if(this.cameraLerpAlpha < this.cameraLerpTime){
            // Update the camera lerp alpha
            this.cameraLerpAlpha += this.context.time.deltaTime;
            alpha  = this.cameraLerpAlpha / this.cameraLerpTime;
        }
        else {
            // Show the new camera buttons
            this.camButtons![this.nextCameraIndex].visible = true;
            this.isSwitchingCam = false;
            alpha = 1
        }
        
        // Lerp the camera position and rotation
        let newPosition = this.lastCamPosition.clone().lerp(this.camPosition![this.nextCameraIndex].position, alpha);
        this.camera?.position.copy(newPosition!);
        
        let newRotation = this.lastCamRotation.clone().slerp(this.camPosition![this.nextCameraIndex].quaternion, alpha);
        this.camera?.quaternion.copy(newRotation!);    
    }
}