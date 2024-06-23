import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GridSize, PlayerSymbol } from '../../enum/playerSymbol';
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
  protected configParams: ConfigParameters = new ConfigParameters();
  
  constructor(public dialogRef: MatDialogRef<ConfigPopupComponent>) { }

  startGame() {
    this.dialogRef.close(this.configParams);
  }

  PlayerSymbol = PlayerSymbol;
  GridSize = GridSize;
}