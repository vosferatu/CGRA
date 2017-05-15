/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {

	CGFobject.call(this,scene);

	this.quad=new MyQuad(this.scene,0,1,0,1);
	
	this.quad.initBuffers();

	this.deg2rad=Math.PI/180.0;

};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);

MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {

	//usa-se sempre o quadrado a partir do seu ponto original
	//isto é, com os vértices indicados no construtor
	//"centro" em 0,0,0
	//recorrendo a pushMatrix e popMatrix

	//FACE DA FENTE-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,0,0.5); //"puxa" quadrado original
	this.quad.display();			//0.5 unidades em z -> para a frente
		
	this.scene.popMatrix();
	
	
	//FACE DE TRÁS-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 180.0 * this.deg2rad;

	this.scene.rotate(b_rad,0,1,0); //roda 180 graus
									//ficando a face em -0.5z, virado para lá
	this.scene.translate(0,0,0.5); // coloca na posicao da face da frente

	this.quad.display();

	this.scene.popMatrix();

	//FACE DA ESQUERDA-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = -90.0 * this.deg2rad;

	this.scene.translate(-0.5,0,0);	// coloca em posicao
	this.scene.rotate(b_rad,0,1,0); //roda 90 graus para a esquerda

	this.quad.display();

	this.scene.popMatrix();

	//FACE DA DIREITA-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 90.0 * this.deg2rad;

	this.scene.translate(0.5,0,0);	// coloca em posicao
	this.scene.rotate(b_rad,0,1,0); //roda 90 graus para a direita

	this.quad.display();

	this.scene.popMatrix();

	//FACE DE CIMA-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = -90.0 * this.deg2rad;

	this.scene.translate(0,0.5,0);	// coloca em posicao
	this.scene.rotate(b_rad,1,0,0); //roda 90 graus para cima

	this.quad.display();

	this.scene.popMatrix();

	//FACE DE BAIXO-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 90.0 * this.deg2rad;

	this.scene.translate(0,-0.5,0);	// coloca em posicao
	this.scene.rotate(b_rad,1,0,0); //roda 90 graus para cima

	this.quad.display();

	this.scene.popMatrix();


};