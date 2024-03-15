import type { Piece } from "./components/Piece";

export enum ChessPieceType {
    Knight = "knight",
    Queen = "queen",
    King = "king",
    Bishop = "bishop",
    Rook = "rook",
    Pawn = "pawn"
}

export interface cell{
    position: string;
    content: Piece | null;
};

export type Color = "black"|"white";

export type gameType=cell[][];