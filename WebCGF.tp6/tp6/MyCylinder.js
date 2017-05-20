 /**
 * MyCylinder
 * @constructor
 */

function MyCylinder(scene, slices, stacks, minS, maxS, minT, maxT){
	CGFobject.call(this, scene);

	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;

	this.slices = slices;
	this.stacks = stacks;

	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;

	this.incS = (this.maxS - this.minS) / this.slices;
	this.incT = (this.maxT - this.minT) / this.stacks;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function(){
	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.texCoords = new Array();

	var height = 1.0 / this.stacks;
	var ang = (2 * Math.PI) / this.slices;

	var teta = 0;
	var xText = this.maxS;

	for (i = 0; i <= this.slices; i++, teta += ang, xText -= this.incS){

		var yText = this.maxT;
		var x = Math.cos(teta);
		var y = Math.sin(teta);
		var z = 0;

		for (j = 0; j <= this.stacks; j++, z += height, yText -= this.incT){

			this.vertices.push(x, y, z);
			this.normals.push(x, y, 0);
			this.texCoords.push(xText, yText);
		}
	}

	var ind = 1;

	for (var i = 0; i < this.slices; i++){
		for (var j = 0; j < this.stacks; j++){
			this.indices.push(ind, ind+this.stacks, ind+this.stacks+1);
			this.indices.push(ind+this.stacks, ind, ind-1);
			this.indices.push(ind+this.stacks+1, ind+this.stacks, ind);
			this.indices.push(ind, ind+this.stacks, ind-1);

			ind++;
		}

		ind++;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};