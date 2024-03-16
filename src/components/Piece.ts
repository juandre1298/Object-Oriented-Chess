import { Color, ChessPieceType, gameType, movingOptionsType, cell } from "../types";
import { uid, idToPos, posToId } from "../utils";

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
    possibleMoves(currentPosition:number[],options:number[][][],game:gameType):{[key:string]: number[][]}{
        const optionsArray:number[][] = [];
        const colitionArray:number[][] = [];
        const color = game[currentPosition[0]][currentPosition[1]].content?.color;
        
        for(let direction of options ){
            let c:number=1;
            let i:number = direction[c][0];
            let j:number = direction[c][1];
            
            while(c<options[0].length && i>=0 && i <8 && j>=0 && j <8){
                
                i = direction[c][0];
                j = direction[c][1];
                if(i>=0 && i <8 && j>=0 && j <8){
                    
                    const cell = game[i][j].content;
                    
                    if(cell){
                        if(cell.color!==color){
                            colitionArray.push([i,j])
                        }
                        break;
                    }else{
                        c++;
                        optionsArray.push([i,j]) 
                    }
                }else{
                    break;
                }
    
            }
        }
        return {optionsArray,colitionArray};
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
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
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
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
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
    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        
        let possibleNextPositions: number[][][]= [];
        let upLeft:number[][]=[];
        let upRight:number[][]=[];
        let downLeft:number[][]=[];
        let downRight:number[][]=[];
        
        

        for(let c:number = 0;c<8;c++){
            
            upLeft.push([i-c,j+c]);
            upRight.push([i+c,j+c]);
            downLeft.push([i-c,j-c]);
            downRight.push([i+c,j-c]);
        }
        possibleNextPositions.push(upLeft);
        possibleNextPositions.push(upRight);
        possibleNextPositions.push(downLeft);
        possibleNextPositions.push(downRight);
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
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

    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][][]=[];
        possibleNextPositions.push([[i, j]]);

        possibleNextPositions.push([[i - 2, j - 1]]);
        possibleNextPositions.push([[i - 1, j - 2]]);
        possibleNextPositions.push([[i + 2, j + 1]]);
        possibleNextPositions.push([[i + 1, j + 2]]);
        possibleNextPositions.push([[i - 2, j + 1]]);
        possibleNextPositions.push([[i - 1, j + 2]]);
        possibleNextPositions.push([[i + 2, j - 1]]);
        possibleNextPositions.push([[i + 1, j - 2]]);
     
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
    }
    possibleMoves(currentPosition:number[],options:number[][][],game:gameType):{[key:string]: number[][]}{
        const optionsArray:number[][] = [];
        const colitionArray:number[][] = [];
        const color = game[currentPosition[0]][currentPosition[1]].content?.color;
        
        for(let direction of options ){
            let c:number=0;
            let i:number = direction[c][0];
            let j:number = direction[c][1];
            
                if(i>=0 && i <8 && j>=0 && j <8){
                    
                    const cell = game[i][j].content;
                    
                    if(cell){
                        if(cell.color!==color){
                            colitionArray.push([i,j])
                        }
                        
                    }else{
                        optionsArray.push([i,j]) 
                        
                    }
                }else{
                    
                }
    
            
        }
        return {optionsArray,colitionArray};
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
    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        
        let possibleNextPositions: number[][][]= [];
        let up:number[][]=[];
        let down:number[][]=[];
        let left:number[][]=[];
        let right:number[][]=[];
        
        

        for(let c:number = 0;c<8;c++){
            up.push([i,j+c]);
            down.push([i,j-c]);
            left.push([i-c,j]);
            right.push([i+c,j]);
        }
        possibleNextPositions.push(up);
        possibleNextPositions.push(down);
        possibleNextPositions.push(left);
        possibleNextPositions.push(right);
        
        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
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
    movingOptions(position:string,game:gameType):movingOptionsType{
        const [i,j]=idToPos(position);  
        let possibleNextPositions: number[][][]=[];
        possibleNextPositions.push([[i, j]]);
        if(this.color==="white"){
            possibleNextPositions[0].push([i, j + 1]);
            if(this.counter==0){
                possibleNextPositions[0].push([i, j + 2]);
            }
        }else{
            possibleNextPositions[0].push([i, j - 1]);
            if(this.counter==0){
                possibleNextPositions[0].push([i, j - 2]);
            }
        }

        const {optionsArray,colitionArray}:{[key:string]:number[][]}=this.possibleMoves([i,j],possibleNextPositions,game);
        // return {optionsArray.map(([a,b])=>posToId(a,b)),colitionArray}
        
        return {optionsArray:optionsArray.map(([a,b])=>posToId(a,b)),colitionArray:colitionArray.map(([a,b])=>posToId(a,b))}
    }
    possibleMoves(currentPosition:number[],options:number[][][],game:gameType):{[key:string]: number[][]}{
        const optionsArray:number[][] = [];
        const colitionArray:number[][] = [];
        const i:number=currentPosition[0];
        const j:number=currentPosition[1];
        const color = game[currentPosition[0]][currentPosition[1]].content?.color;
        
        for(let direction of options ){
            let c:number=1;
            let i:number = direction[c][0];
            let j:number = direction[c][1];
            
            while(c<options[0].length && i>=0 && i <8 && j>=0 && j <8){
                
                i = direction[c][0];
                j = direction[c][1];
                if(i>=0 && i <8 && j>=0 && j <8){
                    
                    const cell = game[i][j].content;
                    
                    if(cell){
                        // if(cell.color!==color){
                        //     colitionArray.push([i,j])
                        // }
                        break;
                    }else{
                        c++;
                        optionsArray.push([i,j]) 
                    }
                }else{
                    break;
                }
    
            }
        }
        // check for posible victims
        if(color=="white"){
            const right:cell = this.checkIfCellExiste(i+1,j+1,game);
            const left:cell = this.checkIfCellExiste(i-1,j+1,game);
            
            if(right.content){
                colitionArray.push([i+1,j+1]);
            }
            if(left.content){
                colitionArray.push([i-1,j+1]);
            }
        }else{
            const right:cell = this.checkIfCellExiste(i+1,j-1,game);
            const left:cell = this.checkIfCellExiste(i-1,j-1,game);
            
            if(right.content){
                colitionArray.push([i+1,j-1]);
            }
            if(left.content){
                colitionArray.push([i-1,j-1]);
            }
            
        }
        return {optionsArray,colitionArray};
    }
    checkIfCellExiste(i:number,j:number,game:gameType):cell{
        return i > 0 && j > 0 && i < 8 && j < 8 ? game[i][j] : {content:null,position:""}
    }
    

}















