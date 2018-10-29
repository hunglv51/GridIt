import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { CommonModule } from '@angular/common';
import { SelectedCellComponent } from './selected-cell/selected-cell.component';
import { CellDirective } from './grid/cell.directive';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SelectedCellComponent,
    CellDirective
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  entryComponents: [SelectedCellComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
