import { Injectable } from '@angular/core';
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  id: any;

  constructor() { }

  // tries getting a show(s) that match the search input
  async search(s: String) {
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&type=series&s=' + s.replace(" ", "+"));
  }

  // gets the data for the show with the specified id
  async getFromId(id: String) {
    this.getTVIDFromTMDB(id).then(res => {
      this.id = res.data.tv_results[0].id;
    });
    return await axios.get('https://www.omdbapi.com/?apikey=7d2ac513&i=' + id);
  }
  
  private async getTVIDFromTMDB(id: String) {
    return await axios.get('https://api.themoviedb.org/3/find/' + id + '?api_key=64b68dc32c64571d8de67b3d1c3abda7&language=en-US&external_source=imdb_id');
  }

  async getTVFromTMDB() {
    let id: number = this.id;
    return await axios.get('https://api.themoviedb.org/3/tv/' + id + '?api_key=64b68dc32c64571d8de67b3d1c3abda7&language=en-US');
  }
}
