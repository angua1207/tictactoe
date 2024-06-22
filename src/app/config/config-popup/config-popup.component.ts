import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PlayerSymbol } from '../../enum/playerSymbol';


@Component({
  selector: 'app-configuration-popup',
  templateUrl: './config-popup.component.html',
  styleUrls: ['./config-popup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ConfigPopupComponent {
  protected gridSize = '3';
  protected playerSymbol = PlayerSymbol.X;

  constructor(public dialogRef: MatDialogRef<ConfigPopupComponent>) {}
  
  startGame() {    
    this.dialogRef.close({ gridSize: this.gridSize, playerSymbol: this.playerSymbol });
  }
}