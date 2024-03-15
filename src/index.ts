import type { cell,gameType } from "./types";
import { Pawn } from "./components/Piece";
import { Board } from "./components/Board";
import { Piece, Rook, Knight, Bishop, King, Queen } from "./components/Piece";
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
  for(let c:number = 3;c<7;c++){
    column.push({position:posToId(i,c).toString(),content:null});
  }
  column.push({position:posToId(i,6),content:new Pawn("black")});
  column.push({position:posToId(i,7),content:new gameArrange[i]("black")});
  game.push(column);
}
console.log(game)
const board = new Board(game);