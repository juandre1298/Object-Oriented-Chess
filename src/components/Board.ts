import type { Piece } from "./Piece";
import type { Color,gameType, movingOptionsType, cell } from "../types";
import { idToPos } from "../utils";
import { Jail } from "./Jail";


export class Board {
    size:number;
    game:gameType;
    turn:Color;
    selectedCell:cell;
    possiblePositionsToMove:string[];
    whiteJail:Jail;
    blackJail:Jail;
    


    constructor(game:gameType){
        this.size=8;
        this.game=game;
        this.selectedCell={position: "i9", content: null};
        this.turn="white";
        this.display();
        this.possiblePositionsToMove=[];
        this.whiteJail=new Jail("white");
        this.blackJail=new Jail("black");
        
    }

    display(){
        const boardDisplaySection = document.getElementById("gameBoardSection");
        if(boardDisplaySection){
            boardDisplaySection.innerHTML="";
        }
        this.game.forEach((column,i) =>{
                            const columnDiv = document.createElement("div");
                            columnDiv.className="boardColumn"
                            column.forEach(
                                (cell,j) => {
                                    let newCell = this.createEmptyCell(cell.position)
                                    // add piece
                                    if (cell.content != null){
                                        this.addPieceToEmptyCell(cell.content,newCell);
                                    }
                                    columnDiv.appendChild(newCell)
                                } 
                            )
                            boardDisplaySection?.appendChild(columnDiv);
                            
        })
    }
    createEmptyCell(position:string){
        const [i,j]=idToPos(position);
        const newCell = document.createElement("div");
        const id= position;
        newCell.id= id;
        newCell.textContent=id;
        newCell.addEventListener("click",()=>this.handleClick(id))
        switch (true) {
            case (i % 2 == 0 && j % 2 == 0):
                newCell.className = "black square";
                break;
            case (i % 2 == 0 && j % 2 != 0):
                newCell.className = "white square";
                break;
            case (i % 2 != 0 && j % 2 == 0):
                newCell.className = "white square";
                break;
            case (i % 2 != 0 && j % 2 != 0):
                newCell.className = "black square";
                break;
        }
        return newCell;
    }
    addPieceToEmptyCell(piece:Piece,emptyCell:HTMLDivElement){
        const pieceElement = document.createElement("div");
            pieceElement.id = piece.id;
            pieceElement.className = "piece";
            pieceElement.innerHTML=`<img src=${piece.url} alt=${piece.type+piece.id}/>`;
            // Set class or other attributes based on piece type if needed
            emptyCell.appendChild(pieceElement);
    }
    handleClick(id:string){
        const [column,row]=idToPos(id);
        const content=this.game[column][row].content;
        if(id!=this.selectedCell.position && content){
            this.display();
        }
        //this.displaySelectedPiece(this.game[column][row]);
        console.log(this.possiblePositionsToMove,this.possiblePositionsToMove.includes(id))
        if(this.possiblePositionsToMove.includes(id)){
            this.movePiece(this.game[column][row]);
            this.displaySelectedPiece(this.game[column][row]);
        }else if(content!=null && this.turn==content.color){
            this.displaySelectedPiece(this.game[column][row]);
            this.clickedPiece();
        }else{
            this.displaySelectedPiece(this.game[column][row]);
            this.clickedEmptyCell(id);
        }
        this.displaySelectedPiece(this.game[column][row]);
    }
    clickedPiece(){
            const id=this.selectedCell.position;
            const piece=this.selectedCell.content;
            const selectedElement = document.getElementById(id);
            if(selectedElement && piece){
                const possiblePositions:movingOptionsType = piece.movingOptions(id,this.game);
                this.possiblePositionsToMove=[...possiblePositions.colitionArray,...possiblePositions.optionsArray];
                
                if(selectedElement.className.includes(" selected")){
                    selectedElement.className=selectedElement.className.replace(" selected","");
                    
                    if(possiblePositions){
                        this.displayOptions(possiblePositions.optionsArray);
                        this.treatedOptions(possiblePositions.colitionArray)
                    }
                }else{
                    
                    selectedElement.className+=" selected";

                    if(possiblePositions){
                        this.displayOptions(possiblePositions.optionsArray);
                        this.treatedOptions(possiblePositions.colitionArray)

                    }

                }
            }else{
             //   alert("id doesn't found"+id)
            }   
    }
    clickedEmptyCell(id:string){
        const selectedElement = document.getElementById(id);
        this.possiblePositionsToMove=[];
        this.display();
        if(selectedElement){
            if(selectedElement.className.includes(" empty")){
                selectedElement.className=selectedElement.className.replace(" empty","");
            }else{
                selectedElement.className+=" empty";
                setTimeout(()=>selectedElement.className=selectedElement.className.replace(" empty",""),200);
            }
        }else{
            alert("id doesn't found"+id)
        }
    }
    displayOptions(possiblePositions:string[]){
        possiblePositions.forEach(e=>{
            const selectedElement = document.getElementById(e);
            if(selectedElement){
                if(selectedElement.className.includes(" option")){
                    selectedElement.className=selectedElement.className.replace(" option","");
                }else{
                    selectedElement.className+=" option";
                }
            }
        })
    }
    treatedOptions(possiblePositions:string[]){
        possiblePositions.forEach(e=>{
            const selectedElement = document.getElementById(e);
            if(selectedElement){
                if(selectedElement.className.includes(" treated")){
                    selectedElement.className=selectedElement.className.replace(" treated","");
                }else{
                    selectedElement.className+=" treated";
                }
            }
        })
    }
    displaySelectedPiece(cell:cell){
        this.selectedCell=cell;
        const selectedCellDisplay= document.getElementById("selectedCellDisplay");
        if(selectedCellDisplay){
            selectedCellDisplay.innerText=this.selectedCell.position;
        }
    }
    movePiece(cell:cell){
        console.log("trying to move piece",this.selectedCell,cell,this.possiblePositionsToMove)
        
        const [oldI,oldJ]=idToPos(this.selectedCell.position);
        const [newI,newJ]=idToPos(cell.position);
        
        this.game[oldI][oldJ]={position:this.selectedCell.position,content:null};
        this.game[newI][newJ]={position:cell.position,content:this.selectedCell.content};     
        this.possiblePositionsToMove=[];
        if(cell.content){
            this.sendToJail(cell.content);
        }
        this.changeTurn();

        this.display();
    }
    changeTurn(){
        this.turn=this.turn=="white"?"black":"white"
        const curretTurnDisplay= document.getElementById("curretTurnDisplay");
        if(curretTurnDisplay){
            curretTurnDisplay.innerText=this.turn;
        }
    }
    sendToJail(piece:Piece){
        if(piece.color=="white"){
            this.whiteJail.sendToJail(piece);
        }else{
            this.blackJail.sendToJail(piece);
        }
    }


}

