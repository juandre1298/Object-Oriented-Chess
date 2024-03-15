import { Color, ChessPieceType } from "../types";
import { uid, idToPos, posToId, possibleMove } from "../utils";

export class Piece{
    id:string;
    color:Color;
    url: any;
    type:any;
    
    constructor(color:Color){
    this.id=uid();
    this.color=color;

    }
    movingOptions(position:string){
        return [""];
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
}
export class Queen extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Queen;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
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
}
export class Knight extends Piece{
    type:ChessPieceType;
    url:string;
    constructor(color:Color){
        super(color);
        this.type = ChessPieceType.Knight;
        this.url=`pieces-svg/${this.type.toLowerCase()}-${this.color=="white"?"w":"b"}.svg`    
       
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
    movingOptions(position:string):string[]{
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
        possibleNextPositions.filter(([a, b]) => possibleMove(a, b));
        return possibleNextPositions.map(([a,b])=>posToId(a,b));
        
    }



}















