import { ChessPieceType,cell } from "../types";
import { Rook, Knight, Bishop, King, Queen, Pawn } from "./Piece";

export class CrowningMenu {
    options: string[]; // Array to store the enum values
    pawn: Pawn;
    cell:cell;
    
    constructor(pawn:Pawn,cell:cell) {
        // Initialize options with enum values
        this.options = Object.keys(ChessPieceType).filter(e=>e!=="King");
        this.pawn=pawn;
        this.cell=cell;
        this.render(this.cell.position);
        console.log(pawn,cell)
    }

    render(id:string) {
        // Example usage: log the options
        // alert("render")
        console.log("trying to render", id)
        const crowningMenuElement = document.createElement("div");
        crowningMenuElement.className="crowningOptionsSection";

        for( let option of this.options){
            const cardElement:HTMLButtonElement = document.createElement("button");
            cardElement.innerText=option;
            cardElement.className="crowningOptionsCard";
            cardElement.onclick=()=>this.transformPiece(option);
            crowningMenuElement.appendChild(cardElement);
        }
        

        document.getElementById(id)?.appendChild(crowningMenuElement);
    }
    transformPiece(option:string){
        console.log(option+" clicket")
        const gameArrange:any = {Queen, Rook,  Bishop, Knight, Pawn }
        this.cell.content = new gameArrange[option] (this.pawn.color);
    }
}
