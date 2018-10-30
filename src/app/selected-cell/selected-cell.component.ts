import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { cellStatus } from 'src/models/cell-status';


@Component({
  selector: 'app-selected-cell',
  templateUrl: './selected-cell.component.html',
  styleUrls: ['./selected-cell.component.scss']
})
export class SelectedCellComponent implements OnInit {
  gridArea: string;
  title: string;
  status:number;
  css:object = {'border-color': this.getRandomColor(), 'grid-area': ""};
  @ViewChild("btnSave") btnSave: ElementRef;
  @ViewChild('txtTitle') inputTitle: ElementRef;
  constructor() { 
    
  }

  ngOnInit() {
    this.status = cellStatus.selecting;
    
  }

  getColumnRowIndex(cellIndex:number, cols:number){
    let row = Math.ceil(cellIndex / cols);
    let col = cellIndex % cols;
    if(col === 0)
      col = cols;
    console.log(`Index ${cellIndex} row ${row} col ${col}`);
    
    return {row: row, col: col};
  }

  setGridArea(startCell, endCell, cols){
    let start = this.getColumnRowIndex(startCell, cols);
    let end = this.getColumnRowIndex(endCell, cols);
    this.gridArea = `${start.row}/${start.col}/${end.row + 1}/${end.col + 1}`;
    this.css['grid-area'] = this.gridArea;
    this.inputTitle.nativeElement.focus();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setTitle(event){
    if(event.keyCode === 13)
      this.saveGrid();
  }
  
  saveGrid(){
    this.title = this.inputTitle.nativeElement.value;
    this.inputTitle.nativeElement.disabled = true;
    this.status = cellStatus.assigned;
    this.btnSave.nativeElement.style.display = "none";
    
  }

  removeCell(cell){
    cell.style.display = "none";
    this.status = cellStatus.delete;
  }
}
