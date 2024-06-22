import { PlayerSymbol } from "../enum/playerSymbol";

export class TicTacToeAI {
    
    public iaSymbol: PlayerSymbol;

    constructor(iaSymbol: PlayerSymbol) {
        this.iaSymbol = iaSymbol;
      }

    playMove(possibleMoves: { row: number, col: number }[]): { row: number, col: number } | null {
      if (possibleMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const { row, col } = possibleMoves[randomIndex];
        return { row, col };
      }
      return null;
    }
  }
  