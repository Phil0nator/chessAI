let squareDimention = window.innerHeight / 8;
let halfSquare = squareDimention/2;
let spriteSheet;
let sprites = {};

var turn = true;


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
        this.score=0;
        if(type=="0"){
            this.team=false;
        }else{
            this.score = sprites[this.type]["value"];
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

    getValidMovements(forTeam){
        if(this.type=="0"){return new Array(0)}
        var outpt = [];
        var pwnFactor = 1;
        if(!forTeam){
            pwnFactor=-1;
        }

        switch(this.type){
            case "p": //pawn
                if(this.turns==0&&board.content[bc(this.x)][bc(this.y-pwnFactor*2)].type=="0"){
                    outpt = [
                        [this.x,this.y-pwnFactor],
                        [this.x,this.y-pwnFactor*2]
                    ];
                }else{
                    if(board.content[bc(this.x)][bc(this.y-pwnFactor)].type=="0"){
                        outpt= [[this.x,this.y-pwnFactor]];
                    }
                }

                if(board.content[bc(this.x-1)][bc(this.y-pwnFactor)].type!="0"){
                    outpt.push([this.x-1,this.y-1]);
                }
                if(board.content[bc(this.x+1)][bc(this.y-pwnFactor)].type!="0"){
                    outpt.push([this.x+1,this.y-pwnFactor]);
                }

                break;


            case "r": //rook
                //extra logic for path-blockers
                var okleft= true;
                var okright=true;
                var okdown=true;
                var okup=true;

                for(var i = 1 ; i < 8;i++){
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y,this.team)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!="0"){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i,this.team)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!="0"){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y,this.team)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!="0"){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i,this.team)){
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
                        if(board.isValidMove(this.x+i,this.y+i,this.team)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!="0"){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i,this.team)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!="0"){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i,this.team)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!="0"){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i,this.team)){
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
                        if(board.isValidMove(this.x+i,this.y+i,this.team)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!="0"){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i,this.team)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!="0"){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i,this.team)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!="0"){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i,this.team)){
                            outpt.push([this.x+i,this.y-i]);
                            if(board.content[this.x+i][this.y-i].type!="0"){
                                okupd=false;
                            }
                        }else{
                            okupd=false;
                        }
                    }
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y,this.team)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!="0"){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i,this.team)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!="0"){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y,this.team)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!="0"){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i,this.team)){
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
class GameState{

    constructor(b, move){

        this.scoreFalse = 0;
        this.scoreTrue = 0;
        this.move = move;
        for(var i = 0 ; i < b.content.length; i++){
            for(var j = 0 ; j < b.content[i].length;j++){
                var p = b.content[i][j];
                if(p.type=="0"){
                    continue;
                }

                if(p.team){
                    this.scoreTrue += p.score;
                }else{
                    this.scoreFalse += p.score;
                }

            }
        }





    }

}

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


    isValidMove(newx,newy,forTeam){

        if(newx>7||newx<0||newy>7||newy<0)return false;
        if(this.content[newx][newy].type!="0"&&this.content[newx][newy].team==forTeam)return false;

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
        this.currentlyDisplayedMoves = this.content[Math.floor(x)][Math.floor(y)].getValidMovements(true);
        this.currentPiece=this.content[Math.floor(x)][Math.floor(y)];
    }

    takeMove(x,y){
        if(x>8||y>8||x<0||y<0)return;
        x=Math.floor(x);
        y=Math.floor(y);
        this.content[x][y] = this.currentPiece;
        this.content[this.currentPiece.x][this.currentPiece.y] = new Piece(this.currentPiece.x,this.currentPiece.y,"0",false);
        this.currentPiece.x=x;
        this.currentPiece.y=y;
        this.currentPiece.turns++;
        this.currentlyDisplayedMoves = [];
    }

    sendTo(x,y){
        if(x>8||y>8||x<0||y<0)return;
        x=Math.floor(x);
        y=Math.floor(y);

        for(var i = 0 ; i < this.currentlyDisplayedMoves.length;i++){
            if(x==this.currentlyDisplayedMoves[i][0] && y == this.currentlyDisplayedMoves[i][1]){
                //peice movement
                this.takeMove(x,y);
                turn=!turn;
                return;


            }else{

            }
        }


    }


    theorizeUserTurn(){
        var futurePossibilities = [];


        var minAIScore = 10000000;
        var minAIChoice = null;

        for(var i = 0 ; i < 8;i++){
            for(var j = 0 ; j < 8;j++){
                
                if(this.content[i][j].team==true){

                    var tryPart = this.content[i][j];
                    var options = tryPart.getValidMovements();

                    for(var opt = 0 ; opt < options.length;opt++){

                        futurePossibilities.push(this.hypothesize(tryPart.x,tryPart.y,options[opt][0],options[opt][1],4));
                        if(futurePossibilities[futurePossibilities.length-1].scoreFalse < minAIScore){
                            minAIScore=futurePossibilities[futurePossibilities.length-1].scoreFalse;
                            minAIChoice = futurePossibilities[futurePossibilities.length-1];
                        }

                    }



                }

            }
        }

        this.currentPiece = this.content[minAIChoice.move[0]][minAIChoice.move[1]];

        this.takeMove(minAIChoice.move[2],minAIChoice.move[3]);
        return minAIChoice;


    }

    takeOwnTurn(layersDeep){
        if(layersDeep > 5){
            return null;
        }
        var futurePossibilities = [];

        var minAIScore = 10000000;
        var minAIChoice = null;

        for(var i = 0 ; i < 8;i++){
            for(var j = 0 ; j < 8;j++){
                
                if(this.content[i][j].team==false&&this.content[i][j].type!="0"){

                    var tryPart = this.content[i][j];
                    var options = tryPart.getValidMovements(false);

                    for(var opt = 0 ; opt < options.length;opt++){

                        futurePossibilities.push(this.hypothesize(tryPart.x,tryPart.y,options[opt][0],options[opt][1], layersDeep));
                        if(futurePossibilities[futurePossibilities.length-1].scoreTrue < minAIScore){
                            minAIScore=futurePossibilities[futurePossibilities.length-1].scoreTrue;
                            minAIChoice = futurePossibilities[futurePossibilities.length-1];
                        }
                    }

                }

            }
        }

        this.currentPiece = this.content[minAIChoice.move[0]][minAIChoice.move[1]];

        this.takeMove(minAIChoice.move[2],minAIChoice.move[3]);

    }

    getContents(){

        var out = [];
        for(var  i = 0 ; i < 8;i++){
            out.push([]);
            for(var j = 0 ; j < 8;j++){
                out[i].push(new Piece(i,j,this.content[i][j].type,this.content[i][j].team));
                out[i][j].turns = this.content[i][j].turns;
            }
        }

        return out;

    }


    hypothesize(sx,sy,nx,ny,ld){
        
        
        var hypoBoard = new Board();
        hypoBoard.content = this.getContents();
        hypoBoard.currentPiece = hypoBoard.content[sx][sy];
        hypoBoard.sendTo(nx,ny);
        if(ld<4){
            hypoBoard.theorizeUserTurn();
        }
        var score = new GameState(hypoBoard, [sx,sy,nx,ny]);



        


        return score;

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
    }else if (turn){
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
    sprites["K"]["value"] = 1000;
    
    sprites["q"] = {};
    sprites["q"]["true"] = spriteSheet.get(sdim,0,160,160);
    sprites["q"]["false"] = spriteSheet.get(sdim,160,160,160);
    sprites["q"]["value"] = 9;

    sprites["b"] = {};
    sprites["b"]["true"] = spriteSheet.get(sdim*2,0,160,160);
    sprites["b"]["false"] = spriteSheet.get(sdim*2,160,160,160);
    sprites["b"]["value"] = 3;

    sprites["k"] = {};
    sprites["k"]["true"] = spriteSheet.get(sdim*3,0,160,160);
    sprites["k"]["false"] = spriteSheet.get(sdim*3,160,160,160);
    sprites["k"]["value"] = 3;

    sprites["r"] = {};
    sprites["r"]["true"] = spriteSheet.get(sdim*4,0,160,160);
    sprites["r"]["false"] = spriteSheet.get(sdim*4,160,160,160);
    sprites["r"]["value"] = 5;

    sprites["p"] = {};
    sprites["p"]["true"] = spriteSheet.get(sdim*5,0,160,160);
    sprites["p"]["false"] = spriteSheet.get(sdim*5,160,160,160);
    sprites["p"]["value"] = 1;

    console.log(sprites);




    board = new Board();
}

let board;
console.log(board);
function draw(){
    background(0);
    //rotate(radians(90));

    textSize(35);
    if(turn){
        text("Your turn", 10*squareDimention,4*squareDimention);
    }else{
        text("AI Calculating", 10*squareDimention,4*squareDimention);
    }

    board.draw();
    if(!turn)
    {

        
        board.takeOwnTurn(0);
        turn=!turn;
        

    }

}


