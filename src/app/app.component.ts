import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-it';
  rows = ["", ""];
  cols = ["", "", ""];
  @ViewChild(GridComponent) gridComponent: GridComponent;
  addRow() {
    this.gridComponent.addNewRow();
    this.rows.push("");


  }
  addColumn() {
    this.gridComponent.addNewColumn();
    this.cols.push("");
  }
  removeRow() {
    this.gridComponent.removeRow();
    this.rows.pop();
  }
  removeColumn() {
    this.gridComponent.removeColumn();
    this.cols.pop();
  }
  reset(){
    
  }
}
