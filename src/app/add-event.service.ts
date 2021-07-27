import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
  providedIn: 'root'
})
export class AddEventService {

  constructor() { }

  async search(s: String) {
    s = s.replace(' ', '');
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&type=series&s=' + s.replace(" ", "+"));
  }

  async getFromId(id: String) {
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&i=' + id);
  }
}
