import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  constructor() { }
  title:string;
  saveTitle(title:string){
    this.title = title;
    console.log("save title " + this.title);

  }

  getTitle (): Observable<string>{
    return of(this.title);
  }
}
