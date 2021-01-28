var balloon, backgroundImg, balloonImg, database, balloonHeight, height;

function preload()
{
  backgroundImg = loadImage("hotAirBalloon-background.png");
  balloonImg = loadAnimation("hotAirBalloon-01.png", "hotAirBalloon-02.png", "hotAirBalloon-03.png");
}

function setup() 
{
  database = firebase.database();
  createCanvas(1366, 655);
  balloon = createSprite(250, 400, 50, 50);
  balloon.addAnimation("balloon image", balloonImg);
  balloon.scale = 0.5;
  balloonHeight = database.ref("balloon/height");
  balloonHeight.on("value", readHeight, showError);
}

function draw() 
{
  background(backgroundImg);
  if(keyDown(LEFT_ARROW)) updateHeight(-10, 0);
  else if(keyDown(RIGHT_ARROW)) updateHeight(10, 0);
  else if(keyDown(UP_ARROW)) 
  {
    updateHeight(0, -10);
    balloon.scale = balloon.scale + 0.01;
  }  
  else if(keyDown(DOWN_ARROW)) 
  {
    updateHeight(0, 10);
    balloon.scale = balloon.scale - 0.01;
  }  

  drawSprites();
  fill("maroon");
  textFont("Lucida Calliigraphy");
  textSize(40);
  strokeWeight(2);
  stroke("black");
  text("Use the Arrow Keys to move the Hot Air Balloon !!", 210, 40);
}

function readHeight(data)
{
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
  console.log("Error in writing to the database");
}
function updateHeight(x, y)
{
    database.ref("balloon/height").set({'x': height.x + x, 'y': height.y + y});
}