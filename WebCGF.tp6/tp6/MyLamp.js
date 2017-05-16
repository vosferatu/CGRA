/**
 * MyLamp
 * @constructor
 */

 
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;
	
	this.stacks = stacks;
	this.slices = slices;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();


	this.height = 1/this.stacks;
	this.ang = (2*Math.PI)/this.slices;

	for (i = 0; i <= 1; i += this.height) {
		for (j = 0; j < this.slices; j++) {
			//spherical coordinates
			this.vertices.push(Math.sqrt(1-(i*i))*Math.cos(j*this.ang));
			this.vertices.push(Math.sqrt(1-(i*i))*Math.sin(j*this.ang));
			this.vertices.push(i);

			this.normals.push(Math.sqrt(1-(i*i))*Math.cos(j*this.ang));
			this.normals.push(Math.sqrt(1-(i*i))*Math.sin(j*this.ang));
			this.normals.push(i);
		}
	}

	for (i = 0; i < this.stacks; i++) {
		for (j = 0; j < this.slices; j++) {

			this.indices.push(this.slices*i+j);
			this.indices.push(this.slices*i+(j+1));
			this.indices.push(this.slices*(i+1)+j);
			
			if (j != (this.slices - 1)) {
				this.indices.push(this.slices*(i+1)+(j+1));
				this.indices.push(this.slices*(i+1)+j);
				this.indices.push(this.slices*i+(j+1));
			}
			else {
				this.indices.push(this.slices*i);
				this.indices.push(this.slices*i+(j+1));
				this.indices.push(this.slices*i+j);
			}
		}
	}

	var s = 0;
	var t = 0;
	var angulo = 1/this.slices;

	for (i = 0; i <= this.stacks; i++, t += this.height) {
		for (j = 0; j < this.slices; j++, s += angulo) {
			this.texCoords.push(s, t);
		}
		s = 0;
	}
	

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.initGLBuffers();
 };