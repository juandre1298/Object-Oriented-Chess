import type { cell,gameType } from "./types";
import { Board } from "./components/Board";
import { Piece, Rook, Knight, Bishop, King, Queen, Pawn } from "./components/Piece";
import { posToId } from "./utils";


const gameBoard = document.getElementById("gameBoardSection") as HTMLDivElement;
gameBoard.className="boardSection"

let game:gameType= [];

// start game
const gameArrange:any[] = [Rook, Knight, Bishop, King, Queen,Bishop, Knight, Rook ]
for(let i:number = 0 ; i<8; i++){
  const column:cell[]=[];
  
  column.push({position:posToId(i,0),content:new gameArrange[i]("white")});
  column.push({position:posToId(i,1),content:new Pawn("white")});
  for(let c:number = 2;c<6;c++){
    column.push({position:posToId(i,c).toString(),content:null});
  }
  column.push({position:posToId(i,6),content:new Pawn("black")});
  column.push({position:posToId(i,7),content:new gameArrange[i]("black")});
  game.push(column);
}
game[4][5]={position:posToId(4,5),content: new Rook("white")}
game[3][4]={position:posToId(3,4),content: new Knight("white")}
game[4][3]={position:posToId(4,3),content: new Queen("white")}

const board = new Board(game);
