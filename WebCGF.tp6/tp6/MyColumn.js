/**
 * MyColumn
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyColumn(scene) {
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);

	this.cylinder = new MyCylinder(this.scene,700, 4);

	this.columnAppearance = new CGFappearance(this.scene);
	this.columnAppearance.setAmbient(0.5,0.5,0.5,1);
	this.columnAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.columnAppearance.setSpecular(0.1,0.1,0.1,1);
	this.columnAppearance.setShininess(1);
	this.columnAppearance.loadTexture("../resources/images/pedra.png");

};

MyColumn.prototype = Object.create(CGFobject.prototype);
MyColumn.prototype.constructor=MyColumn;

MyColumn.prototype.display = function () {

	//TAMPO-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,3.5,0); 
	this.scene.scale(1.2,0.8,1.2);
	this.scene.translate(0,-0.4,0);
	this.columnAppearance.apply();
	this.cube.display();		
		
	this.scene.popMatrix();

	//BASE-----------------------------------
	this.scene.pushMatrix();

	this.scene.translate(0,0.5,0); 
	this.scene.scale(1.2,0.8,1.2);
	this.scene.translate(0,-0.1,0);
	this.columnAppearance.apply();
	this.cube.display();		
		
	this.scene.popMatrix();

	//CORPO-----------------------------------
	this.scene.pushMatrix();

	this.scene.rotate(-90 * degToRad,1,0,0);
	this.scene.translate(0,0,0.8);
	this.scene.scale(0.5,0.5,2);
	this.columnAppearance.apply();
	this.cylinder.display();		
		
	this.scene.popMatrix();

	
};
