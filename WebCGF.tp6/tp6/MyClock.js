/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
    
    this.slices = 12;
	this.cylinder = new MyCylinder(this.scene, this.slices, 1);
    this.circle = new MyCircle(this.scene, this.slices);

    this.secondHand = new MyClockHand(this.scene);
    this.minuteHand = new MyClockHand(this.scene);
    this.hourHand = new MyClockHand(this.scene);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.5,0.5,0.5,1);
	this.clockAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearance.setShininess(1);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.frameAppearance = new CGFappearance(this.scene);
	this.frameAppearance.setAmbient(0,0,0,1);
	this.frameAppearance.setDiffuse(0.1,0.1,0.1,1);
	this.frameAppearance.setSpecular(0.1,0.1,0.1,1);
	this.frameAppearance.setShininess(1);

	this.secondAppearance = new CGFappearance(this.scene);
	this.secondAppearance.setAmbient(1,0,0,1);
	this.secondAppearance.setDiffuse(1,0,0,1);
	this.secondAppearance.setSpecular(0.7,0.7,0.7,1);
	this.secondAppearance.setShininess(200);

	this.hourAppearance = new CGFappearance(this.scene);
	this.hourAppearance.setAmbient(0,0,0,1);
	this.hourAppearance.setDiffuse(0.1,0.1,0.1,1);
	this.hourAppearance.setSpecular(0.1,0.1,0.1,1);
	this.hourAppearance.setShininess(1);

	//1.4
	this.hourHand.setAngle(90);
	this.minuteHand.setAngle(180);
	this.secondHand.setAngle(-90);

	d = new Date();
	this.startTime = d.getTime();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function () {

		//HORAS--------------------------------------
	this.scene.pushMatrix();
		this.scene.translate(0,0,1.01);
		this.scene.scale(0.3,1,1);
		this.hourAppearance.apply();
		this.hourHand.display();		
		
	this.scene.popMatrix();

	//MINUTOS-----------------------------------
	this.scene.pushMatrix();
 
 		this.scene.translate(0,0,1.01);
 		this.scene.scale(1,0.6,1);
	   	this.minuteHand.display();		
		
	this.scene.popMatrix();

	//SEGUNDOS-----------------------------------
	this.scene.pushMatrix();

 		this.scene.translate(0,0,1.01);
	   	this.scene.scale(0.3,0.35,1);
	  	this.secondAppearance.apply();
	   	this.secondHand.display();		
			
	this.scene.popMatrix();

	//CORPO-----------------------------------
	this.scene.pushMatrix();

	   this.scene.translate(0,0,0.8);
	   this.scene.scale(0.7,0.7,0.25);
	   this.frameAppearance.apply();
	   this.cylinder.display();		
		
	this.scene.popMatrix();

	//TAMPO-----------------------------------
	this.scene.pushMatrix();

	   this.scene.translate(0,0,1); 
	   this.scene.scale(0.7,0.7,1);
	   this.clockAppearance.apply();
	   this.circle.display();		
		
	this.scene.popMatrix();

};

MyClock.prototype.update = function (currTime) {

	var elapsed = currTime-this.startTime;

	if(elapsed >= 1000){
		var sec = 360.0 * (1/60.0);
		var min = 360.0 * (1/60.0/60.0);
		var hour = 360.0 * (1/60.0/60.0/12.0);
		this.startTime = currTime;

		this.secondHand.setAngle(this.secondHand.ang + sec);
		this.minuteHand.setAngle(this.minuteHand.ang + min);
		this.hourHand.setAngle(this.hourHand.ang + hour);
	}

}
