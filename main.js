let squareDimention = window.innerHeight / 8;
let halfSquare = squareDimention/2;
let spriteSheet;
let sprites = {};

function parseBool(bool){
    if(bool){
        return "true";
    }
    return "false";
}

function bc(v){
    if(v>7){
        return 7;
    }
    if(v<0){
        return 0;
    }
    return v
}

class Piece{

    constructor(x,y,type, team){
        this.x=x;
        this.y=y;
        this.type=type;
        this.team = team;
        if(type=="0"){
            this.team=false;
        }
        this.turns=0;
    }

    draw(){
        if(this.type=="0"){return;}
        try{
        image(sprites[this.type][parseBool(this.team)],this.x*squareDimention,this.y*squareDimention,squareDimention,squareDimention);
        }
        catch(error){
            console.log(error);
        }
        //text(this.type,this.x*squareDimention + halfSquare,this.y*squareDimention+ halfSquare);



    }

    getValidMovements(){
        if(this.type=="0"){return new Array(0)}
        var outpt = [];
        switch(this.type){
            case "p": //pawn
                if(this.turns==0&&board.content[bc(this.x)][bc(this.y-2)].type=="0"){
                    outpt = [
                        [this.x,this.y-1],
                        [this.x,this.y-2]
                    ];
                }else{
                    if(board.content[bc(this.x)][bc(this.y-1)].type=="0"){
                        outpt= [[this.x,this.y-1]];
                    }
                }

                if(board.content[bc(this.x-1)][bc(this.y-1)].type!="0"){
                    outpt.push([this.x-1,this.y-1]);
                }
                if(board.content[bc(this.x+1)][bc(this.y-1)].type!="0"){
                    outpt.push([this.x+1,this.y-1]);
                }

                break;


            case "r": //rook
                //extra logic for path-blockers
                var okleft= true;
                var okright=true;
                var okdown=true;
                var okup=true;

                for(var i = 1 ; i < 8;i++){
                    console.log(okleft,okright,okdown,okup)
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!="0"){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!="0"){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!="0"){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i)){
                            outpt.push([this.x,this.y-i]);
                            if(board.content[this.x][this.y-i].type!="0"){
                                okup=false;
                            }
                        }else{
                            okup=false;
                        }
                    }
                }
                
                return outpt;

                break;
            
            case "k": //knight
                outpt.push([this.x-2,this.y-1]);
                outpt.push([this.x+2,this.y-1]);
                outpt.push([this.x-2,this.y+1]);
                outpt.push([this.x+2,this.y+1]);

                outpt.push([this.x-1,this.y-2]);
                outpt.push([this.x+1,this.y-2]);
                outpt.push([this.x-1,this.y+2]);
                outpt.push([this.x+1,this.y+2]);

                return outpt;
                
                break;

            case "b": //bishop

                
                var okleftd= true;
                var okrightd=true;
                var okdownd=true;
                var okupd=true;

                for(var i = 1 ; i < 8;i++){
                    
                    if(okrightd){
                        if(board.isValidMove(this.x+i,this.y+i)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!="0"){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!="0"){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!="0"){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i)){
                            outpt.push([this.x+i,this.y-i]);
                            if(board.content[this.x+i][this.y-i].type!="0"){
                                okupd=false;
                            }
                        }else{
                            okupd=false;
                        }
                    }
                }




                return outpt;
                break;

            case "K": //king
                for(var i = -1; i < 2;i++){
                    for(var j = -1; j < 2;j++){
                        outpt.push([this.x+i,this.y+j]);
                    }
                }
                return outpt;
                break;

            case "q": //queen

            //combined logic for rook and bishop
                var okleftd= true;
                var okrightd=true;
                var okdownd=true;
                var okupd=true;
                var okleft= true;
                var okright=true;
                var okdown=true;
                var okup=true;
                for(var i = 1 ; i < 8;i++){
                    if(okrightd){
                        if(board.isValidMove(this.x+i,this.y+i)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!="0"){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!="0"){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!="0"){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i)){
                            outpt.push([this.x+i,this.y-i]);
                            if(board.content[this.x+i][this.y-i].type!="0"){
                                okupd=false;
                            }
                        }else{
                            okupd=false;
                        }
                    }
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!="0"){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!="0"){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!="0"){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i)){
                            outpt.push([this.x,this.y-i]);
                            if(board.content[this.x][this.y-i].type!="0"){
                                okup=false;
                            }
                        }else{
                            okup=false;
                        }
                    }




                    /*
                    outpt.push([this.x+i,this.y]);
                    outpt.push([this.x,this.y+i]);
                    outpt.push([this.x-i,this.y-i]);
                    outpt.push([this.x+i,this.y+i]);
                    outpt.push([this.x-i,this.y+i]);
                    outpt.push([this.x+i,this.y-i]);
                    outpt.push([this.x-i,this.y]);
                    outpt.push([this.x,this.y-i]);
                    */
                }
                return outpt;

                break;
        }
        return outpt;

    }



}

