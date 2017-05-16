 /**
 * MyCylinder
 * @constructor
 */

 function MyCylinder(scene, slices, stacks, minS=0, maxS=1, minT=0, maxT=1) {
 	CGFobject.call(this,scene);
	
	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;
	
	this.stacks = stacks;
	this.slices = slices;

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

 	this.angulo = (2*Math.PI)/this.slices;
 	this.height = 1/this.stacks;

	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();

	var teta = 0.0;
	this.z = 0;

	for(j= 0; j < (this.stacks + 1); j++,this.z += this.height){
 		teta = 0;
 		for(i = 0; i < this.slices; i++){
 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);

			this.normals.push(Math.cos(teta)); this.normals.push(Math.sin(teta)); this.normals.push(0);
			teta+=this.angulo;
 		}

	}


	for(i = 0; i < this.stacks; i++){
 		for(j = 0; j < this.slices; j++){
					
 			this.indices.push(j+(this.slices*i));
 			this.indices.push((j+1)+(this.slices*i)); 
 			this.indices.push(j+(this.slices*(i+1)));

 			if (j != (this.slices - 1)){
				this.indices.push((j+1)+(this.slices*(i+1)));
 				this.indices.push(j+(this.slices*(i+1))); 
 				this.indices.push((j+1)+(this.slices*i)); 
 			} else { 
 	 			this.indices.push(this.slices*i);
 				this.indices.push((j+1)+(i*this.slices)); 
 				this.indices.push(j+(this.slices*i)); 						
 				
 			}
 		}
 		
	}


	teta = 0.0;
	this.z= 0.0;
	var ang = 1/this.slices;

	for(i = 0; i <= this.stacks; i++){
 		for(j = 0; j < this.slices; j++){
			this.texCoords.push(teta,  this.z);
			teta += ang;
 		}
 		teta = 0.0;
 		this.z += this.height;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };