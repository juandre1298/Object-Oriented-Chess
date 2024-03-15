export function uid(){
    return Date.now().toString(36) + Math.random().toString(36);
}
export function idToPos(id:string){
    const column:number= id[0].charCodeAt(0)-97;
    const row:number = parseInt(id[1])-1;
        return [column,row];
}
export function posToId(i:number,j:number){
    return String.fromCharCode(97+i)+(j+1).toString();
};