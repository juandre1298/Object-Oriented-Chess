import type { Color,cell } from "../types";
import type { Knight, Piece } from "./Piece";
import { idToPos } from "../utils";

export class Jail{
    color:Color;
    counter:number;
    jail:cell[];

    constructor(color:Color){
        this.color=color;
        this.counter=0;
        this.jail=[];
        this.displayJail();


    }
    sendToJail(piece:Piece){
        const newCell = {position:"jail"+this.counter, content:piece}
        this.jail.push(newCell);
        this.counter++;
        this.displayJail();

    }
    displayJail(){
        const jailDisplaySection = document.getElementById(`${this.color}sJail`);

        if(jailDisplaySection){
            jailDisplaySection.innerHTML="";
        }
        this.jail.forEach((currentCell,i) =>{
            console.log(currentCell);
            if(currentCell && jailDisplaySection){
                let newCell = this.createEmptyCell(i);
                if(currentCell.content){
                    this.addPieceToEmptyCell(currentCell.content,newCell);
                }
                jailDisplaySection.appendChild(newCell);
            }
        })
    }
    createEmptyCell(i:number){
        const newCell = document.createElement("div");
        const id= i.toString();
        newCell.id= id;
        newCell.textContent=id;
        // newCell.addEventListener("click",()=>this.handleClick(id))
        switch (true) {
            case (i % 2 == 0):
                newCell.className = "black square";
                break;
            case (i % 2 != 0):
                newCell.className = "white square";
                break;
        }
        return newCell;
    }
    addPieceToEmptyCell(piece:Piece,emptyCell:HTMLDivElement){
        const pieceElement = document.createElement("div");
            pieceElement.id = piece.id;
            pieceElement.className = "piece";
            pieceElement.innerHTML=`<img src=${piece.url} alt=${piece.type+piece.id}/>`;
            emptyCell.appendChild(pieceElement);
    }
}