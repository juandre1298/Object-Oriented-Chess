import { ChessPieceType } from "../types";

export class CrowningMenu {
    options: string[]; // Array to store the enum values
    

    constructor() {
        // Initialize options with enum values
        this.options = Object.values(ChessPieceType);
    }

    render(id:string) {
        // Example usage: log the options
        // alert("render")
        const crowningMenuElement = document.createElement("div");
        crowningMenuElement.className="crowningOptionsSection";

        for( let option of this.options){
            const cardElement:HTMLButtonElement = document.createElement("button");
            cardElement.innerText=option;
            cardElement.className="crowningOptionsCard";
            cardElement.onclick=()=>console.log(option+" clicket")
            crowningMenuElement.appendChild(cardElement);
        }
        

        document.getElementById(id)?.appendChild(crowningMenuElement);
    }
}
