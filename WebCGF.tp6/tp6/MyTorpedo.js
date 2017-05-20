/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene,x,y,z,ang) {

	CGFobject.call(this,scene);

	this.body = new MyCylinder(this.scene, 12, 32);
	this.front = new MyLamp(this.scene, 12, 32);
	this.back = new MyLamp(this.scene, 12, 32);

	this.trapup = new MyTrapeze(this.scene);
	this.trapdown = new MyTrapeze(this.scene);

	this.initBuffers();


	this.x=x;
	this.y=y;
	this.z=z;

	this.ang=ang;

	this.target;


	this.P1x =x; this.P1y =y; this.P1z=z;
	this.P2x=x*Math.sin(this.ang*this.deg2rad); this.P2y=y; this.P2z=z*Math.cos(this.ang*this.deg2rad);
	this.P3x; this.P3y; this.P3z;
	this.P4x; this.P4y; this.P4z;

this.torpedoAppearance = new CGFappearance(this.scene);
	this.torpedoAppearance.setAmbient(0.5,0.5,0.5,1);
	this.torpedoAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.torpedoAppearance.setSpecular(0.1,0.1,0.1,1);
	this.torpedoAppearance.setShininess(20);
	this.torpedoAppearance.loadTexture("../resources/images/torpedo.png");

};

MyTorpedo.prototype = Object.create(CGFobject.prototype);

MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.lock_target = function(target){

this.target = target;

this.P3x = this.target.x; this.P3y=3+ this.target.y; this.P3z=this.target.z;

this.P4x= this.target.x; this.P4y= this.target.y; this.P4z= this.target.z;

}


MyTorpedo.prototype.display = function () {
	
this.scene.pushMatrix();
this.scene.translate(this.x,this.y,this.z);


	//main cylinder
	this.scene.pushMatrix();
		this.scene.scale(0.15,0.15,0.8);
		this.torpedoAppearance.apply();
		this.body.display();
	this.scene.popMatrix();

	//front lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.79);
		this.scene.scale(0.15,0.15,0.1);
		this.front.display();
	this.scene.popMatrix();

	//back lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.006);
		this.scene.scale(0.15,0.15,0.1);
		this.scene.rotate(-Math.PI, 0,1,0);
		this.back.display();
	this.scene.popMatrix();
		
	//vertical back trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0,0);
		this.scene.scale(0.02,0.96,0.07);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.trapup.display();
	this.scene.popMatrix();

	//horizontal back trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0,0);
		this.scene.scale(0.96,0.02,0.07);
		this.trapdown.display();
	this.scene.popMatrix();

	
this.scene.popMatrix();
	
};

MyTorpedo.prototype.update = function () {


var dist = Math.sqrt(Math.pow((this.target.x-this.x),2) + Math.pow((this.target.y-this.y),2) +Math.pow((this.target.z-this.z),2));
var t=dist;


this.x = Math.pow((1-t),3)* this.P1x+3*t*Math.pow((1-t),2)*this.P2x+3*Math.pow(t,2)*(1-t)*this.P3x+Math.pow(t,3)*this.P4x;

this.y = Math.pow((1-t),3)* this.P1y+3*t*Math.pow((1-t),2)*this.P2y+3*Math.pow(t,2)*(1-t)*this.P3y+Math.pow(t,3)*this.P4y;

this.z = Math.pow((1-t),3)* this.P1z+3*t*Math.pow((1-t),2)*this.P2z+3*Math.pow(t,2)*(1-t)*this.P3z+Math.pow(t,3)*this.P4z;
}