let standardSetup = [ [ 'r', 'p', '0', '0', '0', '0', 'p', 'r' ],
[ 'k', 'p', '0', '0', '0', '0', 'p', 'k' ],
[ 'b', 'p', '0', '0', '0', '0', 'p', 'b' ],
[ 'q', 'p', '0', '0', '0', '0', 'p', 'q' ],
[ 'K', 'p', '0', '0', '0', '0', 'p', 'K' ],
[ 'b', 'p', '0', '0', '0', '0', 'p', 'b' ],
[ 'k', 'p', '0', '0', '0', '0', 'p', 'k' ],
[ 'r', 'p', '0', '0', '0', '0', 'p', 'r' ] ]


class Board{


    constructor(){

        this.content = new Array(0);
        this.currentlyDisplayedMoves = [];
        
        for(var i = 0 ;i  < 8;i++){
            this.content.push(new Array(0));
            for(var j = 0 ; j < 8;j++){
                this.content[i].push(new Piece(i,j,standardSetup[i][j], j > 4));
            }
        }

        this.currentPiece = this.content[4][4];
    }


    isValidMove(newx,newy){

        if(newx>7||newx<0||newy>7||newy<0)return false;
        if(this.content[newx][newy].type!="0"&&this.content[newx][newy].team)return false;

        return true;

    }


    draw(){
        var fillin=true;
        for(var i = 0; i < 8;i++){
            fillin=!fillin;
            for(var j = 0 ; j  < 8; j++){

                if(fillin){
                    fill(100);
                }else{
                    fill(255);
                }
                fillin=!fillin;

                rect(i*squareDimention,j*squareDimention,squareDimention,squareDimention);
                if(fillin){
                    fill(0);
                }else{
                    fill(255);
                }
                this.content[i][j].draw();

            }
        }
        fill(100,255,100,200);
        for(var i = 0 ; i < this.currentlyDisplayedMoves.length;i++) {
            var move = this.currentlyDisplayedMoves[i];
            if(this.isValidMove(move[0],move[1])){
                rect(move[0]*squareDimention,move[1]*squareDimention,squareDimention,squareDimention);
            }
        }

        fill(200,200,255,200);
        rect(Math.floor(mouseX/squareDimention)*squareDimention,Math.floor(mouseY/squareDimention)*squareDimention,squareDimention,squareDimention);


    }


    clickPiece(x,y){
        if(x>8||y>8||x<0||y<0)return;
        if(!this.content[Math.floor(x)][Math.floor(y)].team)return; //only white pieces are movable
        this.currentlyDisplayedMoves = this.content[Math.floor(x)][Math.floor(y)].getValidMovements();
        this.currentPiece=this.content[Math.floor(x)][Math.floor(y)];
        console.log(this.currentlyDisplayedMoves);
    }

    sendTo(x,y){
        if(x>8||y>8||x<0||y<0)return;
        x=Math.floor(x);
        y=Math.floor(y);

        for(var i = 0 ; i < this.currentlyDisplayedMoves.length;i++){
            if(x==this.currentlyDisplayedMoves[i][0] && y == this.currentlyDisplayedMoves[i][1]){
                //peice movement
                this.content[x][y] = this.currentPiece;
                this.content[this.currentPiece.x][this.currentPiece.y] = new Piece(this.currentPiece.x,this.currentPiece.y,"0",false);
                this.currentPiece.x=x;
                this.currentPiece.y=y;
                this.currentPiece.turns++;
                this.currentlyDisplayedMoves = [];
                return;


            }else{

            }
        }


    }


}
function mousePressed(){


    var clicked  = board.content[Math.floor(mouseX/squareDimention)][Math.floor(mouseY/squareDimention)];
    if(clicked.team){
        try{
        board.clickPiece(mouseX/squareDimention,mouseY/squareDimention);
        }catch(error){
            console.log(error);
        }
    }else{
        board.sendTo(mouseX/squareDimention,mouseY/squareDimention);
    }



}


function preload(){

    spriteSheet=loadImage("sprites.png")

    

}
function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    var sdim = 165;

    sprites["K"] = {};
    sprites["K"]["true"] = spriteSheet.get(0,0,160,160);
    sprites["K"]["false"] = spriteSheet.get(0,160,160,160);
    
    sprites["q"] = {};
    sprites["q"]["true"] = spriteSheet.get(sdim,0,160,160);
    sprites["q"]["false"] = spriteSheet.get(sdim,160,160,160);

    sprites["b"] = {};
    sprites["b"]["true"] = spriteSheet.get(sdim*2,0,160,160);
    sprites["b"]["false"] = spriteSheet.get(sdim*2,160,160,160);

    sprites["k"] = {};
    sprites["k"]["true"] = spriteSheet.get(sdim*3,0,160,160);
    sprites["k"]["false"] = spriteSheet.get(sdim*3,160,160,160);

    sprites["r"] = {};
    sprites["r"]["true"] = spriteSheet.get(sdim*4,0,160,160);
    sprites["r"]["false"] = spriteSheet.get(sdim*4,160,160,160);

    sprites["p"] = {};
    sprites["p"]["true"] = spriteSheet.get(sdim*5,0,160,160);
    sprites["p"]["false"] = spriteSheet.get(sdim*5,160,160,160);

    console.log(sprites);
}

var board = new Board();
console.log(board);
function draw(){
    background(0);
    //rotate(radians(90));
    board.draw();

}


