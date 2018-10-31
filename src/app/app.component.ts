import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grid-it';
  rows = [1, 2];
  cols = [1, 2, 3];
  gap = {row:0, col:0};
  @ViewChild(GridComponent) gridComponent: GridComponent;
  addRow() {
    this.rows.push(this.rows.length + 1);
    this.gridComponent.addNewRow();


  }
  addColumn() {
    this.cols.push(this.cols.length + 1);
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
    this.rows = [1, 2];
    this.cols = [1,2,3];
    this.gridComponent.grids = [1,2,3,4,5,6];
    this.gridComponent.removeAllCells();
    let inputs = document.getElementsByClassName('input');
    console.log(inputs);
    
    for(let i = 0;i < inputs.length;i++){
      inputs[i]["value"] = "";
    }
    // this.changeGap();
    this.gap = {row:0, col:0};
    this.changeGap();
  }

  getCode(frmNewPen, inputData){
    let data = this.gridComponent.getCodeData();
    console.log(data);
    inputData.value = JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    frmNewPen.submit();
    
  }
  changeRowSize(row, newSize){
    console.log(row);
    if(newSize === ""){
      newSize = "auto";
    }
    else{
      newSize += "px";
    }
    this.gridComponent.changeRowSize(row,newSize);
  }
  changeColSize(col, newSize){
    console.log(col);
    console.log(newSize);
    console.log(isNaN(newSize));
    
    if(newSize === ""){
      newSize = "auto";
    }
    else{
      newSize += "px";
    }
    this.gridComponent.changeColSize(col,newSize);
  }
  
  changeGap(){
    console.log(this.gap);
    
    this.gap.row = (this.gap.row === null) ? 0 : this.gap.row; 
    this.gap.col = (this.gap.col === null) ? 0 : this.gap.col;
    console.log(this.gap);
    
    this.gridComponent.gap = this.gap;

    this.gridComponent.updateUI();
  }

}
