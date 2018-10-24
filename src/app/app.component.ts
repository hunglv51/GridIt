import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-it';
  rows = ["",""];
  cols = ["","",""];
  @ViewChild(GridComponent) gridComponent: GridComponent;
  addRow(){
      // this.gridComponent.rows.push("");
      this.rows.push("");
  }
  addColumn(){
    // this.gridComponent.cols.push("");
    this.cols.push("");
  }
  removeRow(){
    // this.gridComponent.rows.push("");
    this.rows.pop();
}
removeColumn(){
  // this.gridComponent.cols.push("");
  this.cols.pop();
}
}
