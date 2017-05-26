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
            -0.5, -0.5, -0.5,	//inferior baixo
            0.5, -0.5, -0.5,	//inferior cima
            -0.5, 0.5, -0.5,	//superior baixo
            0.5, 0.5, -0.5,		//superior cima

		//frente
            -0.35, -0.5, 0.5,	//inferior baixo
            0.35, -0.5, 0.5,		//inferior cima
            -0.35, 0.5, 0.5,	//superior baixo
            0.35, 0.5, 0.5,		//superior cima


           -0.5, -0.5, -0.5,	//inferior baixo
            0.5, -0.5, -0.5,	//inferior cima
            -0.5, 0.5, -0.5,	//superior baixo
            0.5, 0.5, -0.5,		//superior cima

		//frente
            -0.35, -0.5, 0.5,	//inferior baixo
            0.35, -0.5, 0.5,		//inferior cima
            -0.35, 0.5, 0.5,	//superior baixo
            0.35, 0.5, 0.5,		//superior cima  

           	-0.5, -0.5, -0.5,	//inferior baixo
            0.5, -0.5, -0.5,	//inferior cima
            -0.5, 0.5, -0.5,	//superior baixo
            0.5, 0.5, -0.5,		//superior cima

		//frente
            -0.35, -0.5, 0.5,	//inferior baixo
            0.35, -0.5, 0.5,		//inferior cima
            -0.35, 0.5, 0.5,	//superior baixo
            0.35, 0.5, 0.5		//superior cima              
			];

	this.indices = [
			1, 2, 3,
			0, 2, 1,

			0, 4, 2,
			4, 6, 2,

			3, 7, 5,
			3, 5, 1,

			6, 4, 7,
			4, 5, 7,

			7, 3, 6,
			3, 2, 6,

			1, 5, 4,
			4, 0, 1
        ];

   	this.normals = [  //1.3
		0, 0, -1, //0
		0, 0, -1,
		0, 0, -1,
		0, 0, -1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,

		0, -1, 0,//0
		0, -1, 0,
		0, 1, 0,
		0, 1, 0,
		0, -1, 0,
		0, -1, 0,
		0, 1, 0,
		0, 1, 0,

		-1, 0, 1,//0
		1, 0, 1,
		-1, 0, 1,
		1, 0, 1,
		-1, 0, 1,
		1, 0, 1,
		-1, 0, 1,
		1, 0, 1
   	];  

	this.texCoords = [
		
		//QUADRADOS  done
		this.minS, this.maxT, //0
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT,
		this.maxS, this.maxT,
		this.minS, this.maxT,
		this.maxS, this.minT,
		this.minS, this.minT,

		//TRAPEZIOS
		this.minS, this.maxT, //0
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT,
		this.maxS, this.maxT,
		this.maxS, this.minT,
		this.minS, this.maxT,
		this.minS, this.minT,

		//BASE MAIOR MENOR
		this.maxS, this.maxT, //0 <-
		this.maxS, this.maxT, //1
		this.minS, this.maxT, //2 <-
		this.minS, this.maxT, //3
		this.maxS, this.minT, //4 <-
		this.maxS, this.minT, //5
		this.minS, this.minT, //6 <-
		this.minS, this.minT  //7

	];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};