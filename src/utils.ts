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

export function possibleMove(i:number,j:number):boolean{
    if(i >= 0 && i <= 7 && j >= 0 && j <= 7 ) {
        return true;
    }else{
        return false;
    }
}
