/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	if(slices == null)
		slices = 8;
	
	if(stacks == null)
		stacks = 20;
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the this.vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	this.angulo = (2*Math.PI)/this.slices;
 	this.height = 1/this.stacks;
 	this.index = 0;
 	this.z = 0;

	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();

	var teta = 0.0;
	for(j= 0; j < this.slices; j++, teta+=this.angulo){
		this.z = 0;
 		for(i = 0; i < this.stacks; i++){
 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++;
 			teta+=this.angulo;
 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++;
 			this.z += this.height;
 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++;
 			teta-=this.angulo;
 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++;

			/*		3		2
					*********
					*     * *
					*  *	*      0->1->2   
					*********      2->3->0
					0		1
			*/
			
 			this.indices.push(this.index - 4); this.indices.push(this.index-3); this.indices.push(this.index-2);
 			this.indices.push(this.index - 2); this.indices.push(this.index-1); this.indices.push(this.index-4);


			var medio = (teta+(this.angulo/2.0));
			
			this.normals.push(Math.cos(medio)); this.normals.push(Math.sin(medio)); this.normals.push(0);
			this.normals.push(Math.cos(medio)); this.normals.push(Math.sin(medio)); this.normals.push(0);
			this.normals.push(Math.cos(medio)); this.normals.push(Math.sin(medio)); this.normals.push(0);
			this.normals.push(Math.cos(medio)); this.normals.push(Math.sin(medio)); this.normals.push(0); 

 		}
	}
	
	this.z = 0;
	teta = 0;
	var centro = this.index;

	for(i = 0; i < 2; i++, this.z+= 1){
		var centro = this.index;
		this.vertices.push(0); this.vertices.push(0); this.vertices.push(this.z);
		this.index++;
		for(j = 0; j < this.slices; j++){
			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++; //1
			teta += this.angulo;

 			this.vertices.push(Math.cos(teta)); this.vertices.push(Math.sin(teta)); this.vertices.push(this.z);
 			this.index++;//2

			//	 centro	*
			//			* *
			//			*  *
			//			*    *
			//	teta1	******* teta2
			
			if(i == 1){
				this.indices.push(centro); this.indices.push(this.index-2); this.indices.push(this.index-1);
				this.normals.push(0); this.normals.push(0); this.normals.push(1);
				this.normals.push(0); this.normals.push(0); this.normals.push(1);
				this.normals.push(0); this.normals.push(0); this.normals.push(1);
			}
			else {
				this.indices.push(centro); this.indices.push(this.index-1); this.indices.push(this.index-2); 
				this.normals.push(0); this.normals.push(0); this.normals.push(-1);
				this.normals.push(0); this.normals.push(0); this.normals.push(-1);
				this.normals.push(0); this.normals.push(0); this.normals.push(-1);
			}
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
