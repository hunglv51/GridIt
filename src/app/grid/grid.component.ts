import { Component, Input, AfterViewChecked, ViewChild, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { CellDirective } from './cell.directive';

import { SelectedCellComponent } from '../selected-cell/selected-cell.component';
import { CellService } from '../cell.service';



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
  namedCells: Array<ComponentRef<SelectedCellComponent>>;
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
    
    
    if (this.startCell === 0) {
      this.startCell = cellIndex;
      this.paintSelectCell(this.startCell, this.startCell);
      
    }
    else{
      this.endCell = cellIndex;
      this.paintSelectCell(this.startCell, this.endCell);
    }
    

  }

  paintSelectCell(startCell: number, endCell: number) {
    
    if (this.selectingCell === undefined) {
      this.selectingCell = this.createSelectingSection();
      console.log(this.selectingCell);
      
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

  onSaveTitle(title){
    console.log();
  }
 
  
 
}
