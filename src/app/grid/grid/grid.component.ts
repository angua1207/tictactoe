import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigPopupComponent } from '../../config/config-popup/config-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerSymbol, EmptySymbol, GridContent, GridSize } from '../../enum/playerSymbol';
import { RandomAiPlayer } from '../../AI/class/randomaiplayer';
import { map } from 'rxjs';
import { ConfigParameters } from '../../config/models/config.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  protected isAITurn = true;

  protected gridSize = Number.parseInt(GridSize.Three);
  protected grid: GridContent[][] = [];
  protected playerSymbol = PlayerSymbol.X;
  protected randomAiPlayer: RandomAiPlayer | undefined;
  protected currentPlayer = PlayerSymbol.X;

  public dialog = inject(MatDialog);

  ngOnInit() {
    this.initGame();
  }

  initGame() {
    this.initGrid();
    this.openConfigPopup();
  }

  initGrid() {
    this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(EmptySymbol));
  }

  openConfigPopup(): void {
    const dialogRef = this.dialog.open(ConfigPopupComponent, {
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ConfigParameters | undefined) => {
      if (result) {
        this.gridSize = result.getGridSize();
        this.playerSymbol = result.getPlayerSymbol();
        this.randomAiPlayer = new RandomAiPlayer(result.getSecondPlayerSymbol());
        this.currentPlayer = this.randomAiPlayer.iaSymbol;
        this.initGrid();
        this.iaMakeAMove();
      }
    });
  }

  makeAMove(row: number, col: number) {
    if (this.grid[row][col] !== EmptySymbol) {
      return;
    }
    this.grid[row][col] = this.isAITurn ? this.randomAiPlayer?.iaSymbol : this.playerSymbol;

    if (this.calculateWinner()) {
      setTimeout(() => {
        alert(`${this.isAITurn ? this.randomAiPlayer?.iaSymbol : this.playerSymbol} wins!`);
        this.initGame();
      }, 500);
      return;
    }

    if (this.isDraw()) {
      setTimeout(() => {
        alert("It's a draw!");
        this.initGame();
      }, 500);
      return;
    }

    this.isAITurn = !this.isAITurn;
    this.currentPlayer = this.isAITurn ? this.randomAiPlayer!.iaSymbol : this.playerSymbol;

    if (this.isAITurn) {
      setTimeout(() => {
        this.iaMakeAMove();
      }, 1000);
    }
  }


  iaMakeAMove() {
    this.isAITurn = true;
    const possibleMoves = this.getPossibleMoves();
    if (possibleMoves.length > 0) {
      const nextMove = this.randomAiPlayer?.playMove(this.grid, possibleMoves);
      if (nextMove) {
        this.makeAMove(nextMove.row, nextMove.col);
      }
    }
  }


  calculateWinner(): string | null {
    const size = this.gridSize;

    // Check rows
    for (let i = 0; i < size; i++) {
      const firstCell = this.grid[i][0];
      if (firstCell && this.grid[i].every(cell => cell === firstCell)) {
        return firstCell;
      }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
      const firstCell = this.grid[0][i];
      if (firstCell && this.grid.every(row => row[i] === firstCell)) {
        return firstCell;
      }
    }

    // Check main diagonal
    const mainDiagonalFirstCell = this.grid[0][0];
    if (mainDiagonalFirstCell && this.grid.every((row, index) => row[index] === mainDiagonalFirstCell)) {
      return mainDiagonalFirstCell;
    }

    // Check anti-diagonal
    const antiDiagonalFirstCell = this.grid[0][size - 1];
    if (antiDiagonalFirstCell && this.grid.every((row, index) => row[size - 1 - index] === antiDiagonalFirstCell)) {
      return antiDiagonalFirstCell;
    }

    return null;
  }
  isDraw(): boolean {
    return this.getPossibleMoves().length === 0;
  }

  getPossibleMoves(): { row: number, col: number }[] {
    let possibleMoves: { row: number, col: number }[] = [];
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (this.grid[row][col] === EmptySymbol) {
          possibleMoves.push({ row, col });
        }
      }
    }
    return possibleMoves;
  }
}
