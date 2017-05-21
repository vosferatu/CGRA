/**
 * MyTrapeze
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapeze(scene, minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	
	this.initBuffers();
};

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor=MyTrapeze;

MyTrapeze.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,	//inferior baixo 0
            0.5, -0.5, -0.5,	//inferior cima 1
            -0.25, 0.5, -0.5,	//superior baixo 2
            0.25, 0.5, -0.5,		//superior cima 3

			];

	this.indices = [
			
			0,1,2,
			3,2,1
		
		
        ];

   	this.normals = [  //1.3
	
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1

   	];  


		this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
		
		
	]
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};