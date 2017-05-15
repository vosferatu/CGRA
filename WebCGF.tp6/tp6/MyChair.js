/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;
 
function MyChair(scene) {
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);
	this.quad=new MyQuad(this.scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.5,0.5,0.5,1);
	this.tableAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(1);
	this.tableAppearance.loadTexture("../resources/images/table.png");


};

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor=MyChair;

MyChair.prototype.display = function () {


	// Materials
	
	this.materialA = new CGFappearance(this.scene);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.72,0.45,0.2,1);
	this.materialA.setSpecular(0,0,0,0);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this.scene);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.66,0.66,0.66,1);
	this.materialB.setSpecular(1,1,0.8,1);	
	this.materialB.setShininess(120);

	

	//usa-se sempre o cubo a partir do seu ponto original
	//isto é, com os vértices indicados no construtor
	//"centro" em 0,0,0
	//recorrendo a pushMatrix e popMatrix

	//TAMPO-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,2,0); 
	this.scene.scale(2,0.1,2); 
	this.tableAppearance.apply();
	this.cube.display();		
		
	this.scene.popMatrix();

	//ENCOSTO-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,3,1); 
	this.scene.scale(2,2,0.1); 
	this.tableAppearance.apply();
	this.cube.display();		
		
	this.scene.popMatrix();


	//PERNA TRASEIRA ESQUERDA-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(-0.8,1,0.8);
	this.scene.scale(0.3,2,0.3); //muda o tamanho do cubo
	this.materialB.apply();
	this.cube.display();		
		
	this.scene.popMatrix();

	//PERNA TRASEIRA DIREITA-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0.8,1,0.8);
	this.scene.scale(0.3,2,0.3); //muda o tamanho do cubo
	this.cube.display();		
		
	this.scene.popMatrix();

	//PERNA DIANTEIRA ESQUERDA-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(-0.8,1,-0.8);
	this.scene.scale(0.3,2,0.3); //muda o tamanho do cubo
	this.cube.display();		
		
	this.scene.popMatrix();

	//PERNA DIANTEIRA DIREITA-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0.8,1,-0.8);
	this.scene.scale(0.3,2,0.3); //muda o tamanho do cubo
	this.cube.display();		
		
	this.scene.popMatrix();
};