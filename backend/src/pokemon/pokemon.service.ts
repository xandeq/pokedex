import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
    private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    async getPokemons(offset: number = 0, limit: number = 20){
        try {
            const response = await axios.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
            return response.data;
        }
        catch(error){
            throw new HttpException('Failed to fecth Pokemon data', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getPokemonDetails(name: string) {
        try {
          const response = await axios.get(`${this.apiUrl}/${name}`);
          return response.data;
        } catch (error) {
          throw new HttpException('Failed to fetch Pokémon details', HttpStatus.NOT_FOUND);
        }
      }
}
