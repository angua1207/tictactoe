import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigPopupComponent } from '../../config/config-popup/config-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  protected gridSize = 3;
  protected grid: any[][] = [];
  protected playerSymbol = '';
  public dialog = inject(MatDialog);

  ngOnInit() {
    this.initGrid();
    this.openConfigPopup();
  }

  openConfigPopup(): void {
    const dialogRef = this.dialog.open(ConfigPopupComponent, {
      width: '1000px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.gridSize = Number.parseInt(result.gridSize);        
        this.playerSymbol = result.playerSymbol;
        this.initGrid();
      } 
    });
  }

  initGrid() {
    this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(''));
  }

  handleClick(row: number, col: number) {
    if (this.grid[row][col] === '') {
      this.grid[row][col] = this.playerSymbol;
      if (this.calculateWinner()) {
        setTimeout(() => {
          alert(`${this.playerSymbol} wins!`);
          this.initGrid();
        }, 500);
      } else {
        this.playerSymbol = this.playerSymbol === 'X' ? 'O' : 'X';
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
}
