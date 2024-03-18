import type { cell,gameType } from "./types";
import { Board } from "./components/Board";
import { Piece, Rook, Knight, Bishop, King, Queen, Pawn } from "./components/Piece";
import { idToPos, posToId } from "./utils";
import { CrowningMenu } from "./components/CrowningMenu";


const gameBoard = document.getElementById("gameBoardSection") as HTMLDivElement;
gameBoard.className="boardSection"

let game:gameType= [];

// start game
const gameArrange:any[] = [Rook, Knight, Bishop,Queen,King,Bishop, Knight, Rook ]
for(let i:number = 0 ; i<8; i++){
  const column:cell[]=[];
  
  // column.push({position:posToId(i,0),content:new gameArrange[i]("white")});
  // column.push({position:posToId(i,1),content:new Pawn("white")});
  // for(let c:number = 2;c<6;c++){
  //   column.push({position:posToId(i,c).toString(),content:null});
  // }
  // column.push({position:posToId(i,6),content:new Pawn("black")});
  // column.push({position:posToId(i,7),content:new gameArrange[i]("black")});
  // game.push(column);

    for(let c:number = 0;c<8;c++){
    column.push({position:posToId(i,c).toString(),content:null});
  }
  game.push(column);

}
// remove f1 and g1
function removePiece(id:string){
  const pos = idToPos(id);
  game[pos[0]][pos[1]]={position:id,content:null};
}
// removePiece("d1");

game[6][6]={position:"g7",content:new Pawn("white")}

console.log(game)

const board = new Board(game);
const crowmingMenu = new CrowningMenu();
crowmingMenu.render("g8");