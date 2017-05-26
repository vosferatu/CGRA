/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene,x,y,z) {
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);
	this.explosion=new MyLamp(this.scene, 64, 32);

	this.x=x;
	this.y=y;
	this.z=z;

	this.deg2rad=Math.PI/180.0;
	this.locked=0;
	this.destroyed=0;

	this.over=0;

	this.explosion_x=0.2;
	this.explosion_y=0.2;
	this.explosion_z=0.2;

	this.cubeAppearance = new CGFappearance(this.scene);
	this.cubeAppearance.setAmbient(0.5,0.5,0.5,1);
	this.cubeAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.cubeAppearance.setSpecular(0.1,0.1,0.1,1);
	this.cubeAppearance.setShininess(1);
	this.cubeAppearance.loadTexture("../resources/images/target.png");

	this.exploAppearance = new CGFappearance(this.scene);
	this.exploAppearance.setAmbient(0.5,0.5,0.5,1);
	this.exploAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.exploAppearance.setSpecular(0.1,0.1,0.1,1);
	this.exploAppearance.setShininess(1);
	this.exploAppearance.loadTexture("../resources/images/explosion.png");

};





MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {

if(this.destroyed==0){
	this.scene.pushMatrix();
	this.scene.translate(this.x,this.y,this.z);
	this.cubeAppearance.apply();
	this.cube.display();		
	this.scene.popMatrix();
}
else
{
	
this.scene.pushMatrix();
	this.scene.translate(this.x,this.y,this.z);
	this.exploAppearance.apply();
	this.scene.rotate(-90*this.deg2rad,1,0,0);
	this.scene.scale(this.explosion_x,this.explosion_y,this.explosion_z);
	this.explosion.display();		
	this.scene.popMatrix();
	
	this.explosion_x+=0.1;
	this.explosion_y+=0.1;
	this.explosion_z+=0.1;

	if(this.explosion_x>=3)
		this.over=1;
	
}
};

