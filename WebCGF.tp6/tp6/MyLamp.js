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

	this.angulo = (2*Math.PI)/this.slices;
	this.height = 1/this.stacks;
	var teta = 0.0;

    this.w = Math.PI/2/this.stacks;
    var zangle = this.w;
	
	for(i = 0; i < (this.stacks + 1) ; i++, this.z += this.height, this.w += zangle) {
		teta = 0.0;

		for(var j = 0; j < this.slices; j++){
			this.vertices.push(Math.cos(this.w)*Math.cos(teta)); this.vertices.push(Math.cos(this.w)*Math.sin(teta));
 			this.vertices.push(Math.sin(this.w));


			this.normals.push(Math.cos(this.w)*Math.cos(teta)); this.normals.push(Math.cos(this.w)*Math.sin(teta));
			this.normals.push(0);
			teta+=this.angulo;
		}

	}



		for(i = 0; i < this.stacks - 1; i++){
 			for(j = 0; j < this.slices; j++){

			/*		3		2
					*********
					*     * *
					*  *	*      0->1->2   
					*********      2->3->0
					0		1
			*/

						
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
	

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.initGLBuffers();
 };