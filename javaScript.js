
let score = 0;
const width = 100;
const height = 100;
const lengthArrai = 8;
const deleteNumber = 10;
const foodUpgrade = 2;
const emptyNumber = 0;
const playerNumber = 1;
const foodNumber = 2;
const obstacleNumber = 3;
const specialBananaNumber = 4;
const timerSpecialFood = 5000;

let gamePanel,horsex,horsey,cursorX,cursorY;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const horseMovArray = [ [2,-1],[2,1],[-2,-1],[-2,1],[1,2],[1,-2],[-1,2],[-1,-2] ];
const horseMovArray2 = [ [-1,2],[1,2],[-1,-2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1] ];


document.addEventListener('click', MovementPlayer);

CreateTable();
createArray();

function StartGame(){
  // musicadefondo.play();
  createArray();
  CreateTable();
  resetArray();
  PutPlayer();
  ReadArray();
  PutBandera(foodNumber);
  document.getElementById("score").innerHTML = "Score:"+score;
}

function DeleteObstacle (delNumber){
  let cont = 0;

  let xNumber;
  let yNumber;

  for (var i = 0; i < gamePanel[0].length; i++) {
    for (var u = 0; u < gamePanel[0].length; u++) {
      if (gamePanel[i][u] == obstacleNumber) {
        cont++;
      }
    }
  }

  while(true){
    xNumber= Math.floor(Math.random()*gamePanel.length);
    yNumber= Math.floor(Math.random()*gamePanel.length);

    if (gamePanel[yNumber][xNumber] == obstacleNumber) {
      gamePanel[yNumber][xNumber] = emptyNumber;
      delNumber--;
      cont--;
    }
    if (cont == 0 || delNumber == 0) {
      break;
    }
  }
}

function PutSpecialFood (){
  const coordFood = PutBandera(specialBananaNumber);
  ReadArray();
  const myTimeout = setTimeout(DeleteSpecialFood, timerSpecialFood);

  function DeleteSpecialFood() {
    if (gamePanel[coordFood[0]][coordFood[1]] == specialBananaNumber) {
      gamePanel[coordFood[0]][coordFood[1]] = emptyNumber;
      CreateTable();
      ReadArray();
    }

  }
}




function CreateTable(){
  let b = -1;

  for (var i=0; i<lengthArrai; i++){
    b=b * -1;
    for (var j=0; j<lengthArrai; j++) {
      if (b == 1){ctx.fillStyle = "#000000";
      }else{ctx.fillStyle = "#FFFFFF";}
      ctx.fillRect(j*width, i*height , width, height);
      b=b * -1;
    }
  }
}

function createArray(){
  gamePanel = new Array(lengthArrai);

  for (i=0; i<lengthArrai; i++) {
    gamePanel[i]= new Array (lengthArrai);
  }
}

function resetArray(){
  for (i=0;i<lengthArrai;i++) {
    for(j=0;j<lengthArrai;j++) {
      gamePanel[i][j]=0;
    }
  }
}

function ReadArray() {

  for (var i=0;i<lengthArrai;i++) {
    for (var j=0;j<lengthArrai;j++) {

      if (gamePanel[i][j] == playerNumber){
        ctx.drawImage(player,j*width,i*height,width,height);

      }else if (gamePanel[i][j] == foodNumber)	{
        ctx.drawImage(food,j*width,i*height,width,height);

      }else if (gamePanel[i][j] == obstacleNumber)	{
        ctx.drawImage(obstacle,j*width,i*height,width,height);

      }else if (gamePanel[i][j] == specialBananaNumber)	{
        ctx.drawImage(specialBanana,j*width,i*height,width,height);
      }
  }
}

positionAvaiable();
}


function PutPlayer(){

  horsex=Math.floor(Math.random()*lengthArrai);
  horsey=Math.floor(Math.random()*lengthArrai);

  while (gamePanel[horsey][horsex] != emptyNumber){

    horsex=Math.floor(Math.random()*lengthArrai);
    horsey=Math.floor(Math.random()*lengthArrai);

  }
    gamePanel[horsey][horsex] = playerNumber	;
    ReadArray();
}

