/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene,targets) {

	CGFobject.call(this,scene);

	this.body = new MyCylinder(this.scene, 12, 32);
	this.front = new MyLamp(this.scene, 12, 32);
	this.back = new MyLamp(this.scene, 12, 32);
	this.tower = new MyTopCylinder(this.scene, 12, 32);

	this.periscope1 = new MyCylinder(this.scene, 12, 32);
	this.periscope2 = new MyTopCylinder(this.scene, 12, 32);

	this.rotor1 = new MyCylinder(this.scene, 64, 32);
	this.rotor2 = new MyCylinder(this.scene, 64, 32);

	this.helix1 = new MyUnitCubeQuad(this.scene);
	this.helix2 = new MyUnitCubeQuad(this.scene);
	this.helixcenter1 = new MyTopLamp(this.scene, 64, 32);
	this.helixcenter2 = new MyTopLamp(this.scene, 64, 32);

	this.trapvert = new MyTrapeze(this.scene);
	this.traphor = new MyTrapeze(this.scene);
	this.trapmid = new MyTrapeze(this.scene);

	this.deg2rad=Math.PI/180.0;

	this.x = 0;
	this.y = 0;
	this.z = 0;


	this.currTime=0;

	this.ang=0;

	this.speed=0;

	this.predicate = 'z';


	this.peri_y = 1.5;
	this.helix_ang = 0;
	this.leme_ang_vertical = 0;
	this.leme_ang_horizontal = 0;

	

	
	
	this.torpedos = new Array();

	

	this.targets=targets;

	d = new Date();
	this.startTime = d.getTime();
	
};

MySubmarine.prototype = Object.create(CGFobject.prototype);

MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function () {

//Movement
this.scene.pushMatrix();
this.scene.translate(this.x,this.y,this.z);
this.scene.rotate(this.ang*this.deg2rad,0,1,0);


//main cylinder
	this.scene.pushMatrix();
		this.scene.scale(0.365,0.5,4.08);
		this.body.display();
	this.scene.popMatrix();

	//front lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,4.05);
		this.scene.scale(0.365,0.5,0.46);
		this.front.display();
	this.scene.popMatrix();

	//back lamp
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.03);
		this.scene.scale(0.365,0.5,0.46);
		this.scene.rotate(-Math.PI, 0,1,0);
		this.back.display();
	this.scene.popMatrix();

	//mid body vertical cylinder
	this.scene.pushMatrix();
		this.scene.translate(0,1.07,2.5);
		this.scene.scale(0.3,1,0.44);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.tower.display();
	this.scene.popMatrix();


	//vertical periscope1
	this.scene.pushMatrix();
		this.scene.translate(0,this.peri_y,2.7);
		this.scene.scale(0.03,1,0.03);
		this.scene.rotate(Math.PI/2, 1,0,0);
		this.periscope1.display();
	this.scene.popMatrix();

	//horizontal periscope2
	this.scene.pushMatrix();
		this.scene.translate(0,this.peri_y,2.67);
		this.scene.scale(0.03,0.03,0.15);
		this.periscope2.display();
	this.scene.popMatrix();

	//rotor1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0);
		this.scene.scale(0.2,0.2,0.2);
		this.rotor1.display();
	this.scene.popMatrix();

	//rotor2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0);
		this.scene.scale(0.2,0.2,0.2);
		this.rotor2.display();
	this.scene.popMatrix();

	//helix 1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0.1);
		this.scene.rotate(this.helix_ang,0,0,1);
		this.scene.scale(0.06,0.35,0.06);
		this.helix1.display();
	this.scene.popMatrix();

	//helix 2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0.1);
		this.scene.rotate(-this.helix_ang,0,0,1);
		this.scene.scale(0.06,0.35,0.06);
		this.helix2.display();
	this.scene.popMatrix();

	// helix center 1
	this.scene.pushMatrix();
		this.scene.translate(0.52,-0.25,0.13);
		this.scene.scale(0.05,0.05,0.07);
		this.scene.rotate(Math.PI, 0,1,0);
		this.helixcenter1.display();
	this.scene.popMatrix();

	//helix center 2
	this.scene.pushMatrix();
		this.scene.translate(-0.52,-0.25,0.13);
		this.scene.scale(0.05,0.05,0.07);
		this.scene.rotate(Math.PI, 0,1,0);
		this.helixcenter2.display();
	this.scene.popMatrix();
		

	//vertical back trapeze
	this.scene.pushMatrix();
		this.scene.rotate(this.leme_ang_vertical*this.deg2rad,0,1,0);

	this.scene.pushMatrix();
		this.scene.translate(0,0.02,-0.1);
		this.scene.scale(0.08,2.34,0.23);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.trapvert.display();
	this.scene.popMatrix();

	this.scene.popMatrix();


	//horizontal back trapeze
	this.scene.pushMatrix();
		this.scene.rotate(this.leme_ang_horizontal*this.deg2rad,1,0,0);

	this.scene.pushMatrix();
		this.scene.translate(0,0.02,-0.1);
		this.scene.scale(2.34,0.08,0.23);
		this.traphor.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

	//mid trapeze
	this.scene.pushMatrix();
		this.scene.translate(0,0.8,2.5);
		this.scene.scale(1.42,0.04,0.23);
		this.scene.rotate(Math.PI,0,1,0);
		this.trapmid.display();
	this.scene.popMatrix();



	this.scene.popMatrix();

	for(i=0; i<this.torpedos.length; i++){
		this.scene.pushMatrix();
			this.torpedos[i].display();
			//this.torpedos[i].update();
		this.scene.popMatrix();	
	}


};


