/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene,x,y,z) {
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);

	this.x=x;
	this.y=y;
	this.z=z;

	this.destroyed=0;

	this.cubeAppearance = new CGFappearance(this.scene);
	this.cubeAppearance.setAmbient(0.5,0.5,0.5,1);
	this.cubeAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.cubeAppearance.setSpecular(0.1,0.1,0.1,1);
	this.cubeAppearance.setShininess(1);
	this.cubeAppearance.loadTexture("../resources/images/target.png");

};

MyTarget.prototype.destroy = function () {

	this.destroyed=1;
	
};




MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {

	this.scene.pushMatrix();

	this.scene.translate(this.x,this.y,this.z);
	this.cubeAppearance.apply();
	this.cube.display();		
	this.scene.popMatrix();
	
};
