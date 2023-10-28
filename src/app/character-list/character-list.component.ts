import { Component, OnInit, HostListener } from '@angular/core';
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
  page = 1; // present page
  loading = false;

  constructor(private characterService: CharacterService) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadCharacters();

    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy() {
    //Removes scroll watcher when component is destroyed
    window.removeEventListener('scroll', this.onScroll, true);
  }

  loadCharacters() {
    this.loading = true;

    this.characterService.getCharacters().subscribe(
      (data: any) => {
        const newCharacters = data['results'];
        this.characters = [...this.characters, ...newCharacters]; // adds new page of characters

        this.loading = false;
        this.page++; // Increase page for next load
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
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

  // Function to handle scroll event
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 &&
      !this.loading
    ) {
      this.loadCharacters(); // Load more characters by scrolling to the end
    }
  }
}
