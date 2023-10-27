import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacters().subscribe(
      (data: any) => {
        this.characters = data['results']; // Access the 'results' property directly
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
