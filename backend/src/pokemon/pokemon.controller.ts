import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemons(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.pokemonService.getPokemons(offset, limit);
  }

  @Get(':name')
  getPokemonDetails(@Param('name') name: string) {
    return this.pokemonService.getPokemonDetails(name);
  }
}
