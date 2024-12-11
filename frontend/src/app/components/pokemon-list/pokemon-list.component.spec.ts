import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { of } from 'rxjs';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent, PokemonDetailsComponent],
      providers: [PokemonService],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should create the component', () => {
    jest.spyOn(pokemonService, 'getPokemonDetails').mockReturnValue(
      of({
        name: 'pikachu',
        abilities: [{ ability: { name: 'static' } }],
        types: [{ type: { name: 'electric' } }],
        sprites: { front_default: 'https://example.com/pikachu.png' },
      })
    );

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should have an empty pokemon list initially', () => {
    expect(component.pokemons.length).toBe(0);
  });
});
