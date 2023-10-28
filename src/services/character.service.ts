import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  searchCharacters(searchTerm: string) {
    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
    return this.http.get(apiUrl);
  }
}
