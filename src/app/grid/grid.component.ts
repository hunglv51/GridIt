import { Component, Input, AfterViewChecked, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { CellDirective } from './cell.directive';

import { SelectedCellComponent } from '../selected-cell/selected-cell.component';
import { cellStatus } from 'src/models/cell-status';




@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewChecked {
  @Input("rows") rows: number;
  @Input("cols") cols: number;
  @ViewChild("gridContainer") gridContainer;
  @ViewChild(CellDirective) selectedCells: CellDirective;
  grids = [];
  gridTemplate = [];
  startCell: number = 0;
  endCell: number = 0;
  namedCells: Array<ComponentRef<SelectedCellComponent>> = [];
  selectingCell: ComponentRef<SelectedCellComponent> = undefined;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {    
  }
  
  ngAfterViewChecked() {
    if (this.grids.length === 0) {
      this.initGrids();
    }
  }

  selectCell(cellIndex : number) {
    console.log("Cell " + cellIndex + " is selected");
    if(this.selectingCell != undefined){
      switch(this.selectingCell.instance.status){
        case cellStatus.delete:
          this.selectingCell.destroy();
          this.selectingCell = undefined;
          break;
        case cellStatus.assigned:
          this.namedCells.push(this.selectingCell);
          this.selectingCell = undefined;
          this.startCell = 0;
          
          break;
        default:
          break;
      }
    }
    
    if (this.startCell === 0) {
      this.startCell = this.endCell = cellIndex;
      this.paintSelectCell(this.startCell, this.endCell);
      
    }
    else{
      this.endCell = cellIndex;
      this.paintSelectCell(this.startCell, this.endCell);
    }
    

  }

  paintSelectCell(startCell: number, endCell: number) {
   
    if (this.selectingCell === undefined) {
      this.selectingCell = this.createSelectingSection();
      console.log('create new selecting cell');
      
    }
    this.selectingCell.instance.setGridArea(startCell, endCell, this.cols);
    
  }
  


 
 
  //#region  grid ulti
  addNewRow() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    let gridSize = this.grids.length;
    for (let i = gridSize + 1; i <= gridSize + this.cols; i++) {
      this.grids.push(i);
    }
  }

  addNewColumn() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    let gridSize = this.grids.length;
    for (let i = gridSize + 1; i <= gridSize + this.rows; i++) {
      this.grids.push(i);
    }
  }

  removeRow() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    for (let i = 0; i < this.cols; i++) {
      this.grids.pop();
    }
  }

  removeColumn() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    for (let i = 0; i < this.rows; i++) {
      this.grids.pop();
    }
  }

  initGrids() {
    console.log(this.rows);
    console.log(this.cols);
    for (let i = 1; i <= this.rows * this.cols; i++) {
      this.grids.push(i);
    }
    console.log(this.grids);
  }
  //#endregion

  getColumnTemplate(numCols) {
    let colTemplate = "";
    for (let i = 0; i < numCols; i++) {
      colTemplate += "auto ";
    }
    return colTemplate;
  }

  createSelectingSection() {
    
    
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectedCellComponent);
    console.log(this.selectedCells);
    
    let viewContainerRef = this.selectedCells.viewContainerRef;
    let selectingSection = viewContainerRef.createComponent(componentFactory);
    
    return selectingSection;
  }

  removeAllCells(){
    this.namedCells.forEach(x => x.destroy());
    this.namedCells = [];
    this.selectingCell.destroy();
    this.selectingCell = undefined;
    this.gridTemplate = [];
  }

  getCodeData(){
    if(this.selectingCell.instance.status === cellStatus.assigned)
      {
        this.namedCells.push(this.selectingCell);
        this.selectingCell = undefined;
        this.startCell = 0;
      }
    this.gridTemplate = [];
    for(let i = 0;i < this.rows;i++){
      this.gridTemplate.push('.'.repeat(this.cols).split(""));
    }
    
    this.namedCells.forEach(x => {
      console.log(x.instance.title);
      let start = {row:"", col:""};
      let end = {row:"", col:""};
      [start.row, start.col, end.row, end.col] = x.instance.gridArea.split("/");
      this.setGridArea(start, end, x.instance.title);
    });
    console.table(this.gridTemplate);
    console.log(this.getGridHTML());
    console.log(this.getGridCSS());
    return {
      title: "New Pen",
      html: this.getGridHTML(),
      css: this.getGridCSS(),
      js:""
    };
    
  }
  setGridArea(start, end, title){
    for(let i = start.row - 1;i < end.row - 1;i++){
      for(let j = start.col - 1;j < end.col - 1;j++){
        this.gridTemplate[i][j] = title;
      }
    }
  }
 
  getGridHTML(){
    let rootHtml = document.createElement('div');
    let container = document.createElement('div');
    container.setAttribute('class','grid-container');
    this.namedCells.forEach(x => {
      let cell = document.createElement('div');
      cell.setAttribute('class', x.instance.title);
      cell.innerText = x.instance.title;
      container.appendChild(cell);
    });
    rootHtml.appendChild(container);
    return rootHtml.innerHTML;
    
  }
  getGridCSS(){
    
    console.log(this.gridTemplate);
    
    return `
    html,
    body {
      margin: 0;
      height: 100%;
    }
    .grid-container div{
      border: 1px solid black;
    }
    
    .grid-container{
      height:100%;
      display:grid;
       grid-template-areas:${this.gridTemplate.map(x => '"' + x.join(" ") + '"').join(" ")};
    }
    ` + this.namedCells.map(x => {
      return `.${x.instance.title}{grid-area: ${x.instance.title};}`
    }).join('\n');
    
    
    
    ;
  }

}
