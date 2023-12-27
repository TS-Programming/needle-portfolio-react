export const introDescription: string = `The Trophy Case is an interactive 3D component of my portfolio that that displays my projects in a unique way. One by one, the user pulls symbols representing my project from a chest and places them on an island. Each item has a discriptive "sign" next to it in world-space which links to a page (like this one) with more information about the project.

Using Unity and the Needle Tools SDK to integrate this component into my react website came with some unique benefits and challenges. As you can see above, the Trophy Case exists as a scene in Unity, however the scripts within are written in TypeScript using the Needle Tools API instead of the typical C#. In pratice this meant taking advantage of Unity's excellent spatial and hierarchical features, but having to program custom scripts in an unfamiliar language. Thankfully I'm experienced in JavaScript, and Needle Tools has a wealth of documentation and support, so the transition was relatively painless. 

In designing the trophy case I realized that I needed to have a scalable solution for adding new items. The key issue is this: While each new item requires a new position/rotation and camera position/rotation in the scene, the code for placing items and switching focus between them should not need to be updated each time. Beyond that is the challenge that since items are revealed over time, each item's camera position must be "locked" until the item is pulled from the chest and placed on an island, however all revealed items must be able to be focused on at any time.

I decided to go with a cycling camera system such that the user can switch between items by pressing left/right, and the last item is adjacent to the first item. I actually achieved this with a recursive solution. Typically, recursion happening within one frame is a bad idea, but since its a small list, it ends up being eloquent and safe. Buttons in the scene call setCamera() with a boolean argument representing left or right. The array of camera positions has parity with an array of booleans representing if a given position is availible or not. If the next postion is not availible, the function calls itself until it finds the next availible position in the cycle.
`;

export const setCameraDescription: string = `Now the camera knows where it needs to go, but there's still the issue of smoothly transitioning between positions. I decided to use a lerp/slerp (linear interpolation and spherical linear interpolation) to smoothly transition between the last camera position/rotation and the next. The lerp is controlled by an alpha value that is incremented each frame. Once the the amount of time I want the transition to take expires, the camera will be in position. The alpha gets set to 1 just to ensure the item is precisely where intended.
`;

export const setCameraSnippet: string = `    
setCamera(wantsToGoLeft: boolean) {
    // Update the last camera state
    this.lastCamPosition = this.camera!.position.clone();
    this.lastCamRotation = this.camera!.quaternion.clone();

    // Hide the current camera buttons
    this.camButtons![this.nextCameraIndex].visible = false;

    // Determine the next camera index
    const totalPositions = this.camPosition!.length;
    if (wantsToGoLeft) 
        this.nextCameraIndex = (this.nextCameraIndex == 0) 
            ? totalPositions - 1 // end of the list
            : this.nextCameraIndex - 1;
    else 
        this.nextCameraIndex = (this.nextCameraIndex < totalPositions - 1) 
            ? this.nextCameraIndex + 1 
            : 0; // beginning of the list

    // Attempt to switch camera
    if (this.isCamActive![this.nextCameraIndex] === false) {
        this.setCamera(wantsToGoLeft);
    } else {
        this.cameraLerpAlpha = 0.0;
        this.isSwitchingCam = true;
    }
}`;

export const updateCameraSnippet: string = `    
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
}`;