MySubmarine.prototype.changePredicate = function (x){

	this.predicate = x;

}


MySubmarine.prototype.update = function (currTime) {


var elapsed = (currTime-this.startTime)/1000;

this.startTime = currTime;

if(this.predicate=='w'){
	this.speed = this.speed + 0.5;
	
	
}
	else
	if(this.predicate=='s'){
		this.speed = this.speed - 0.5;
	
	}
	else
	if(this.predicate=='a'){
	this.ang=this.ang + (this.speed*elapsed)*2; //multiply for 2 because it was too slow
	if(this.speed!=0)
	this.leme_ang_vertical = -45;
	}
	
	
	
else
if(this.predicate=='d'){
	this.ang=this.ang - (this.speed*elapsed)*2;
	if(this.speed!=0)
	this.leme_ang_vertical = 45;
}

else
if(this.predicate=='q'){
	this.y = this.y + 0.1;
	this.leme_ang_horizontal = -45;
}

else
if(this.predicate=='e'){
	this.y = this.y - 0.1;
	this.leme_ang_horizontal = 45;
}
	else
if(this.predicate=='p'){
	if(this.peri_y<2)   //2 is max value 
		this.peri_y = this.peri_y + 0.1;
}

else
if(this.predicate=='l'){
	if(this.peri_y>1.10)   //1.10 is min value 
		this.peri_y = this.peri_y - 0.1;
	
}

else
if(this.predicate=='f'){

	for(i = 0; i < this.targets.length; i++){
		if(this.targets[i].destroyed==0){
			var torp = new MyTorpedo(this.scene, this, this.targets[i]);
			this.torpedos.push(torp);
			break;
		}
	}

}

	for(i = 0; i < this.torpedos.length; i++){
		if(this.torpedos[i].t >= 1){
			var j=this.targets.indexOf(this.torpedos[i].target);
			
			this.scene.target.splice(j,1);
			this.torpedos[i].target = null;
			console.log("Torp_x: ",this.torpedos[i].x);	
			console.log("Torp_y: ",this.torpedos[i].y);
			console.log("Torp_z: ",this.torpedos[i].z);		
			this.torpedos.splice(i,1);
			i--;

		}
		else
			this.torpedos[i].update(elapsed);
	}



		
this.z = this.z +  (this.speed*elapsed)*Math.cos(this.ang*this.deg2rad);
this.x = this.x + (this.speed*elapsed)*Math.sin(this.ang*this.deg2rad);



this.helix_ang += elapsed* this.speed * Math.PI * 2;





if(this.predicate!='a' && this.predicate!='d')
this.leme_ang_vertical=0;

if(this.predicate!='q' && this.predicate!='e')
this.leme_ang_horizontal=0;

this.predicate='z';
}

