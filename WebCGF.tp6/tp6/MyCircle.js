/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyCircle(scene, slices) {
	CGFobject.call(this,scene);

	slices = typeof nrDivs !== 'undefined' ? slices : 12;

	this.slices = slices;
	this.angulo = (2*Math.PI) / this.slices;

	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = Plane;

MyCircle.prototype.initBuffers = function() {

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
    this.index = 0;
	var teta = 0.0;
	var centro = this.index;

	this.vertices.push(0); this.vertices.push(0); this.vertices.push(0);
	this.texCoords.push(0.5, 0.5);
	this.index++;
	
	for(j = 0; j < this.slices; j++){
		this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(0);
		this.texCoords.push((Math.cos(teta)+1)/2.0,((-Math.sin(teta)+1)/2.0));

 		this.index++; //1
		teta += this.angulo;

 		this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(0);
 		this.index++;//2

			//	 centro	*
			//			* *
			//			*  *
			//			*    *
			//	teta1	******* teta2
			
		this.texCoords.push((Math.cos(teta)+1)/2.0,((-Math.sin(teta)+1)/2.0));

		
		this.indices.push(centro); this.indices.push(this.index-2); this.indices.push(this.index-1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		this.normals.push(0); this.normals.push(0); this.normals.push(1);
		
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}