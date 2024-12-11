import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PokemonService } from '../../services/pokemon.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  animations: [
    trigger('hoverAnimation', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('default <=> hovered', animate('150ms ease-in-out')),
    ]),
  ],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 20;
  searchTerm: string = '';
  animateCard = false;
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private pokemonService: PokemonService) {}

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe((data: any) => {
      this.pokemons = [...this.pokemons, ...data.results];
    });
  }

  loadMore(): void {
    this.offset += this.limit;
    this.loadPokemons();
  }

  searchPokemon(): void {
    if (this.searchTerm) {
      this.pokemons = [];
      this.pokemonService.getPokemonDetails(this.searchTerm.toLowerCase()).subscribe(
        (data: any) => {
          console.log('Pokémon found', data);
          this.pokemons = [{ name: data.name }];
        },
        (error: any) => {
          console.error('Pokémon not found', error);
          this.pokemons = [];
        }
      );
    } else {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
    }
  }

  ngOnInit(): void {
    this.offset = 0;
    this.limit = 12;
    this.loadPokemons();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  fetchPokemon(term: string): void {
    if (term) {
      this.pokemons = [];
      this.pokemonService.getPokemonDetails(term.toLowerCase()).subscribe(
        (data: any) => {
          this.pokemons = [{ name: data.name }];
        },
        () => {
          this.pokemons = [];
        }
      );
    } else {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
    }
  }
}
