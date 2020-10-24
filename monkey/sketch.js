
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,400);

 
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("moving", monkey_running);
 
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1300,10); 
  ground.x = ground.width /3;
  
  //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("circle");
  monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("survival time: "+ score, 400,50);
  
  
 
     monkey.collide(ground)
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/3;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnbanana();
  
    spawnObstacle();
    
    if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score=+3;
      
      
    }
      
      
      
      
   if(obstacleGroup.isTouching(monkey)){
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0); 
     
    }
  

  drawSprites();
}



function spawnObstacle(){
 if (frameCount % 60 === 0){
    var obstacle = createSprite(600,328,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(170,270));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each Food to the group
    FoodGroup.add(banana);
  }
}
