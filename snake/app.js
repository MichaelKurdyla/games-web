
const map = document.querySelector(".map");
var context = map.getContext('2d');
var scoreText = document.querySelector('.Score')
var score = 0;

var grid = 10;
var count = 0;

var snake = {x: 160, y: 160, vx: grid, vy: 0, body: [], length: 4};

var apple = {x: 300, y: 300};

function randInt(max, min){
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game(){
  requestAnimationFrame(Game);

  if (++count < 12 - (score*0.2 < 8 ? score*0.2 : 8 )){
    return;
  }

  count = 0;
  context.clearRect(0,0,map.width, map.height);

  snake.x += snake.vx;
  snake.y += snake.vy;

  //bound check

  if(snake.x < 0){
    snake.x = map.width - grid;
  }else if(snake.x >= map.width){
    snake.x = 0;
  }

  if(snake.y < 0){
    snake.y = map.height - grid;
  }else if(snake.y >= map.height){
    snake.y = 0;
  }


  snake.body.unshift({x: snake.x, y: snake.y});

  if (snake.body.length > snake.length){
    snake.body.pop();
  }


context.fillStyle = 'red';

context.fillRect(apple.x, apple.y, grid-1, grid-1);

context.fillStyle = 'green';

snake.body.forEach(function(cell, index) {
  context.fillRect(cell.x, cell.y, grid-1, grid-1);

  if (cell.x === apple.x && cell.y === apple.y){
    snake.length++;
    score++;
    var text = "Score: " + score;
    scoreText.innerText = text;
    apple.x = randInt(0, 25) * grid;
    apple.y = randInt(0, 25) * grid;
  }

  for(var i = index + 1; i < snake.body.length; i++){
    if (cell.x === snake.body[i].x && cell.y === snake.body[i].y){
      snake.x = 160;
      snake.y = 160;
      snake.body = [];
      snake.cells = [];
      snake.length = 4;
      snake.vx = grid;
      snake.vy = 0;
      score = 0;
      scoreText.innerText = "Score: 0"
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
  }
});
}

document.addEventListener('keydown', function(e) {
  // left arrow key
  if (e.which === 37 && snake.vx === 0) {
    snake.vx = -grid;
    snake.vy = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.vy === 0) {
    snake.vy = -grid;
    snake.vx = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.vx === 0) {
    snake.vx = grid;
    snake.vy = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.vy === 0) {
    snake.vy = grid;
    snake.vx = 0;
  }
});
requestAnimationFrame(Game);
