/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {
	CGFobject.call(this,scene);
    
    this.quad = new MyQuad(this.scene);
    this.ang = 0;

    this.parse = Math.PI / 180.0; 


};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function () {

		this.scene.rotate(-this.ang * this.parse, 0,0,1);
	   	this.scene.translate(0,0.4,0);
	   	this.scene.scale(0.02,1,1);
	  	this.quad.display();		
	
};

MyClockHand.prototype.setAngle = function (angle) {
    	this.ang = angle;
    	if((this.ang % 360) == 0)
    		this.ang = 0;
}