import type { gameType,cell } from "./types";

export function uid(){
    return Date.now().toString(36) + Math.random().toString(36);
}
export function idToPos(id:string){
    const column:number= id[0].charCodeAt(0)-97;
    const row:number = parseInt(id[1])-1;
        return [column,row];
}
export function posToId(i:number,j:number):string{
    return String.fromCharCode(97+i)+(j+1).toString();
};
export function cloneGame(game:gameType){
    return game.map(row => 
        row.map(cell => ({
            position: cell.position,
            content: cell.content 
            ? Object.assign(Object.create(Object.getPrototypeOf(cell.content)), cell.content)
            : null
        }))
        );
}
export function checkIquality(cell1: cell, cell2: cell) {
    if (cell1 === cell2) return true; // same reference or both null
    if (!cell1.content && !cell2.content) return true;
    if (!cell1.content || !cell2.content) return false; // one is null, the other isn’t
  
    return (
      cell1.position === cell2.position &&
      cell1.content.id === cell2.content.id &&
      cell1.content.color === cell2.content.color &&
      cell1.content.type === cell2.content.type
      // Add more properties if needed
    );
  }