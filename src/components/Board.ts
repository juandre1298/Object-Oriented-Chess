import type { Piece } from "./Piece";
import type { gameType } from "../types";
import { idToPos } from "../utils";


export class Board {
    size:number;
    jail:Piece[];
    game:gameType;

    constructor(game:gameType){
        this.size=8;
        this.jail=[];
        console.log(game)
        this.game=game;
        this.display()
    }

    display(){
        const boardDisplaySection = document.getElementById("gameBoardSection");
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
        console.log("piece",piece)
        const pieceElement = document.createElement("div");
            pieceElement.id = piece.id;
            pieceElement.className = "piece";
            pieceElement.innerHTML=`<img src=${piece.url} alt=${piece.type+piece.id}/>`;
            // Set class or other attributes based on piece type if needed
            emptyCell.appendChild(pieceElement);
    }
    handleClick(id:string){
        const [column,row]=idToPos(id);
        console.log("handleClick",id,column,row,this.game[column][row].content);
        const content=this.game[column][row].content;
        if(content!=null){
            this.clickedPiece(id,content);
        }else{
            this.clickedEmptyCell(id);
        }
    }
    clickedPiece(id:string,piece:Piece){
            const selectedElement = document.getElementById(id);
            if(selectedElement){
                if(selectedElement.className.includes(" selected")){
                    selectedElement.className=selectedElement.className.replace(" selected","");
                    const possiblePositions:string[] = piece.movingOptions(id);
                    if(possiblePositions){
                        this.displayOptions(possiblePositions);
                    }
                }else{
                    selectedElement.className+=" selected";
                    const possiblePositions:string[] = piece.movingOptions(id);
                    if(possiblePositions){
                        this.displayOptions(possiblePositions);
                    }

                }
            }else{
                alert("id doesn't found"+id)
            }   
    }
    clickedEmptyCell(id:string){
        const selectedElement = document.getElementById(id);
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


}

