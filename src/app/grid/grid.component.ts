import { Component, Input, AfterViewChecked } from '@angular/core';
import { Grid } from 'src/models/grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewChecked {
  @Input("rows") rows: number;
  @Input("cols") cols: number;
  grids = [];
  startGrid: Grid;
  endGrid: Grid;
  constructor() {

  }
  ngAfterViewChecked() {
    if (this.grids.length === 0) {
      this.initGrids();
    }
  }
  selectArea(rowIndex, colIndex, event) {
    if(event.toElement.nodeName === "DIV"){
      if(this.startGrid === undefined)
      {
        this.startGrid = new Grid(rowIndex, colIndex, "");
        this.selectGrid(this.startGrid, this.startGrid);
      }
      else
      {
        this.endGrid = new Grid(rowIndex, colIndex, "");
        this.selectGrid(this.startGrid, this.endGrid);
      } 
    }
  }

  selectGrid(startGrid: Grid, endGrid: Grid){
    let color = this.getRandomColor();
    let elements = document.getElementsByClassName("grid-element");
    let startElement = elements[(startGrid.noRow - 1) * this.cols + startGrid.noCol - 1];
    let formContainer = startElement.getElementsByClassName("form-container")[0];
    formContainer.setAttribute("class", "form-container");
    for(let row = startGrid.noRow;row <= endGrid.noRow;row++){
      for(let col = startGrid.noCol;col <= endGrid.noCol;col++){
        let element = elements[(row - 1) * this.cols + col - 1]
        element.setAttribute("style", "background-color: " + color);
      }

    }
    
  }

  setTitle(event, title){
    if(event["keyCode"] === 13)
    {
      this.saveGrid(title);
    }
    
  }

  saveGrid(title){
    console.log("Save Grid");
    console.log(title);
    if(title.value != "")
    {
      title.readOnly = true;
      this.startGrid = undefined;
      this.endGrid = undefined;
    }
    else{

    }
  }

   getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  //#region  grid ulti
  addNewRow() {
    let newRow = [];
    for (let i = 0; i < this.cols; i++) {
      newRow.push(i + 1);
    }
    this.grids.push(newRow);
    console.log(this.grids);

  }

  addNewColumn() {
    this.grids.forEach(x => x.push(this.cols + 1));
    console.log(this.grids);

  }

  removeRow() {
    this.grids.pop();
    console.log(this.grids);

  }

  removeColumn() {
    this.grids.forEach(x => x.pop());
    console.log(this.grids);

  }

  initGrids() {
    console.log(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.addNewRow();

    }
    console.log(this.grids);
  }
  //#endregion

}
