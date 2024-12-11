import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let pokemonService: PokemonService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        PokemonService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'name' ? 'pikachu' : null)
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);

    jest.spyOn(pokemonService, 'getPokemonDetails').mockReturnValue(
      of({
        name: 'pikachu',
        abilities: [{ ability: { name: 'static' } }],
        types: [{ type: { name: 'electric' } }],
        sprites: {
          front_default: 'https://example.com/pikachu.png',
          front_shiny: 'https://example.com/pikachu_shiny.png',
          back_default: 'https://example.com/pikachu_back.png',
          back_shiny: 'https://example.com/pikachu_back_shiny.png',
          other: {
            'official-artwork': {
              front_default: 'https://example.com/pikachu_official.png'
            }
          }
        },
        weight: 60,
        height: 4,
        species: { name: 'Mouse Pokémon' }
      })
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
