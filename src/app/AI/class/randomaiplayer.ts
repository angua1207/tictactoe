import { PlayerSymbol } from "../../enum/playerSymbol";
import { ITicTacToeAI } from "../interface/itictactoeai";

export class RandomAiPlayer implements ITicTacToeAI {
    
    public iaSymbol: PlayerSymbol;

    constructor(iaSymbol: PlayerSymbol) {
        this.iaSymbol = iaSymbol;
      }

    playMove(fullGrid: any [][], possibleMoves: { row: number; col: number; }[]): { row: number; col: number; } | null {
    if (possibleMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const { row, col } = possibleMoves[randomIndex];
      return { row, col };
    }
    return null;  
  }  
}
  