function PutBandera(typeFood){
    let banderaX=Math.floor(Math.random()*lengthArrai);
    let banderaY=Math.floor(Math.random()*lengthArrai);

    while (gamePanel[banderaX][banderaY] != emptyNumber){

    banderaX=Math.floor(Math.random()*lengthArrai);
    banderaY=Math.floor(Math.random()*lengthArrai);

  }
    gamePanel[banderaY][banderaX] = typeFood;
    ReadArray();
    return [banderaY, banderaX];
   }

   function positionAvaiable(){

     try{
       if(gamePanel[horsey-1][horsex+2] == emptyNumber || gamePanel[horsey-1][horsex+2] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
         ctx.lineWidth = "6";
         ctx.strokeStyle = "green";
         ctx.strokeRect((horsex+2)*width,(horsey-1)*height,width,height);}
     }catch(e){
       console.log(e.message);
     }

     try{
       if(gamePanel[horsey+1][horsex+2] == emptyNumber || gamePanel[horsey+1][horsex+2] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
         ctx.lineWidth = "6";
         ctx.strokeStyle = "green";
         ctx.strokeRect((horsex+2)*width,(horsey+1)*height,width,height);}
     }catch(e){
       console.log(e.message);
     }
     try{

     if(gamePanel[horsey-1][horsex-2] == emptyNumber || gamePanel[horsey-1][horsex-2] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
       ctx.lineWidth = "6";
       ctx.strokeStyle = "green";
       ctx.strokeRect((horsex-2)*width,(horsey-1)*height,width,height);}
    }catch(e){
      console.log(e.message);
    }
    try{

    if(gamePanel[horsey+1][horsex-2] == emptyNumber || gamePanel[horsey+1][horsex-2] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";
      ctx.strokeRect((horsex-2)*width,(horsey+1)*height,width,height);}
    }catch(e){
      console.log(e.message);
    }
    try{
    if(gamePanel[horsey-2][horsex+1] == emptyNumber || gamePanel[horsey-2][horsex+1] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";
      ctx.strokeRect((horsex+1)*width,(horsey-2)*height,width,height);}
    }catch(e){
      console.log(e.message);
    }

    try{
      if(gamePanel[horsey-2][horsex-1] == emptyNumber || gamePanel[horsey-2][horsex-1] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
        ctx.lineWidth = "6";
        ctx.strokeStyle = "green";
        ctx.strokeRect((horsex-1)*width,(horsey-2)*height,width,height);}
      }catch(e){
        console.log(e.message);
    }

    try{
    if(gamePanel[horsey+2][horsex+1] == emptyNumber || gamePanel[horsey+2][horsex+1] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";
      ctx.strokeRect((horsex+1)*width,(horsey+2)*height,width,height);}
    }catch(e){
      console.log(e.message);
    }

    try{
    if(gamePanel[horsey+2][horsex-1] == emptyNumber || gamePanel[horsey+2][horsex-1] == foodNumber || gamePanel[horsey-1][horsex+2] == specialBananaNumber){
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";
      ctx.strokeRect((horsex-1)*width,(horsey+2)*height,width,height);}
    }catch(e){
      console.log(e.message);
    }
  }


function MovementPlayer(){

  const rect = canvas.getBoundingClientRect();
  cursorY = Math.floor((event.clientY - rect.top)/width);
  cursorX = Math.floor((event.clientX - rect.left)/width);

  const ignoreClickOnMeElement = document.getElementById('gameCanvas');

  document.addEventListener('click', function(event) {
      const isClickInsideElement = ignoreClickOnMeElement.contains(event.target);

      if (isClickInsideElement) {
        if (gamePanel[cursorY][cursorX] != obstacleNumber || gamePanel[cursorY][cursorX] == null ){
          for (var i = 0; i < horseMovArray.length; i++) {
            if (cursorX == horsex + horseMovArray[i][0]  &&  cursorY == horsey +horseMovArray[i][1]){

              MovementFood(cursorX, cursorY);
              gamePanel[cursorY][cursorX]=playerNumber;
              gamePanel[horsey][horsex]=emptyNumber;
              horsex += horseMovArray[i][0];
              horsey += horseMovArray[i][1];
              CreateTable();
              PutObstacle();
              efecto2.play();
              ReadArray();
              break;
            }
          }
        }
      }
  });
}

function PutObstacle(){

    let wardx=Math.floor(Math.random()*lengthArrai);
    let wardy=Math.floor(Math.random()*lengthArrai);

    while (gamePanel[wardx][wardy] != emptyNumber){

    wardx=Math.floor(Math.random()*lengthArrai);
    wardy=Math.floor(Math.random()*lengthArrai);

  }
    gamePanel[wardx][wardy]= obstacleNumber ;
}




function MovementFood(){

  if (gamePanel[cursorY][cursorX] == foodNumber){
      efecto1.play();
      PutBandera(foodNumber);
      score++;

      if (score % foodUpgrade == 0){
        PutSpecialFood();
      }

      document.getElementById("score").innerHTML = "Score " + score;

  }else if (gamePanel[cursorY][cursorX] == specialBananaNumber){
    DeleteObstacle(deleteNumber);
    score+=5;
  }

}

  musicadefondo = new sound("gato.mp3");
  efecto1 = new sound("crack.mp3");
  efecto2 = new sound("salto.wav");
  efecto3 = new sound("pujarnivell.wav");


function sound(src) {

  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";

  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }

  this.stop = function(){
    this.sound.pause();
  }
}
