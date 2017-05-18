/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene,x,y,z) {

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

	this.ang;

	this.target;



};

MyTorpedo.prototype = Object.create(CGFobject.prototype);

MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.lock_target = function(target){

this.target = target;

}


MyTorpedo.prototype.display = function () {
	
this.scene.pushMatrix();
this.scene.translate(this.x,this.y,this.z);


	//main cylinder
	this.scene.pushMatrix();
		this.scene.scale(0.15,0.15,0.8);
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

MyTorpedo.prototype.update = function (predicate) {

}

