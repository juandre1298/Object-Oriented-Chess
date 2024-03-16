import type { Piece } from "./Piece";
import type { gameType, movingOptionsType, cell } from "../types";
import { idToPos } from "../utils";


export class Board {
    size:number;
    jail:Piece[];
    game:gameType;
    selectedCell:cell;

    constructor(game:gameType){
        this.size=8;
        this.jail=[];
        this.game=game;
        this.selectedCell={position: "i9", content: null};
        this.display();
        
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
        
        this.selectedCell=this.game[column][row];
        if(content!=null){
            this.clickedPiece();
        }else{
            this.clickedEmptyCell(id);
        }
    }
    clickedPiece(){
            const id=this.selectedCell.position;
            const piece=this.selectedCell.content;
            const selectedElement = document.getElementById(id);
            if(selectedElement && piece){
                if(selectedElement.className.includes(" selected")){
                    selectedElement.className=selectedElement.className.replace(" selected","");
                    const possiblePositions:movingOptionsType = piece.movingOptions(id,this.game);
                    if(possiblePositions){
                        this.displayOptions(possiblePositions.optionsArray);
                        this.treatedOptions(possiblePositions.colitionArray)
                    }
                }else{
                    selectedElement.className+=" selected";
                    const possiblePositions:movingOptionsType = piece.movingOptions(id,this.game);
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


}

