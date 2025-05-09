import { Piece, King, Rook, Pawn } from "./Piece";
import type { Color,gameType, ChessPieceType, movingOptionsType, cell } from "../types";
import { idToPos, cloneGame, checkIquality } from "../utils";
import { Jail } from "./Jail";
import { CrowningMenu } from "./CrowningMenu";


export class Board {
    size:number;
    game:gameType;
    previousState:gameType;
    started:boolean;
    turn:Color;
    selectedCell:cell;
    possiblePositionsToMove:string[];
    whiteJail:Jail;
    blackJail:Jail;
    


    constructor(game:gameType){
        this.started = false;
        this.size=8;
        this.game=game;
        this.previousState=cloneGame(game);
        console.log(game)
        this.selectedCell={position: "i9", content: null};
        this.turn="white";
        this.display();
        this.possiblePositionsToMove=[];
        this.whiteJail=new Jail("white");
        this.blackJail=new Jail("black");
        
    }

    display(){
        const boardDisplaySection = document.getElementById("gameBoardSection");
        if(boardDisplaySection && !this.started){
            boardDisplaySection.innerHTML="";
            this.firstRender(boardDisplaySection);
            this.started= true;
        }else{
            this.updateRender(boardDisplaySection);
        }

    }
    firstRender(boardDisplaySection:HTMLElement){
        this.game.forEach((column,i) =>{
            const columnDiv = document.createElement("div");
            columnDiv.className="boardColumn"
            column.forEach(
                (cell,j) => {
                    let newCell = this.createEmptyCell(cell.position)
                    // add piece
                    if (cell.content != null){
                        this.addPieceToEmptyCell(cell,newCell);
                    }
                    columnDiv.appendChild(newCell)
                } 
            )
            boardDisplaySection?.appendChild(columnDiv);                            
        })
    }
    updateRender(boardDisplaySection:HTMLElement|null){
        console.log('updating board');
        this.game.forEach((column,i) =>{
            column.forEach(
                (cell,j) => {
                    if(!checkIquality(this.previousState[i][j], cell)){
                        console.log({i,j,log: 'have changed'})
                        this.emptyCell(cell.position);
                        let newCell = document.getElementById(cell.position)
                        // add piece
                        if(newCell){
                            if (cell.content != null){
                                this.addPieceToEmptyCell(cell,newCell);
                            }
                        }   
                    }
                } 
            )
                           
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
    emptyCell(position:string){
        const [i,j]=idToPos(position);
        const cellElement = document.querySelector(`#${position} .piece`);
        cellElement?.remove();


        // newCell.id= id;
        // newCell.textContent=id;
        // newCell.addEventListener("click",()=>this.handleClick(id))
        // switch (true) {
        //     case (i % 2 == 0 && j % 2 == 0):
        //         newCell.className = "black square";
        //         break;
        //     case (i % 2 == 0 && j % 2 != 0):
        //         newCell.className = "white square";
        //         break;
        //     case (i % 2 != 0 && j % 2 == 0):
        //         newCell.className = "white square";
        //         break;
        //     case (i % 2 != 0 && j % 2 != 0):
        //         newCell.className = "black square";
        //         break;
        // }
        // return newCell;
    }
    addPieceToEmptyCell(cell:cell,emptyCell:HTMLElement){
        if(!emptyCell) return 
        const pieceElement = document.createElement("div");
        pieceElement.addEventListener("click",(event:MouseEvent)=>event.stopPropagation());
        pieceElement.style.pointerEvents = 'none';
        const [i,j]=idToPos(cell.position);
        if(cell.content){
            const piece = cell.content
            pieceElement.id = cell.content.id;
            piece
            pieceElement.className = "piece "+cell.content.type;
            const zIndex =100+(8-j);
            pieceElement.style.zIndex = zIndex.toString()
            pieceElement.innerHTML=`<img src=${piece.url} alt=${piece.type+piece.id}/>`;
            emptyCell.appendChild(pieceElement);
        }

    }
    handleClick(id:string){
        const [column,row]=idToPos(id);
        const content=this.game[column][row].content;
        if(id!=this.selectedCell.position && content){
            this.display();
        }
        //this.displaySelectedPiece(this.game[column][row]);
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
    }
    createColorScreen(cellElement:HTMLElement,className:string){
        const screen = document.createElement("div") as HTMLDivElement;
        screen.className=className+" square filter";
        cellElement?.appendChild(screen);
        
    }
    clickedPiece(){
            const id=this.selectedCell.position;
            const piece=this.selectedCell.content;
            const selectedElement = document.getElementById(id);
            if(selectedElement && piece){
                const possiblePositions:movingOptionsType = piece.movingOptions(id,this.game);
                this.possiblePositionsToMove=[...possiblePositions.colitionArray,...possiblePositions.optionsArray];
                
                if(selectedElement.getElementsByClassName("selected").length != 0){
                    const selectedElementScreen = selectedElement.getElementsByClassName("selected")[0];
                    selectedElement.removeChild(selectedElementScreen);
                    if(possiblePositions){
                        this.displayOptions(possiblePositions.optionsArray);
                        this.treatedOptions(possiblePositions.colitionArray)
                    }
                }else{
                    this.createColorScreen(selectedElement,"selected");

                    if(possiblePositions){
                        this.displayOptions(possiblePositions.optionsArray);
                        this.treatedOptions(possiblePositions.colitionArray)

                    }
                }
                //check if king can castle
                if(piece instanceof King){
                    const castlingOptions = piece.checkIfcastling(this.game);
                    if (castlingOptions.length>0){
                        this.displayOptions(castlingOptions);
                        this.possiblePositionsToMove.push(...castlingOptions);
                    }
                }
            }else{
              alert("id doesn't found"+id)
            }   
    }
    clickedEmptyCell(id:string) {
        
        const selectedElement = document.getElementById(id);
        this.possiblePositionsToMove = [];
  
        if (selectedElement) {
            if (selectedElement.classList.contains("empty2")) {
                selectedElement.classList.remove("empty2");
            } else {
                selectedElement.classList.add("empty2");
               
                 setTimeout(() => {
                     this.display();
                 }, 200);
            }
        } else {
            alert("id not found: " + id);
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
                    this.createColorScreen(selectedElement,"option");
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
        this.previousState=structuredClone(this.game);
        this.selectedCell.content?.registerMoveInPieceHistory();

        
        const [oldI,oldJ]=idToPos(this.selectedCell.position);
        const [newI,newJ]=idToPos(cell.position);
        this.game[oldI][oldJ]={position:this.selectedCell.position,content:null};
        this.game[newI][newJ]={position:cell.position,content:this.selectedCell.content};     
        this.possiblePositionsToMove=[];
        if(cell.content){
            this.sendToJail(cell.content);
        }
        if(this.selectedCell.content && this.selectedCell.content instanceof King){
            const canCast = this.selectedCell.content.checkIfcastling(this.game)
            if(canCast){
                this.castling(cell.position);
            }
        }
        if( this.selectedCell.content && 
            this.selectedCell.content instanceof Pawn &&
            ((this.selectedCell.content.color=="white" && newJ == 7) ||
            (this.selectedCell.content.color=="black" && newJ == 0))
            ){
                const crowingOptions = new CrowningMenu(this.selectedCell.content,this.game[newI][newJ]);
        }else{
            this.display();
        }
        this.changeTurn();
        
    }
    castling(castlingPosition:string){
        if(castlingPosition=="g1"){
            
            this.game[5][0]={position:"f1",content:this.game[7][0].content};
            this.game[7][0]={position:"h1",content:null};            
        }
        if(castlingPosition=="c1"){
            this.game[3][0]={position:"d1",content:this.game[0][0].content};
            this.game[0][0]={position:"a1",content:null};            
        }
        if(castlingPosition=="g8"){
            this.game[5][7]={position:"f8",content:this.game[7][7].content};
            this.game[7][7]={position:"h8",content:null};            
        }
        if(castlingPosition=="c8"){
            this.game[3][7]={position:"d8",content:this.game[0][7].content};
            this.game[0][7]={position:"a8",content:null};            
        }

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
        if(piece instanceof King){
            this.killTheKing(piece.color)
        }
    }
    killTheKing(color:Color){
        alert(color+" king got killed!");
        
    }


}

