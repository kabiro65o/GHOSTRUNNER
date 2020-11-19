var gamestate="PLAY";

var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisibleOb,invisibleObGroup;
var ghost,ghostImage;


function preload(){
 
     towerImage=loadImage("tower.png");
     doorImage=loadImage("door.png");
     climberImage=loadImage("climber.png");
     ghostImage=loadImage("ghost-standing.png");

}

function setup (){
 createCanvas(600,600);
    tower =createSprite(300,300,20,600);
    tower.addImage("towerI",towerImage);
    tower.velocityY=2;

    ghost=createSprite(300,300);
    ghost.addImage("ghostcod",ghostImage);
    ghost.scale=0.3;
    

    
    doorGroup= createGroup();
    climberGroup= createGroup();
    invisibleObGroup= createGroup();
}


function draw (){

  
   if(gamestate==="PLAY"){
    if(tower.y>600){
        tower.y=300;
    }
        if(keyDown("SPACE")){
            ghost.velocityY=-3;
          }
          if(keyDown("right")){
           ghost.x=ghost.x+3;
          }
          if(keyDown("left")){
           ghost.x=ghost.x-3;
          }
           ghost.velocityY=ghost.velocityY+0.5;
           
          if(climberGroup.isTouching(ghost)){
            ghost.velocityY=0;
           }
      spawnDoors();   
      
      if(invisibleObGroup.isTouching(ghost) || ghost.y>600){
       ghost.destroy();
       gamestate="END";
      }
      drawSprites();
}
   

  if(gamestate==="END"){
  background("black");
  stroke ("yellow");
  fill ("blue");
  text("GAME:OVER",250,300);
  }

}
  
 


function spawnDoors(){

   if(frameCount%200==0){
     door=createSprite(200,-30);
     door.addImage("doorI",doorImage);
     door.velocityY=2;
     door.x=Math.round(random(120,400));
     door.lifetime=300;
     doorGroup.add(door)

     climber=createSprite(200,-30);
     climber.x=door.x;
     climber.y=door.y+50;
     climber.addImage("climberI",climberImage);
     climber.velocityY=2;
     climber.lifetime=300;
     climberGroup.add(climber);
     ghost.depth=climber.depth+1;

     invisibleOb= createSprite(200,-30,50,10);
     invisibleOb.width=climber.width;
     invisibleOb.x=climber.x;
     invisibleOb.y=climber.y+10;
     invisibleOb.velocityY=2;
     invisibleOb.lifetime=300;
     invisibleObGroup.add(invisibleOb);


   }

}