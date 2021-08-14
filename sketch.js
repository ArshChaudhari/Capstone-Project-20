
var battleplane, battleplaneA;
var moth, mothA;
var bee, beeI;
var fire, fireI;
var dart, dartI;
var bird, birdI;

var coin, coinI;

var apple, appleI;

var start, startI;
var gameover, gameoverI;
var restart, restartI;

var backgroundsprite, backgroundI;

var Start = 1 ;
var Play = 2;
var End = 0;
var gamestate = 1;

var diesound1;
var diesound2;
var coinsound;

var edges;

var score = 0;
var coincount = 0;
 
var battleplanegroup, mothgroup;
var beegroup, firegroup, dartgroup, birdgroup;
var coingroup;


function preload(){

 backgroundI = loadImage("background.png");

 battleplaneA = loadAnimation("sc 1.png","sc 2.png","sc 3.png");
 mothA = loadAnimation("moth1.png","moth2.png");

 beeI = loadImage("bee.png");
 dartI = loadImage("dart.png");
 birdI = loadImage("bird.png");
 fireI = loadImage("fire.png");

 coinI = loadImage("coin.png");

 appleI = loadImage("apple.png");

 startI = loadImage("start.png");
 gameoverI = loadImage("gameover.png");
 restartI = loadImage("restart.png");

 coinsound = loadSound("coinsound.wav");
 diesound1 = loadSound("diesound1.mp3");
 diesound2 = loadSound("diesound2.mp3");
}

function setup() {
 createCanvas(600,500);
 
 backgroundsprite = createSprite(width/2,450);
 backgroundsprite.addImage(backgroundI);

 backgroundsprite.scale = 1.5;
  
 apple = createSprite(width/2,200);
 apple.addImage(appleI);
 apple.scale = 0.1;
  
 //apple.debug = true
 apple.visible = false;
  
 battleplanegroup = new Group();
 mothgroup = new Group();
 
 beegroup = new Group();
 firegroup = new Group();
 dartgroup = new Group();
 birdgroup = new Group();
 
 coingroup = new Group();
 
 start = createSprite(300,400);
 start.addImage(startI);
 
 restart = createSprite(300,350);
 restart.addImage(restartI);
 
 restart.visible = false;
 restart.scale = 0.1;

 gameover = createSprite(300,200);
 gameover.addImage(gameoverI);
 
 gameover.scale = 0.7;
 gameover.visible = false;
}

function draw() {
  background("white");
  
  drawSprites();

 if(gamestate == 1){  
  start.visible = true;
   
  if(mousePressedOver(start)){
    gamestate = 2
  }

   fill("maroon");
   textSize(20);
   text("Welcome! In this game you can move the apple with your mouse. Try to collect as many coins as possible, dodging the bees, birds, darts, fire, planes and moths. Click on start to play the game. Later you can click on restart to play it again. Enjoy the game!",150,155,360,200); 
 }

 if(gamestate == 2){
  backgroundsprite.velocityY = -7

  apple.visible = true;
  start.visible = false;

  if(backgroundsprite.y<75){
    backgroundsprite.y = 450;
  }

  apple.x = World.mouseX;
  apple.y = World.mouseY;

  edges = createEdgeSprites();
  apple.collide(edges);

  spawnmoths();
  spawnbattleplanes();

  spawnbirds();
  spawndarts();
  spawnbees();
  spawnfire()

  spawncoins();
 
  if(apple.isTouching(coingroup)){
    coingroup.destroyEach();
    coincount = coincount+1;
    coinsound.play();
  }
 
  if(apple.isTouching(birdgroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  if(apple.isTouching(firegroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  if(apple.isTouching(dartgroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  if(apple.isTouching(beegroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  if(apple.isTouching(mothgroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  if(apple.isTouching(battleplanegroup)){
    gamestate = 0;
    diesound1.play();
    diesound2.play();
  }
 
  fill("black");
  textSize(25);
  text("Score: " + score, 230, 30);
  text("Coins: " + coincount, 230, 60);
 
  score = score + Math.round(getFrameRate()/60);
 }

 if(gamestate == 0){
  backgroundsprite.velocityY = 0;
   
  mothgroup.destroyEach();
  battleplanegroup.destroyEach();

  beegroup.destroyEach();
  birdgroup.destroyEach();
  dartgroup.destroyEach();
  firegroup.destroyEach();

  coingroup.destroyEach();

  apple.visible = false;

  gameover.visible = true;
  restart.visible = true;

  if(mousePressedOver(restart)){
    reset();
  }

  fill("black");
  textSize(25);
  text("Score: " + score, 230, 30);
  text("Coins: " + coincount, 230, 60);
 }
}

function spawnmoths(){
 var selectmoth = Math.round(random(100,500));

 if(frameCount % 355 == 0){
  moth = createSprite(selectmoth,520);
  moth.addAnimation("mothobstacle",mothA);
  moth.scale = 0.1;

  moth.velocityY = -8;
  moth.lifetime = 100;
  mothgroup.add(moth);
 }
}

function spawnbattleplanes(){
  var selectbattleplanes = Math.round(random(100,500));
 
  if(frameCount % 620 == 0){
   battleplane = createSprite(selectbattleplanes,520);
   battleplane.addAnimation("battleplaneobstacle",battleplaneA);
   battleplane.scale = 0.7;
 
   battleplane.velocityY = -10;
   battleplane.lifetime = 80;
   battleplanegroup.add(battleplane);
  }
}

function spawnbirds(){
  var selectbird = Math.round(random(40,460));
 
  if(frameCount % 192 == 0){
   bird = createSprite(-20,selectbird);
   bird.addImage("birdobstacle",birdI);
   bird.scale = 0.2;
 
   bird.velocityX = 8;
   bird.lifetime = 100;
   birdgroup.add(bird);
  }
}

function spawndarts(){
  var selectdarts = Math.round(random(40,460));
 
  if(frameCount % 116 == 0){
    dart = createSprite(-20,selectdarts);
    dart.addImage("dartobstacle",dartI);
    dart.scale = 0.1;
 
    dart.velocityX = 20;
    dart.lifetime = 100;
    dartgroup.add(dart);
  }
}

function spawnbees(){
  var selectbees = Math.round(random(40,460));
  
  if(frameCount % 263 == 0){
    bee = createSprite(620,selectbees);
    bee.addImage("beeobstacle",beeI);
    bee.scale = 0.5;
 
    bee.velocityX = -10;
    bee.lifetime = 100;
    beegroup.add(bee);
  }
}

function spawnfire(){
  var selectfire = Math.round(random(100,500));
 
  if(frameCount % 922 == 0){
   fire = createSprite(selectfire,-50);
   fire.addImage("fireobstacle",fireI);
   fire.scale = 0.25;
 
   fire.velocityY = 25;
   fire.lifetime = 100;
   firegroup.add(fire);
  }
}

function spawncoins(){
  var selectcoin = Math.round(random(100,500));
 
  if(frameCount % 80 == 0){
   coin = createSprite(selectcoin,520);
   coin.addImage("coinobstacle",coinI);
   coin.scale = 0.3;
 
   coin.velocityY = -7;
   coin.lifetime = 100;
   coingroup.add(coin);
  }
}

function reset(){
  gamestate = 2;
  
  score = 0;
  coincount = 0;
  
  gameover.visible = false;
  restart.visible = false;
}

