PImage pawnF;
PImage rookF;
PImage knightF;
PImage bishopF;
PImage queenF;
PImage kingF;

PImage pawnT;
PImage rookT;
PImage knightT;
PImage bishopT;
PImage queenT;
PImage kingT;

int squareDimention = 160;


int randint(int min, int max){
    return (int)random(min,max);
}
String parseBool(boolean bool){
    if(bool){
        return "true";
    }
    return "false";
}
int bc(int v){
    if(v>7){
        return 7;
    }
    if(v<0){
        return 0;
    }
    return v;
}
String[][] standardSetup = { { "r", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "r" },
{ "k", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "k" },
{ "b", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "b" },
{ "q", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "q" },
{ "K", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "K" },
{ "b", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "b" },
{ "k", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "k" },
{ "r", "p", PT.EMPTY, PT.EMPTY, PT.EMPTY, PT.EMPTY, "p", "r" } };
class Board{
    Board(){




    }


}
enum PT{

    EMPTY, PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING

}

int getScoreFor(PT type){

    switch(type){
        case EMPTY:
            return 0;
            
        case PAWN:
            return 1;
            
        case ROOK:
            return 5;

        case KNIGHT:
            return 3;

        case BISHOP:
            return 3;
        
        case QUEEN:
            return 9;

        case KING:
            return 1000;

        default:
            return 0;
            
    }

}

PImage getSpriteFor(PT type, boolean team){

    if(team){
        switch(type){
        case EMPTY:
            return null;
            
        case PAWN:
            return pawnT;
            
        case ROOK:
            return rookT;

        case KNIGHT:
            return knightT;

        case BISHOP:
            return bishopT;
        
        case QUEEN:
            return queenT;

        case KING:
            return kingT;

        default:
            return null;
            
    }
    }else{
        switch(type){
        case EMPTY:
            return null;
            
        case PAWN:
            return pawnF;
            
        case ROOK:
            return rookF;

        case KNIGHT:
            return knightF;

        case BISHOP:
            return bishopF;
        
        case QUEEN:
            return queenF;

        case KING:
            return kingF;

        default:
            return null;
            
    }
    }
    

}

