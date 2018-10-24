import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input("rows") rows;
  @Input("cols") cols;
  constructor() { }
  startArea = {row: 0, col:0};
  endArea = {row: 0, col:0};
  ngOnInit() {
  }
  selectArea(rowIndex, colIndex){
    console.log(rowIndex, colIndex);

    if(this.startArea.row === 0){

    }
    else
    {

    }
  }

}
