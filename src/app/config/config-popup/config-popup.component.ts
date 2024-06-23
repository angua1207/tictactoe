import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PlayerSymbol } from '../../enum/playerSymbol';
import { ConfigParameters } from '../models/config.model';


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
  protected configParams : ConfigParameters | undefined;
  protected gridSize = '3';
  protected playerSymbol = PlayerSymbol.X;

  constructor(public dialogRef: MatDialogRef<ConfigPopupComponent>) {}
  
  startGame() {    
    this.configParams!.gridSize = Number.parseInt(this.gridSize);
    this.configParams!.playerSymbol = this.playerSymbol;
    this.dialogRef.close({configParams : this.configParams });
  }
}