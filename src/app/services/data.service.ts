import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // different colors assignable to an event
  colors: any[] = ['#FF2626','#FF8C26', '#FBBC04', '#04F100', '#3390FF', '#AF6CFF', '#E334FF'];
  
  constructor() { }
}
