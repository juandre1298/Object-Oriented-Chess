import { Color, ChessPieceType, gameType, movingOptionsType } from "../types";
import { uid, idToPos, posToId, possibleMoves } from "../utils";

export class Piece{
    id:string;
    color:Color;
    url: any;
    type:any;
    
    constructor(color:Color){
    this.id=uid();
    this.color=color;

    }
    movingOptions(position:string,game:gameType):movingOptionsType{
        return {optionsArray:[],colitionArray:[]}
    }

}

export class King extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.King;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
    }
    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        console.log("queen moving")
        let possibleNextPositions: number[][][]= [];
        let up:number[][]=[];
        let down:number[][]=[];
        let left:number[][]=[];
        let right:number[][]=[];
        let upLeft:number[][]=[];
        let upRight:number[][]=[];
        let downLeft:number[][]=[];
        let downRight:number[][]=[];
        
        

        for(let c:number = 0;c<=1;c++){
            up.push([i,j+c]);
            down.push([i,j-c]);
            left.push([i-c,j]);
            right.push([i+c,j]);
            upLeft.push([i-c,j+c]);
            upRight.push([i+c,j+c]);
            downLeft.push([i-c,j-c]);
            downRight.push([i+c,j-c]);
        }
        possibleNextPositions.push(up);
        possibleNextPositions.push(down);
        possibleNextPositions.push(left);
        possibleNextPositions.push(right);
        possibleNextPositions.push(upLeft);
        possibleNextPositions.push(upRight);
        possibleNextPositions.push(downLeft);
        possibleNextPositions.push(downRight);
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        console.log(optionsArray.map(([a,b])=>posToId(a,b)),colitionArray)
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
    }
    
}
export class Queen extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Queen;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
  
    }
    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        console.log("queen moving")
        let possibleNextPositions: number[][][]= [];
        let up:number[][]=[];
        let down:number[][]=[];
        let left:number[][]=[];
        let right:number[][]=[];
        let upLeft:number[][]=[];
        let upRight:number[][]=[];
        let downLeft:number[][]=[];
        let downRight:number[][]=[];
        
        

        for(let c:number = 0;c<8;c++){
            up.push([i,j+c]);
            down.push([i,j-c]);
            left.push([i-c,j]);
            right.push([i+c,j]);
            upLeft.push([i-c,j+c]);
            upRight.push([i+c,j+c]);
            downLeft.push([i-c,j-c]);
            downRight.push([i+c,j-c]);
        }
        possibleNextPositions.push(up);
        possibleNextPositions.push(down);
        possibleNextPositions.push(left);
        possibleNextPositions.push(right);
        possibleNextPositions.push(upLeft);
        possibleNextPositions.push(upRight);
        possibleNextPositions.push(downLeft);
        possibleNextPositions.push(downRight);
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        console.log(optionsArray.map(([a,b])=>posToId(a,b)),colitionArray)
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
    }
}
export class Bishop extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Bishop;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
    }
    movingOptions(position:string,game:gameType):string[]{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][]=[];
        for(let c:number = 0;c<8;c++){
            possibleNextPositions.push([i+c,j+c]); 
            possibleNextPositions.push([i-c,j+c]); 
            possibleNextPositions.push([i-c,j-c]); 
            possibleNextPositions.push([i+c,j-c]); 
             
            // possibleNextPositions.push([c,c]);  
        }
        possibleNextPositions=possibleMoves([i,j],possibleNextPositions,game);
        return possibleNextPositions.map(([a,b])=>posToId(a,b));
    }
}
export class Knight extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Knight;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
    }
    movingOptions(position:string,game:gameType):string[]{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][]=[];

        possibleNextPositions.push([i - 2, j - 1]);
        possibleNextPositions.push([i - 1, j - 2]);
        possibleNextPositions.push([i + 2, j + 1]);
        possibleNextPositions.push([i + 1, j + 2]);
        possibleNextPositions.push([i - 2, j + 1]);
        possibleNextPositions.push([i - 1, j + 2]);
        possibleNextPositions.push([i + 2, j - 1]);
        possibleNextPositions.push([i + 1, j - 2]);
        possibleNextPositions=possibleMoves([i,j],possibleNextPositions,game);
        return possibleNextPositions.map(([a,b])=>posToId(a,b));
    }
}
export class Rook extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Rook;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
    }
    movingOptions(position:string,game:gameType):string[]{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][]=[];
        for(let c:number = 0;c<8;c++){
            possibleNextPositions.push([i,c]);  
            possibleNextPositions.push([c,j]);  
            
        }
        possibleNextPositions=possibleMoves([i,j],possibleNextPositions,game);
        return possibleNextPositions.map(([a,b])=>posToId(a,b));
    }
}
export class Pawn extends Piece{
    type:ChessPieceType;
    url:string;
    counter:number;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Pawn;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`
        this.counter=0;
    }
    movingOptions(position:string,game:gameType):string[]{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][]=[];
        if(this.color==="white"){
            possibleNextPositions.push([i, j + 1]);
            if(this.counter==0){
                possibleNextPositions.push([i, j + 2]);
            }
        }else{
            possibleNextPositions.push([i, j - 1]);
            if(this.counter==0){
                possibleNextPositions.push([i, j - 2]);
            }
        }
        possibleNextPositions=possibleMoves([i,j],possibleNextPositions,game);
        return possibleNextPositions.map(([a,b])=>posToId(a,b));
    }
}















