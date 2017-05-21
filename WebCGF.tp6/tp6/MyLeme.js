/**
 * MyLeme
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyLeme(scene) {
		CGFobject.call(this,scene);

	this.quad=new MyQuad(this.scene,0,1,0,1);

	this.trapeze = new MyTrapeze(this.scene,0,1,0,1);
	

	this.trapeze.initBuffers();
	this.quad.initBuffers();

	this.deg2rad=Math.PI/180.0;
};

MyLeme.prototype = Object.create(CGFobject.prototype);
MyLeme.prototype.constructor=MyLeme;

MyLeme.prototype.display = function () {

this.scene.pushMatrix();
this.scene.scale(1.5,1,1);

	//FACE DA FENTE-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,0,0.5); //"puxa" quadrado original 0.5 unidades em z -> para a frente
	this.scene.scale(0.5,1,1);
	
	this.quad.display();			

		
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

	this.scene.translate(-0.37,0,0);	// coloca em posicao
	this.scene.rotate(b_rad,0,1,0); //roda 90 graus para a esquerda
this.scene.rotate(14.0 * this.deg2rad,0,1,0);
this.scene.scale(1.03,1,1);
	this.quad.display();

	this.scene.popMatrix();

	//FACE DA DIREITA-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 90.0 * this.deg2rad;

	this.scene.translate(0.37,0,0);	// coloca em posicao
	this.scene.rotate(b_rad,0,1,0); //roda 90 graus para a direita
this.scene.rotate(-14.0 * this.deg2rad,0,1,0);
this.scene.scale(1.03,1,1);
	this.quad.display();

	this.scene.popMatrix();

	//FACE DE CIMA-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 180.0 * this.deg2rad;

	this.scene.translate(0,1,0);	// coloca em posicao
	this.scene.rotate(b_rad,0,1,0); //roda 90 graus para cima
	this.scene.rotate(-90.0 * this.deg2rad,1,0,0);
	this.trapeze.display();

	this.scene.popMatrix();

	//FACE DE BAIXO-----------------------------------------
	this.scene.pushMatrix();

	var b_rad = 90.0 * this.deg2rad;

	this.scene.translate(0,-1,0);	// coloca em posicao
	this.scene.rotate(b_rad,1,0,0); //roda 90 graus para cima

	this.trapeze.display();

	this.scene.popMatrix();

this.scene.pushMatrix();
};