import { PlayerSymbol } from "../../enum/playerSymbol";

export interface ITicTacToeAI {
    iaSymbol: PlayerSymbol;
    playMove(fullGrid: any [][], possibleMoves: { row: number, col: number }[]): { row: number, col: number } | null;
}