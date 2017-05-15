/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {

	CGFobject.call(this,scene);

	this.body = new MyCylinder(this.scene, 12, 32);
	this.front = new MyLamp(this.scene, 12, 32);
	this.back = new MyLamp(this.scene, 12, 32);
	this.tower = new MyTopCylinder(this.scene, 12, 32);

	this.periscope1 = new MyCylinder(this.scene, 12, 32);
	this.periscope2 = new MyTopCylinder(this.scene, 12, 32);

	this.rotor1 = new MyDoubleCylinder(this.scene, 64, 32);
	this.rotor2 = new MyDoubleCylinder(this.scene, 64, 32);

	this.helix1 = new MyUnitCubeQuad(this.scene);
	this.helix2 = new MyUnitCubeQuad(this.scene);
	this.helixcenter1 = new MyTopLamp(this.scene, 64, 32);
	this.helixcenter2 = new MyTopLamp(this.scene, 64, 32);

	this.trapvert = new MyTrapeze(this.scene);
	this.traphor = new MyTrapeze(this.scene);
	this.trapmid = new MyTrapeze(this.scene);

	this.deg2rad=Math.PI/180.0;

	this.x = 0;
	this.y = 0;
	this.z = 0;

	this.ang=0;

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);

MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function () {

//Movement
this.scene.pushMatrix();
this.scene.translate(this.x,this.y,this.z);
this.scene.rotate(this.ang*this.deg2rad,0,1,0);


//main cylinder
	this.scene.pushMatrix();
		this.scene.scale(0.365,0.5,4.08);
		this.body.display();
	this.scene.popMatrix();

	//front lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,4.05);
		this.scene.scale(0.365,0.5,0.46);
		this.front.display();
	this.scene.popMatrix();

	//back lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.03);
		this.scene.scale(0.365,0.5,0.46);
		this.scene.rotate(-Math.PI, 0,1,0);
		this.back.display();
	this.scene.popMatrix();

	//mid body vertical cylinder
	this.scene.pushMatrix();
		this.scene.translate(0,1.07,2.5);
		this.scene.scale(0.3,1,0.44);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.tower.display();
	this.scene.popMatrix();

	//vertical periscope1
	this.scene.pushMatrix();
		this.scene.translate(0,1.5,2.7);
		this.scene.scale(0.03,1,0.03);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.periscope1.display();
	this.scene.popMatrix();

	//horizontal periscope2
	this.scene.pushMatrix();
		this.scene.translate(0,1.5,2.67);
		this.scene.scale(0.03,0.03,0.15);
		this.periscope2.display();
	this.scene.popMatrix();

	//rotor1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0);
		this.scene.scale(0.2,0.2,0.2);
		this.rotor1.display();
	this.scene.popMatrix();

	//rotor2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0);
		this.scene.scale(0.2,0.2,0.2);
		this.rotor2.display();
	this.scene.popMatrix();

	//helix 1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0.1);
		this.scene.scale(0.06,0.35,0.06);
		this.helix1.display();
	this.scene.popMatrix();

	//helix 2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0.1);
		this.scene.scale(0.06,0.35,0.06);
		this.helix2.display();
	this.scene.popMatrix();

	// helix center 1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0.13);
		this.scene.scale(0.05,0.05,0.07);
		this.scene.rotate(Math.PI, 0,1,0);
		this.helixcenter1.display();
	this.scene.popMatrix();

	//helix center 2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0.13);
		this.scene.scale(0.05,0.05,0.07);
		this.scene.rotate(Math.PI, 0,1,0);
		this.helixcenter2.display();
	this.scene.popMatrix();
		
	//vertical back trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0.02,-0.1);
		this.scene.scale(0.08,2.34,0.23);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.trapvert.display();
	this.scene.popMatrix();

	//horizontal back trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0.02,-0.1);
		this.scene.scale(2.34,0.08,0.23);
		this.traphor.display();
	this.scene.popMatrix();

	//mid trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0.8,2.5);
		this.scene.scale(1.42,0.04,0.23);
		this.scene.rotate(Math.PI,0,1,0);
		this.trapmid.display();
	this.scene.popMatrix();


	this.scene.popMatrix();
	
};

MySubmarine.prototype.update = function (predicate) {


if(predicate==0){
	this.z = this.z + 0.1*Math.cos(this.ang*this.deg2rad);
	this.x = this.x + 0.1*Math.sin(this.ang*this.deg2rad);
}
	else
	if(predicate==1){
	this.z = this.z - 0.1*Math.cos(this.ang*this.deg2rad);
	this.x = this.x - 0.1*Math.sin(this.ang*this.deg2rad);
	}
	else
	if(predicate==2)
	this.ang=this.ang+1;
	
else
if(predicate==3)
	this.ang=this.ang-1;


}

