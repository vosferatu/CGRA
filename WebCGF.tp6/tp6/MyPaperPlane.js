/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaperPlane(scene) {

	CGFobject.call(this,scene);

	this.tri=new MyTriangle(this.scene,0,1,0,1);
	
	this.tri.initBuffers();

	this.deg2rad=Math.PI/180.0;

	this.x =0.5;
	this.y=0.5;
	this.z=0;

	d = new Date();
	this.startTime = d.getTime();

};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);

MyPaperPlane.prototype.constructor=MyPaperPlane;

MyPaperPlane.prototype.display = function () {

	//usa-se sempre o quadrado a partir do seu ponto original
	//isto é, com os vértices indicados no construtor
	//"centro" em 0,0,0
	//recorrendo a pushMatrix e popMatrix

	//FACE DA FENTE-----------------------------------
	this.scene.pushMatrix();

var b_rad = -90.0 * this.deg2rad;

	this.scene.rotate(b_rad,1,0,0); 
	this.scene.translate(this.x,this.y,this.z); 
	this.tri.display();			
		
	this.scene.popMatrix();
	
	
	//FACE DE TRÁS-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 90.0 * this.deg2rad;

	this.scene.rotate(b_rad,1,0,0);
									
	this.scene.translate(this.x,this.y,this.z);

	this.tri.display();

	this.scene.popMatrix();



};

MyPaperPlane.prototype.update = function (currTime,wall) {

	var elapsed = currTime-this.startTime;

	if(elapsed >= 1000 && this.x!=0){
		var auxX = this.x + 0.1;
		//var auxY = this.y + 0.1;
		
		this.startTime = currTime;

		this.x = auxX;
		//this.y = auxY;
	}
	else
	if(elapsed >= 1000 && this.x==0){

var b_rad = -100.0 * this.deg2rad;
		this.scene.rotate(b_rad,0,0,1);							
		this.scene.translate(this.x,this.y,this.z);

	}

}