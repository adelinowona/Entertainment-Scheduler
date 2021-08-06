import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // tries getting a show(s) that match the search input
  async search(s: String) {
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&type=series&s=' + s.replace(" ", "+"));
  }

  // gets the data for the show with the specified id
  async getFromId(id: String) {
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&i=' + id);
  }
}
