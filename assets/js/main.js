window.onload = () => {

//load images needed
const bird = document.createElement('img');
const children = document.createElement('img');
const daySky = document.createElement('img');
const leaf = document.createElement('img');
const moon = document.createElement('img');
const nightSky = document.createElement('img');
const summerGround = document.createElement('img');
const sun = document.createElement('img');
const winterGround = document.createElement('img');

bird.src = './assets/img/bird.png';
children.src = './assets/img/children.png';
daySky.src = './assets/img/daySky.png';
leaf.src = './assets/img/leaf.png';
moon.src = './assets/img/moon.png';
nightSky.src = './assets/img/nightSky.png';
summerGround.src = './assets/img/summerGround.png';
sun.src = './assets/img/sun.png';
winterGround.src = './assets/img/winterGround.png';

document.body.append(bird);
document.body.append(children);
document.body.append(daySky);
document.body.append(leaf);
document.body.append(moon);
document.body.append(nightSky);
document.body.append(summerGround);
document.body.append(sun);
document.body.append(winterGround);

const allImages = Array.from(document.images);
allImages.forEach((element, index, originalImages) => {
    element.style.display = 'none';
    element.style.zIndex = 0;
});

//create a date reference for all animation and setting timing
const lifeOfTree = new Date();

//get setting time of day or night
//imprint a ratio of day over night
//essentially the closer to midnight, the closer night is to full opacity
//the closer to noon, the closer to a full opacity day
let midnightNoonRatio = lifeOfTree.getHours() / 12;
if(midnightNoonRatio < 0.6 || midnightNoonRatio > 1.6 ){
    //put the night sky on top of day sky with opacity subtracted when waning away from 1
    daySky.style.display = 'block';
    daySky.style.position = 'absolute';
    daySky.style.bottom = '0px';
    daySky.style.opacity = midnightNoonRatio;
    nightSky.style.display = 'block';
    nightSky.style.position = 'absolute';
    nightSky.style.bottom = '0px';
    nightSky.style.opacity = midnightNoonRatio / 2;

    //now here comes the sun
    sun.style.display = 'block';
    sun.style.position = 'absolute';
    sun.style.top = '3em';
    sun.style.left = '3em';
    
}else{
    //put the day sky on top of night with opacity subtracted when waning away from 0
    daySky.style.display = 'block';
    daySky.style.position = 'absolute';
    daySky.style.bottom = '0px';
    daySky.style.opacity = midnightNoonRatio / 4;
    nightSky.style.display = 'block';
    nightSky.style.position = 'absolute';
    nightSky.style.bottom = '0px';
    nightSky.style.opacity = midnightNoonRatio;

    //now here comes the moon
    moon.style.display = 'block';
    moon.style.zIndex = 3;
    moon.style.position = 'absolute';
    moon.style.top = '3em';
    moon.style.left = '3em';
}

//grow the tree
//for every day of life, the tree grows by 1 pixel upwards from it's start
//for every month of life, the tree starts two new branches to the sides of the apex and continues onward
//prepare to have trunks, branches, and leaves

class Branch{
    constructor(x,y,length, thicknessOfBranch, daysAlive){
        this.x = x;
        this.y = y;
        this.length = length;
        this.thicknessOfBranch = thicknessOfBranch;
        this.destinationX;
        this.destinationY;
        this.daysAlive = daysAlive;
    }

    grow(howFar){
        context.moveTo(this.x, this.y);
        context.strokeStyle = `${this.thicknessOfBranch--}px solid`;
        context.beginPath();
        this.destinationXa = this.x - 5;
        this.destinationYa = this.y - 10;
        this.destinationXb = this.x + 5;
        this.destinationYb = this.y + 10;
        context.lineTo(this.destinationXa, this.destinationYa);
        context.moveTo(this.x, this.y);
        context.lineTo(this.destinationXb, this.destinationYb);
        context.stroke();
        //if(daysAlive % 5 == 0){
            new Branch(this.destinationXa, this.destinationYa);
            new Branch(this.destinationXb, this.destinationYb);
        //}
        
    }
}

//set canvas
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.zIndex = 2;

document.getElementById('stage').appendChild(canvas);

const context = canvas.getContext('2d');

const today = new Date().getTime();
const planted = new Date(2021, 11, 16).getTime();
const then = today - planted;
const daysAlive = then / (60 * 60 * 24 * 1000);

if(daysAlive){
    new Branch().grow();
}


//based upon the day of the year
//the closer to the summer solstice, the more opacity the green grass
//the closer to the winter solstice, the more opacity to snow
const month = lifeOfTree.getMonth();
if(month < 6 || month > 2){
    winterGround.style.display = 'block';
    winterGround.style.position = 'absolute';
    winterGround.style.bottom = '0px';
}else{
    summerGround.style.display = 'block';
    summerGround.style.position = 'absolute';
    summerGround.style.bottom = '0px';
}

//upon recess time
//children play
const day = lifeOfTree.getDay();
if(day == 0 || day == 6){
    children.style.display = 'block';
    children.style.position = 'absolute';
    children.style.left = '3rem';
    children.style.bottom = '2em';
}

//randomly scroll bird across stage
function flyflyBird(){
    bird.style.display = 'block';
    bird.style.position = 'absolute';
    bird.style.top = (Math.sin(lifeOfTree.getSeconds()) * 20) + 'px';
    bird.style.left += 1;
}
//except in the winter
if(lifeOfTree.getMonth() < 2 || lifeOfTree.getMonth() > 6){
    Math.random() < 0.01 ? setInterval(flyflyBird, 25) : false;
}

};