var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 100;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);


this.Clock_Working=true; 
this.speed=3;

this.Light_0=true;
this.Light_1=true;
this.Light_2=true;
this.Light_3=true;
this.Light_4=true;



this.currSubmarineAppearance=0;

this.submarineAppearanceList={ 'subAppearance':0, 'slidesAppearance':1, 'windowAppearance':2 };

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	
	this.wall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new Plane(this);
	this.chair = new MyChair(this);
	this.column = new MyColumn(this);
	this.clock = new MyClock(this);
	this.target = new Array;
	

var init_pos_x = 10;
var init_pos_y = 0.5;
var init_pos_z = 1;

var maxTarg=Math.floor(Math.random() * 10) + 2;
	for(i = 0; i < maxTarg ; i++){
		this.target.push(new MyTarget(this,init_pos_x,init_pos_y,init_pos_z));

		init_pos_x-=3;
		init_pos_z+=0.5;

	}



this.submarineAppearances = [
            this.subAppearance,this.slidesAppearance,this.windowAppearance
        ];


	this.submarine= new MySubmarine(this);
	

	this.w=0;
		

	//get dimensions
	

	// Materials

	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1); //2.9
	this.materialA.setShininess(10);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialC = new CGFappearance(this);
	this.materialC.setAmbient(0.3,0.3,0.3,1);
	this.materialC.setDiffuse(0.6,0.8,0.2,1);
	this.materialC.setSpecular(0.3,0.3,0.3,1);	
	this.materialC.setShininess(10);

	this.torpedoAppearance = new CGFappearance(this);
	this.torpedoAppearance.setAmbient(0.5,0.5,0.5,1);
	this.torpedoAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.torpedoAppearance.setSpecular(0.1,0.1,0.1,1);
	this.torpedoAppearance.setShininess(20);
	this.torpedoAppearance.loadTexture("../resources/images/torpedo.png");

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(1,1,1,1);
	this.floorAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.floorAppearance.setSpecular(1,1,1,1);
	this.floorAppearance.setShininess(100);
	this.floorAppearance.loadTexture("../resources/images/oceano.png");
	this.floorAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.72,0.45,0.2,1);
	this.windowAppearance.setSpecular(0.5,0.5,0.5,0);
	this.windowAppearance.setShininess(120);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.5,0.5,0.5,1);
	this.slidesAppearance.setDiffuse(0.72,0.72,0.72,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");

	this.subAppearance = new CGFappearance(this);
	this.subAppearance.setAmbient(0.5,0.5,0.5,1);
	this.subAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.subAppearance.setSpecular(0.3,0.3,0.3,0);
	this.subAppearance.setShininess(120);
	this.subAppearance.loadTexture("../resources/images/submarino.png");



this.submarineAppearances = [
            this.subAppearance,this.slidesAppearance,this.windowAppearance
        ];


	this.setUpdatePeriod(20);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);  //2.2
	
	// Positions for four lights---------------------------------
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)


	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); //show marker on light position (different from enabled)
	
	
	this.lights[3].setPosition(4, 6, 5, 1);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	

	this.lights[4].setPosition(0, 6, 8, 1);
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)
	


	//LIGHTS SETTINGS
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);//2.8

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);//3.1
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);//3.1
	this.lights[2].setSpecular(1,1,1,1);//3.1

	this.lights[2].setConstantAttenuation(0);//3.2
	this.lights[2].setLinearAttenuation(1);//3.2
	this.lights[2].setQuadraticAttenuation(0);//3.2

	//setConstantAttenuation -> kc //setLinearAttenuation    -> kl 
	//setQuadraticAttenuation  -> kq

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[3].setSpecular(1,1,0,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[4].setSpecular(1,1,1,1);


};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
		
		if(this.Light_0)
		this.lights[0].enable();
		else
		this.lights[0].disable();

		if(this.Light_1)
		this.lights[1].enable();
		else
		this.lights[1].disable();

		if(this.Light_2)
		this.lights[2].enable();
		else
		this.lights[2].disable();

		if(this.Light_3)
		this.lights[3].enable();
		else
		this.lights[3].disable();

		if(this.Light_4)
		this.lights[4].enable();
		else
		this.lights[4].disable();

}



LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();



	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	

//Target
for(i=0; i<this.target.length; i++){
this.pushMatrix();
if(this.target[i].over==0)
	this.target[i].display();

else{
	this.target.splice(i,1);  
	i--;
}

	this.popMatrix();	
}


	//clock
	this.pushMatrix();
	this.translate(8,5,-0.77);
	this.clock.display();
	this.popMatrix();

//coluna1
	this.pushMatrix();
		this.translate(8, 0, -0.1);
		this.scale(2,1.7,0.4);
		this.column.display();
	this.popMatrix();
	


	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(200, 200, 5);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

		// Submarine
	this.pushMatrix();
	this.translate(7.5, 2, 8);
		this.rotate(-180 * degToRad, 0, 1, 0);
		this.submarineAppearances[this.currSubmarineAppearance].apply();
		this.submarine.display();
	this.popMatrix();




	// ---- END Primitive drawing section
};

LightingScene.prototype.update = function(currTime) {
	
		
	if(this.Clock_Working)
	this.clock.update(currTime);


	this.submarine.update(currTime);
	
}

LightingScene.prototype.doSomething = function (){ 
  // console.log("Doing something...")
   };


