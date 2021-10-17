//create sprites
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var zombieGroup;
var heart1,heart2,heart3, heart1Img, heart2Img, heart3Img
var shooterImg, shooter_shooting
var bullets=70
var gameState="fight"
var bullet, bulletImg
//upload images
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg=loadImage("assets/zombie.png")
  heart1Img=loadImage("assets/heart_1.png")
  heart2Img=loadImage("assets/heart_2.png")
  heart3Img=loadImage("assets/heart_3.png")
  
}

function setup() {

 //canvas size 
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1=createSprite(displayWidth-150, 40,20, 20)
   heart1.addImage(heart1Img)
   heart1.scale=0.4
   heart2=createSprite(displayWidth-150, 40,20, 20)
   heart2.addImage(heart2Img)
   heart2.scale=0.4
   heart3=createSprite(displayWidth-150, 40,20, 20)
   heart3.addImage(heart3Img)
   heart3.scale=0.4
   heart1.visible=false
   heart2.visible=false
   heart3.visible=false

zombieGroup=new Group();
bulletGroup=new Group();

}
//background color
function draw() {
  background(0); 
//play game when gamestate is fight
if(gameState==="fight"){



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150, player.y-30,20,10)
 bullet.velocityX=20
 bulletGroup.add(bullet)
 player.depth=bullet.depth
 player.depth=player.depth+2
  player.addImage(shooter_shooting)
 bullets=bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets===0){
  gameState="bullet";
}
//destroy bullet and zombie when they touch
if(zombieGroup.isTouching(bulletGroup)){
  
  for(var i=0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
}
if(zombieGroup.isTouching(player)){
  
  for(var i=0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  }
}
spawnZombies()
}
//display messgages when win, lose, or run out of bullets
if(gameState==="lost"){
  textSize(100)
  fill("red")
  text("You Lost", 400,400)
  zombieGroup.destroyEach()
  player.destroy();
}
else if(gameState==="won"){
  textSize(100)
  fill("yellow")
  text("You won", 400,400)
  zombieGroup.destroyEach()
  player.destroy();
}
else if(gameState===bullet){
  textSize(50)
  fill("yellow")
  text("You ran out of bullets", 470,410)
  zombieGroup.destroyEach()
  player.destroy();
  bulletGroup.destroyEach()
}
//draw the sprites
drawSprites();

}
function spawnZombies(){
if (frameCount % 50 === 0){
  zombies=createSprite(random(500,1100),random(100,500), 10, 10)
  zombies.velocityX=-3
  //zombies.y=Math.round(random(10,100))
  zombies.addImage(zombieImg)
  zombies.scale=0.15
  zombies.debug=true
  zombies.setCollider("rectangle",0,0,400,400)
  zombieGroup.add(zombies);
}
}