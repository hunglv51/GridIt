import { Component, Input, AfterViewChecked, ViewChild, ComponentRef, ComponentFactoryResolver, AfterViewInit, OnInit } from '@angular/core';
import { CellDirective } from './cell.directive';
import { SelectedCellComponent } from '../selected-cell/selected-cell.component';
import { cellStatus } from 'src/models/cell-status';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewChecked, OnInit {
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
  @Input("gap") gap: object;
  css: object;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {    
  }
  
  ngOnInit(){
    this.updateUI();
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
          this.startCell = 0;
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
    this.css['grid-template-rows'] = this.getSizeTemplate(this.rows + 1);
    let gridSize = this.grids.length;
    for (let i = gridSize + 1; i <= gridSize + this.cols; i++) {
      this.grids.push(i);
    }
  }

  addNewColumn() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    this.css['grid-template-columns'] = this.getSizeTemplate(this.cols + 1);
    let gridSize = this.grids.length;
    for (let i = gridSize + 1; i <= gridSize + this.rows; i++) {
      this.grids.push(i);
    }
  }

  removeRow() {
    console.log("Rows " + this.rows);
    console.log("Cols " + this.cols);
    this.css['grid-template-rows'] = this.getSizeTemplate(this.rows - 1);
    for (let i = 0; i < this.cols; i++) {
      this.grids.pop();
    }
  }

  removeColumn() {
    console.log("Rows " + this.rows)
    console.log("Cols " + this.cols)
    this.css['grid-template-columns'] = this.getSizeTemplate(this.cols - 1);
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

  getSizeTemplate(num) {
    let sizeTemplate = "";
    for (let i = 0; i < num; i++) {
      sizeTemplate += "auto ";
    }
    return sizeTemplate;
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
    this.cols = 3;
    this.rows = 2;
    if(this.selectingCell != undefined){
      this.selectingCell.destroy();
      this.selectingCell = undefined;
    }
    console.log(`On removing with row ${this.rows} and col ${this.cols}`);
    this.updateUI();

    this.gridTemplate = [];
  }

  updateUI(){
    this.css = {
      'grid-template-columns':this.getSizeTemplate(this.cols),
      'grid-template-rows': this.getSizeTemplate(this.rows),
      'grid-gap': `${this.gap["row"]}px ${this.gap["col"]}px`
      
    }
  }


  getCodeData(){
    if(this.selectCell != undefined && this.selectingCell.instance.status === cellStatus.assigned)
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
      grid-template-columns: ${this.css["grid-template-columns"]};
      grid-template-rows: ${this.css["grid-template-rows"]};
      grid-template-areas:${this.gridTemplate.map(x => '"' + x.join(" ") + '"').join(" ")};
      grid-gap: ${this.css["grid-gap"]};
    }
    ` + this.namedCells.map(x => {
      let gridArea = x.instance.title;
      if(this.isOverrided(gridArea)){
        gridArea = x.instance.gridArea;
      }
      return `.${x.instance.title}{grid-area: ${gridArea};}`
    }).join('\n');
    
    ;
  }

  isOverrided(title){
    return !this.gridTemplate.reduce((x,y) => x.concat(y)).includes(title);
  }
  changeRowSize(row, newSize){
    let arrTemplateRows = this.css["grid-template-rows"].trim().split(" ");
    arrTemplateRows[row * 1 - 1] = newSize + "px";
    this.css["grid-template-rows"] = arrTemplateRows.join(" "); 
    
  }
  changeColSize(col, newSize){
    let arrTemplateCols = this.css["grid-template-columns"].trim().split(" ");
    arrTemplateCols[col * 1 - 1] = newSize + "px";
    this.css["grid-template-columns"] = arrTemplateCols.join(" ");
  }

}
