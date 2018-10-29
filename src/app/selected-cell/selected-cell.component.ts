import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { CellService } from '../cell.service';
import { GridComponent } from '../grid/grid.component';


@Component({
  selector: 'app-selected-cell',
  templateUrl: './selected-cell.component.html',
  styleUrls: ['./selected-cell.component.scss']
})
export class SelectedCellComponent implements OnInit {
  gridArea: string;
  title: string;
  @Input() gridTemplates: any[] = [];
  @Output() onSaveGrid: EventEmitter<any> = new EventEmitter();
  
  constructor(private cellService: CellService) { 
    
  }

  ngOnInit() {
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
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setTitle(event, title){
    if(event.keyCode === 13)
      this.saveGrid(title);
  }
  
  saveGrid(title){
    console.log(title);
    this.title = title;
  }
}
