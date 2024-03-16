import type { gameType } from "./types";

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

export function possibleMoves(currentPosition:number[],options:number[][][],game:gameType):{[key:string]: number[][]}{
    const optionsArray:number[][] = [];
    const colitionArray:number[][] = [];
    const color = game[currentPosition[0]][currentPosition[1]].content?.color;
    
    for(let direction of options ){
        let c:number=1;
        let i:number = direction[c][0];
        let j:number = direction[c][1];
        // console.log(direction[c])
        while(c<8 && i>=0 && i <8 && j>=0 && j <8){
            
            i = direction[c][0];
            j = direction[c][1];
            if(i>=0 && i <8 && j>=0 && j <8){
                // console.log(c,i,j,game[i][j].content)
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

function removeNext(i:number,j:number):boolean{

    return true
}