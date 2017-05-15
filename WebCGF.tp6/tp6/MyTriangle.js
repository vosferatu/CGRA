/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTriangle(scene, minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	
	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,	//inferior esquerdo
            -0.5, 0.3, 0,	//inferior direito
            0, 0.3, 2	//superior esquerdo
			];

	this.indices = [
            0, 1, 2,
			2, 1, 0
        ];

   	this.normals = [ 
		0, 0, 1,
		0, 0, 1,
		0, 0, 1

   	];  

   	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		//this.maxS, this.minT
	];

			
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
