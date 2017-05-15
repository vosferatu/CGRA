 /**
 * MyTopLamp
 * @constructor
 */

 function MyTopLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;

	this.circle = new MyCircle(scene, slices);
	this.lamp = new MyLamp(scene, slices, stacks);

 	this.initBuffers();
 };

 MyTopLamp.prototype = Object.create(CGFobject.prototype);
 MyTopLamp.prototype.constructor = MyTopLamp;

MyTopLamp.prototype.display = function () {

 	this.scene.pushMatrix();
 		this.lamp.display();
 	this.scene.popMatrix();

 	 this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0); 	
 		this.circle.display();
 	this.scene.popMatrix();
 }