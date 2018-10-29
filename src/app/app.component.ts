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
    this.rows.push("");
    this.gridComponent.addNewRow();


  }
  addColumn() {
    this.cols.push("");
    this.gridComponent.addNewColumn();

  }
  removeRow() {
    this.rows.pop();
    this.gridComponent.removeRow();

  }
  removeColumn() {
    this.cols.pop();
    this.gridComponent.removeColumn();

  }
  reset(){
    this.rows = ["", ""];
    this.cols = ["", "", ""];
    this.gridComponent.grids = [1,2,3,4,5,6];
    
  }


}
