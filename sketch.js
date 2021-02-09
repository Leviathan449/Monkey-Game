var jungle;
 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var survivalTime=0;

function preload(){
  
  jungleImage = loadImage("jungle.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

 
}



function setup() {
  createCanvas(600, 200);

  jungle = createSprite(600,200);
  jungle.addImage("jungle", jungleImage);
  jungle.x = jungle.width/1;
  jungle.velocityX = -2;
  
  monkey = createSprite(50,145,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,187, 400,10);
  ground.x = ground.width /2;
  ground.visible = false;
  
  
 
   invisibleGround = createSprite(200,190,400,10);
   invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  
   
  if (jungle.x < 0) {
 jungle.x = jungle.width /1;
  }
    
    console.log(monkey.y)
  
  if (gameState===PLAY){
  
    if(keyDown("space") && monkey.y >= 153) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   monkey.collide(invisibleGround);
   spawnFood();
   spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
  
  }
  else if(gameState === END){
    monkey.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
 
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survivial Time"+ survivalTime, 400, 50);
  
  
  
  drawSprites();
  

}



function spawnFood() {
  if (frameCount % 60 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(80,120));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     
    food.lifetime = 300;
    
    
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    foodGroup.add(food);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    
    
    //generate random obstacles
    //var rand = Math.round(random(1,2));
    //switch(rand) {
      //case 1: obstacle.addImage(obstacleImage);
      //        break;
      //case 2: obstacle.addImage(obstacleImage);
      //        break;
      //default: break;
    //}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



