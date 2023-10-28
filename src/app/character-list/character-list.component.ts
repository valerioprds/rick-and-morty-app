import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacterService } from 'src/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  searchForm: FormGroup;

  constructor(private characterService: CharacterService) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
    });
  }

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

  search() {
    const searchQuery = this.searchForm.get('searchQuery')!.value.toLowerCase();
    this.characterService.getCharacters().subscribe(
      (data: any) => {
        const allCharacters = data['results'];
        if (searchQuery) {
          this.characters = allCharacters.filter((character: any) => {
            //Here you can define filtering logic, for example searching on name or other properties
            // In this example, filter by character name
            return character.name.toLowerCase().includes(searchQuery);
          });
        } else {
          //If no search term was entered, displays all characters
          this.characters = allCharacters;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
