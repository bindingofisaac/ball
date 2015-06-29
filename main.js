var width, height, canvas, ctx, runner = false;

var ball = {
    pos: {
        x: 100,
        y: 700 
    },
    vel: {
        x: 5,
        y: -10
    },
    acc: {
        x: 0,
        y: 9.81
    },
    restitution: -0.5,
    radius: 25
};

var mouse = {
    x: 0, y: 0, isDown: false
};

function setup(){
    canvas = document.getElementById("c"),
    ctx    = canvas.getContext("2d");
    width  = window.innerWidth;
    height = window.innerHeight;
    runner = setInterval(draw, 1000/60);

    canvas.width  = width;
    canvas.height = height;

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup   = mouseUp;
}

function getMousePosition(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function mouseDown(e){
    if(e.which == 1){
        getMousePosition(e);
        mouse.isDown = true;
        ball.vel.x = ball.vel.y = 0;
        ball.acc.x = ball.acc.y = 0;
        ball.radius = 25;
    }
}

function mouseUp(e){
    if(e.which == 1){
        mouse.isDown = false;
        ball.vel.y = -1*(ball.pos.y - mouse.y) / 10;
        ball.vel.x = -1*(ball.pos.x - mouse.x) / 10;
        ball.acc.y = 9.81;
    }
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();

    if(mouse.isDown){
        ctx.beginPath()
        ctx.moveTo(ball.pos.x, ball.pos.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
    }

    update();
}

function update(){
    ball.vel.x += ball.acc.x/60;
    ball.vel.y += ball.acc.y/60;

    ball.pos.x += ball.vel.x*100/60;
    ball.pos.y += ball.vel.y*100/60;

    if (ball.pos.y > height - ball.radius) {
         ball.vel.y *= ball.restitution;
         ball.pos.y = height - ball.radius;
    }
    if (ball.pos.y < ball.radius){
        ball.vel.y *= ball.restitution;
        ball.pos.y = ball.radius;
    }
    if (ball.pos.x > width - ball.radius) {
         ball.vel.x *= ball.restitution;
         ball.pos.x = width - ball.radius;
    }
    if (ball.pos.x < ball.radius) {
         ball.vel.x *= ball.restitution;
         ball.pos.x = ball.radius;
    }
}

setup();
