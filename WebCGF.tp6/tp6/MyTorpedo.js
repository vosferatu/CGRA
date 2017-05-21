/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, submarine, target) {

	CGFobject.call(this,scene);

	this.body = new MyCylinder(this.scene, 12, 32);
	this.front = new MyLamp(this.scene, 12, 32);
	this.back = new MyLamp(this.scene, 12, 32);
	this.trapup = new MyTrapeze(this.scene);
	this.trapdown = new MyTrapeze(this.scene);
	
	this.sub_x= submarine.x;
	this.sub_y= submarine.y-1;
	this.sub_z= submarine.z+2;
	this.sub_ang= submarine.ang -180;

	this.x= submarine.x;
	this.y= submarine.y-1;
	this.z= submarine.z+2;

	this.ang = 0;
	this.rotation = 0;

	this.target = target;

	this.t = 0;
	var dist = Math.sqrt((this.scene.target[i].x-this.x, 2) +
								Math.pow(this.scene.target[i].y-this.y, 2) +
								Math.pow(this.scene.target[i].z-this.z, 2));
	this.elapsed = 16.6666667 / (1000 * dist);

	this.degToRad = Math.PI / 180.0;

	this.torpedoAppearance = new CGFappearance(this.scene);
	this.torpedoAppearance.setAmbient(0.5,0.5,0.5,1);
	this.torpedoAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.torpedoAppearance.setSpecular(0.1,0.1,0.1,1);
	this.torpedoAppearance.setShininess(20);
	this.torpedoAppearance.loadTexture("../resources/images/torpedo.png");

	this.initBuffers();
};


MyTorpedo.prototype = Object.create(CGFobject.prototype);

MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.display = function () {
	
this.scene.pushMatrix();
	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.rotation, 0, 1, 0);
	this.scene.rotate(this.ang, 1, 0, 0);

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

MyTorpedo.prototype.update = function(){
	this.t += this.elapsed;

	var g1 = Math.pow(1-this.t, 3);
	var g2 = 3*this.t*Math.pow(1-this.t, 2);
	var g3 = 3*Math.pow(this.t, 2)*(1 - this.t);
	var g4 = Math.pow(this.t, 3);

	var p1x = this.sub_x; var p1y = this.sub_y; var p1z = this.sub_z;
	var p2x = this.sub_x+6*-Math.sin(this.sub_ang*this.degToRad); var p2y = this.sub_y; var p2z = this.sub_z+6*-Math.cos(this.sub_ang*this.degToRad);
	var p3x = this.target.x; var p3y = this.target.y + 3; var p3z = this.target.z;
	var p4x = this.target.x; var p4y = this.target.y; var p4z = this.target.z;

	var old_x = this.x; var old_y = this.y; var old_z = this.z;

	this.x = g1*p1x + g2*p2x + g3*p3x + g4*p4x;
	this.y = g1*p1y + g2*p2y + g3*p3y + g4*p4y;
	this.z = g1*p1z + g2*p2z + g3*p3z + g4*p4z;

	var delta_x = this.x-old_x; var delta_y = this.y-old_y; var delta_z = this.z-old_z;

	this.rotation = delta_x / Math.abs(delta_x) * Math.acos(delta_z / Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_z, 2)));
	this.ang = Math.asin(-delta_y / Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2) + Math.pow(delta_z, 2)));

	if (this.t >= 1){
		this.elapsed = 0;
	}
};