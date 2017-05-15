 /**
 * MyTopCylinder
 * @constructor
 */

 function MyTopCylinder(scene, slices, stacks, minS=0, maxS=1, minT=0, maxT=1) {
 	CGFobject.call(this,scene);

	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;

	this.circle = new MyCircle(scene, slices, minS, maxS, minT, maxT);
	this.cylinder = new MyCylinder(scene, slices, stacks, minS, maxS, minT, maxT);

 	this.initBuffers();
 };

 MyTopCylinder.prototype = Object.create(CGFobject.prototype);
 MyTopCylinder.prototype.constructor = MyTopCylinder;

MyTopCylinder.prototype.display = function () {

 	this.scene.pushMatrix();
 		this.cylinder.display();
 	this.scene.popMatrix();

 	 this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0); 	
 		this.circle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 		this.scene.translate(0,0,1);
 		this.circle.display();
 	this.scene.popMatrix();
 }