class Piece{
    PT type = PT.EMPTY;
    boolean team;
    int x;
    int y;
    int score = 0;
    PImage sprite;
    int turns = 0;
    Piece(PT t, boolean team, int x, int y){

        type = t;
        this.team = team;
        this.x=x;
        this.y=y;
        score = getScoreFor(t);
        sprite = getSpriteFor(t,team);
    

    }
    void draw(){
        if(this.type== PT.EMPTY){return;}
        image(sprite,x*squareDimention,y*squareDimention);

        //text(this.type,this.x*squareDimention + halfSquare,this.y*squareDimention+ halfSquare);
    }
    ArrayList<int[]> getValidMovements(){
        if(this.type==PT.EMPTY){return null;}
        ArrayList<int[]> outpt;
        int pwnFactor = 1;
        if(!this.team){
            pwnFactor=-1;
        }
        Board board = forBoard;
        switch(this.type){
            case PT.PAWN: //pawn
                if(this.turns==0&&board.content[bc(this.x)][bc(this.y-pwnFactor*2)].type==PT.EMPTY&&board.content[bc(this.x)][bc(this.y-pwnFactor)].type==PT.EMPTY){
                    outpt = [
                        [this.x,this.y-pwnFactor],
                        [this.x,this.y-pwnFactor*2]
                    ];
                }else{
                    if(board.content[bc(this.x)][bc(this.y-pwnFactor)].type==PT.EMPTY){
                        outpt= [[this.x,this.y-pwnFactor]];
                    }
                }

                if(board.content[bc(this.x-1)][bc(this.y-pwnFactor)].type!=PT.EMPTY&&board.content[bc(this.x-1)][bc(this.y-pwnFactor)].team!=this.team){
                    outpt.push([this.x-1,this.y-1]);
                }
                if(board.content[bc(this.x+1)][bc(this.y-pwnFactor)].type!=PT.EMPTY&&board.content[bc(this.x+1)][bc(this.y-pwnFactor)].team!=this.team){
                    outpt.push([this.x+1,this.y-pwnFactor]);
                }

                break;


            case PT.ROOK: //rook
                //extra logic for path-blockers
                boolean okleft= true;
                boolean okright=true;
                boolean okdown=true;
                boolean okup=true;

                for(int i = 1 ; i < 8;i++){
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y,this.team)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!=PT.EMPTY){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i,this.team)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!=PT.EMPTY){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y,this.team)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!=PT.EMPTY){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i,this.team)){
                            outpt.push([this.x,this.y-i]);
                            if(board.content[this.x][this.y-i].type!=PT.EMPTY){
                                okup=false;
                            }
                        }else{
                            okup=false;
                        }
                    }
                }
                
                return outpt;

                break;
            
            case PT.KING: //knight
                if(board.isValidMove(this.x-2,this.y-1,this.team))outpt.push([this.x-2,this.y-1]);
                if(board.isValidMove(this.x+2,this.y-1,this.team))outpt.push([this.x+2,this.y-1]);
                if(board.isValidMove(this.x-2,this.y+1,this.team))outpt.push([this.x-2,this.y+1]);
                if(board.isValidMove(this.x+2,this.y+1,this.team))outpt.push([this.x+2,this.y+1]);

                if(board.isValidMove(this.x-1,this.y-2,this.team))outpt.push([this.x-1,this.y-2]);
                if(board.isValidMove(this.x+1,this.y-2,this.team))outpt.push([this.x+1,this.y-2]);
                if(board.isValidMove(this.x-1,this.y+2,this.team))outpt.push([this.x-1,this.y+2]);
                if(board.isValidMove(this.x+1,this.y+2,this.team))outpt.push([this.x+1,this.y+2]);


                return outpt;
                
                break;

            case PT.BISHOP: //bishop

                
                boolean okleftd= true;
                boolean okrightd=true;
                boolean okdownd=true;
                boolean okupd=true;

                for(int i = 1 ; i < 8;i++){
                    
                    if(okrightd){
                        if(board.isValidMove(this.x+i,this.y+i,this.team)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!=PT.EMPTY){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i,this.team)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!=PT.EMPTY){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i,this.team)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!=PT.EMPTY){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i,this.team)){
                            outpt.push([this.x+i,this.y-i]);
                            if(board.content[this.x+i][this.y-i].type!=PT.EMPTY){
                                okupd=false;
                            }
                        }else{
                            okupd=false;
                        }
                    }
                }




                return outpt;
                break;

            case PT.KING: //king
                for(int i = -1; i < 2;i++){
                    for(var j = -1; j < 2;j++){
                        if(board.isValidMove(this.x+i,this.y+j,this.team))outpt.push([this.x+i,this.y+j]);
                    }
                }
                return outpt;
                break;

            case PT.QUEEN: //queen

            //combined logic for rook and bishop
                boolean okleftd= true;
                boolean okrightd=true;
                boolean okdownd=true;
                boolean okupd=true;
                boolean okleft= true;
                boolean okright=true;
                boolean okdown=true;
                boolean okup=true;
                for(int i = 1 ; i < 8;i++){
                    if(okrightd){
                        if(board.isValidMove(this.x+i,this.y+i,this.team)){
                            outpt.push([this.x+i,this.y+i]);
                            if(board.content[this.x+i][this.y+i].type!=PT.EMPTY){
                                okrightd=false;
                            }
                        }else{
                            okrightd=false;
                        }
                    }
                    if(okdownd){
                        if(board.isValidMove(this.x-i,this.y+i,this.team)){
                            outpt.push([this.x-i,this.y+i]);
                            if(board.content[this.x-i][this.y+i].type!=PT.EMPTY){
                                okdownd=false;
                            }
                        }else{
                            okdownd=false;
                        }
                    
                    }
                    if(okleftd){
                        if(board.isValidMove(this.x-i,this.y-i,this.team)){
                            outpt.push([this.x-i,this.y-i]);
                            if(board.content[this.x-i][this.y-i].type!=PT.EMPTY){
                                okleftd=false;
                            }
                        }else{
                            okleftd=false;
                        }
                    }
                    if(okupd){
                        if(board.isValidMove(this.x+i,this.y-i,this.team)){
                            outpt.push([this.x+i,this.y-i]);
                            if(board.content[this.x+i][this.y-i].type!=PT.EMPTY){
                                okupd=false;
                            }
                        }else{
                            okupd=false;
                        }
                    }
                    if(okright){
                        if(board.isValidMove(this.x+i,this.y,this.team)){
                            outpt.push([this.x+i,this.y]);
                            if(board.content[this.x+i][this.y].type!=PT.EMPTY){
                                okright=false;
                            }
                        }else{
                            okright=false;
                        }
                    }
                    if(okdown){
                        if(board.isValidMove(this.x,this.y+i,this.team)){
                            outpt.push([this.x,this.y+i]);
                            if(board.content[this.x][this.y+i].type!=PT.EMPTY){
                                okdown=false;
                            }
                        }else{
                            okdown=false;
                        }
                    
                    }
                    if(okleft){
                        if(board.isValidMove(this.x-i,this.y,this.team)){
                            outpt.push([this.x-i,this.y]);
                            if(board.content[this.x-i][this.y].type!=PT.EMPTY){
                                okleft=false;
                            }
                        }else{
                            okleft=false;
                        }
                    }
                    if(okup){
                        if(board.isValidMove(this.x,this.y-i,this.team)){
                            outpt.push([this.x,this.y-i]);
                            if(board.content[this.x][this.y-i].type!=PT.EMPTY){
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


class GameState{



}



void setup(){

    size(800,800);

    int sdim = 165;

    PImage sprites = loadImage("../sprites.png");
    pawnF = sprites.get(sdim*5,160,160,160);
    rookF = sprites.get(sdim*4,160,160,160);
    knightF = sprites.get(sdim*3,160,160,160);
    bishopF = sprites.get(sdim*2,160,160,160);
    queenF = sprites.get(sdim,160,160,160);
    kingF = sprites.get(0,160,160,160);

    pawnT = sprites.get(sdim*5,0,160,160);
    rookT = sprites.get(sdim*4,0,160,160);
    knightT = sprites.get(sdim*3,0,160,160);
    bishopT = sprites.get(sdim*2,0,160,160);
    queenT = sprites.get(sdim,0,160,160);
    kingT = sprites.get(0,0,160,160);
}

void draw(){


    background(0);

}