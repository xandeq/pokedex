import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  selectedImage: string = '';
  spriteUrls: string[] = [];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        console.log(data);
        this.pokemon = data;
        this.loadSprites();
      });
    }
  }

  convertWeightToLbs(weight: number): string {
    return (weight / 4.536).toFixed(2);
  }

  convertHeightToInches(height: number): string {
    return (height * 3.937).toFixed(2);
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      bug: '#A8B820',
      dragon: '#7038F8',
      electric: '#F8D030',
      fighting: '#C03028',
      fire: '#F08030',
      flying: '#A890F0',
      ghost: '#705898',
      grass: '#78C850',
      ground: '#E0C068',
      ice: '#98D8D8',
      normal: '#A8A878',
      poison: '#A040A0',
      psychic: '#F85888',
      rock: '#B8A038',
      water: '#6890F0',
    };
    return colors[type] || '#A8A878';
  }

  loadSprites(): void {
    this.spriteUrls = [
      this.pokemon.sprites.front_default,
      this.pokemon.sprites.front_shiny,
      this.pokemon.sprites.back_default,
      this.pokemon.sprites.back_shiny,
      this.pokemon.sprites.other?.['official-artwork']?.front_default,
    ].filter((url) => url);

    this.selectedImage = this.spriteUrls[0];
  }

  selectImage(sprite: string): void {
    console.log(sprite);
    this.selectedImage = sprite;
  }
}
