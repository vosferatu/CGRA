/**
 * MyLamp
 * @constructor
 */


function MyLamp(scene, slices, stacks, minS, maxS, minT, maxT){
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

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function(){
	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();

	this.ang = (2*Math.PI)/this.slices;
	this.z = Math.PI / (2 * this.stacks);

	var beta = 0;
	var xText = this.maxS;

	for (var i = 0; i <= this.slices; i++, beta += this.ang, xText -= this.incS){
		var teta = 0;
		var yText = this.minT;

		for (var j = 0; j <= this.stacks; j++, teta += this.z, yText += this.incT){
			var x = Math.cos(beta) * Math.sin(teta);
			var y = Math.sin(beta) * Math.sin(teta);
			var z = Math.cos(teta);

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
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
