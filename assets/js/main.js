window.onload = () => {

//create a date reference for all animation and setting timing
const lifeOfTree = new Date();

//grow the tree
//for every day of life, the tree grows by 1 pixel upwards from it's start
//for every month of life, the tree starts two new branches to the sides of the apex and continues onward
//prepare to have trunks, branches, and leaves

class Branch{
    constructor(
        x, 
        y, 
        approximateLength, 
        thicknessOfBranch, 
        daysAlive, 
        context, 
        howMany,
        colorValue
        ){
        this.x = x;
        this.y = y;
        this.thicknessOfBranch = thicknessOfBranch;
        this.approximateLength = approximateLength;
        this.destinationXa;
        this.destinationYa;
        this.destinationXb;
        this.destinationYb;
        
        this.daysAlive = daysAlive;
        this.context = context
        this.manyTimes = howMany;

        this.branchColor = colorValue;
    }

    grow(){
        this.context.lineWidth = this.thicknessOfBranch;
        this.destinationXa = this.x - 10;
        this.destinationYa = this.y - this.approximateLength;
        this.destinationXb = this.x + 10;
        this.destinationYb = this.y - this.approximateLength;
        
        let centerBranchY = this.y - 20;
        
        this.context.beginPath();

        this.context.lineWidth = this.thicknessOfBranch;
        this.context.strokeStyle = this.branchColor;
        this.context.lineCap = 'rounded';
        this.context.lineJoin = 'rounded';

        this.context.shadowColor = 'black';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 3;

        this.context.moveTo(this.x, this.y);
        
        this.context.lineTo(this.destinationXa, this.destinationYa);
        this.context.moveTo(this.x, this.y);

        this.context.lineTo(this.destinationXb, this.destinationYb);
        this.context.moveTo(this.x, this.y);
        
        this.context.lineTo(this.x, centerBranchY);
        this.context.stroke();
    
        this.leaf(this.destinationXa, this.destinationYa, 4);
        this.leaf(this.x, centerBranchY, 5);
        this.leaf(this.destinationXb, this.destinationYb, 4);
    
        this.context.closePath();
        
        if(this.manyTimes--){
            new Branch(
                this.destinationXa - 5, 
                this.destinationYa - 2,
                this.approximateLength + 7,
                this.thicknessOfBranch - 2,
                this.daysAlive,
                this.context,
                this.manyTimes,
                this.branchColor
            ).grow();
            
            new Branch(
                this.x,
                this.centerBranchY,
                20,
                this.thicknessOfBranch,
                this.daysAlive,
                this.context,
                this.manyTimes,
                this.branchColor
            ).grow();
            
            new Branch(
                this.destinationXb + 5,
                this.destinationYb - 2,
                this.approximateLength + 7,
                this.thicknessOfBranch - 2,
                this.daysAlive,
                this.context,
                this.manyTimes,
                this.branchColor
            ).grow();
        }
        
    }

    leaf(x,y, size){
        
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.moveTo(x, y);

        this.context.arc(x,y, size, 0, Math.PI * 2, true);
        
        this.context.closePath();
        this.context.fill(); 
    }
}

const today = new Date();
const todayUTC = today.getTime();
const planted = new Date(2021, 11, 16);
const plantedUTC = planted.getTime();
const then = todayUTC - plantedUTC;
const daysAlive = then / (60 * 60 * 24 * 1000);
const yearsAlive = Math.ceil(daysAlive / 365);

//set canvas
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight + daysAlive;
canvas.style.zIndex = 200;

canvas.style.position = 'absolute';
canvas.style.bottom = '0px';

const stage = document.getElementById('stage');
stage.style.zIndex = 200;
stage.appendChild(canvas);

const context = canvas.getContext('2d');

let spin = 1;

function animate(){
    context.clearRect(0,0, window.innerWidth, window.innerHeight);

    new Branch(
        window.innerWidth / 2, 
        window.innerHeight - 0,
        daysAlive, 
        8, 
        daysAlive, 
        context, 
        yearsAlive,
        `hsl(${spin++}, 100%, 50%)`
        ).grow();
    
    requestAnimationFrame(animate);
}
animate();

};