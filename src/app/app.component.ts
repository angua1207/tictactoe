import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from "./grid/grid/grid.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, GridComponent, CommonModule, FormsModule]
})
export class AppComponent {
  title = 'tictactoe';
}
