import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Headers, Http, RequestOptions, Request, RequestMethod } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

interface Set {
  name: string,
  code: string,
  gathererCode: string,
  magicCardsInfoCode: string,
  releaseDate: string,
  border: string,
  type: string,
  block: string,
  booster: string[],
  translations: {
    [lang: string]: string;
  },
  mkm_name: string,
  mkm_id: number,
  cards: Card[]
}

interface CardList {
  [name: string]: Card;
}

interface Card {
  artist: string,
  cmc: number,
  colorIdentity: string[],
  colors: string[],
  flavor: string,
  id: string,
  imageName: string,
  layout: string,
  manaCost: string,
  mciNumber: number,
  multiverseid: number,
  name: string,
  power: string,
  rarity: string,
  subtypes: string[],
  text: string,
  toughness: string,
  type: string,
  types: string[],
  rulings: {date: string, text: string}[],
  foreignNames: {language: string, name: string, multiverseid: number }[],
  printings: string[],
  originalText: string,
  originalType: string,
  legalities: { format: string, legality: string }[],
  source: string
}

@Component({
  selector: 'app-deck-test',
  templateUrl: './deck-test.component.html',
  styleUrls: ['./deck-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckTestComponent {
  title = 'Deck Tester';
  deckControl = new FormControl();
  sets$: Observable<Set[]>;
  blocks$: Observable<[string, string[]][]>;
  cards$: Observable<CardList>;

  deck$: Observable<Card[]>;
  deckSets$: Observable<[string, number][]>;
  deckBlocks$: Observable<[string, number][]>;

  blockCheck$: Observable<boolean>;
  blockCheckFails$: Observable<{block: string, missing: string[]}>;


  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    // Get all sets from JSON
    this.sets$ = this.http.get("https://mtgjson.com/json/AllSetsArray-x.json")
      .map(response => response.json())
      .publishLast()
      .refCount();

    // Reduce sets to flatten out all cards
    this.cards$ = this.sets$
      .map(sets =>
        sets.filter(
          set => !set["onlineOnly"]
        ).filter(
          set => ["ATH", "ITP", "DKM", "RQS", "DPA"].indexOf(set.code) == -1
        ).filter(
          set => set.code.length == 3
        ).reduce(
          (acc, set) => acc = [...acc, ...set.cards], []
        ).reduce(
          (acc, card) => { acc[card.name] = card; return acc; }, {}
        )
      );

      this.blocks$ = this.sets$.map(
        sets => sets.filter(
          set => set.block
        ).reduce(
          (acc, set) => { acc[set.block] = [...(acc[set.block] || []), set.code]; return acc; }, {}
        )
      ).map(
        blocks => _.toPairs(blocks)
      )

    let initialDeck = `gaea's cradle
phyrexian tower
show and tell
yawgmoth's will
abundance`;

    // Subscribe to the deck textarea
    this.deck$ = Observable.of(initialDeck)
      .concat(this.deckControl.valueChanges.debounceTime(400))
      .distinctUntilChanged()
      .switchMap(deck => this.fetch(deck));

    this.deckControl.patchValue(initialDeck);

    let coreSets = this.sets$.map(sets => sets.filter(
      set => ["core", "expansion"].indexOf(set.type) > -1
    ).map(set => set.code))

    // Flatten sets from deck
    this.deckSets$ = this.deck$.map(
      deck => deck.reduce(
        (acc, card) => [...acc, ...card.printings], new Array<string>()
      ).reduce(
        (acc, printing) => { acc[printing] = (acc[printing] || 0) + 1; return acc; }, {}
      )
    ).combineLatest(
      coreSets
    ).map(
      ([s, c]) => Object.keys(s).filter(
        s => c.indexOf(s) > -1
      ).reduce(
        (acc, k) => {acc[k] = s[k]; return acc}, {}
      )
    ).map(
      printings => _.toPairs(printings).sort(
        (a, b) => a[1] < b[1] ? 1 : 0
      )
    );

    // Flatten blocks from deck
    let blockCards$: Observable<[string, Card[]][]> = this.blocks$.combineLatest(
      this.deck$
    ).map(
      ([blocks, deck]) => blocks.map(
        block => [block[0], deck.filter(
          card => _.intersection(card.printings, block[1]).length > 0
        )]
      ).sort(
        (a, b) => a[1].length < b[1].length ? 1 : 0
      )
    ).distinctUntilChanged()

    this.deckBlocks$ = blockCards$.map(
      blocks => blocks.map(
        block => [block[0], block[1].length]
      ).filter(
        block => block[1] > 0
      )
    )

    this.blockCheck$ = this.deckBlocks$.combineLatest(this.deck$).map(
      ([deckBlocks, deck]) => deckBlocks[0][1] == deck.length
    )

    this.blockCheckFails$ = blockCards$.combineLatest(this.deck$).map(
      ([blocks, deck]) => blocks.slice(0, 1).map(
        block => {
          console.log(
            block[1],
            deck,
            _.xorBy(
              block[1],
              deck,
              "name"
            )
          );
          return {
            block: block[0],
            missing: _.xorBy(
              block[1],
              deck,
              "name"
            )
          }
        }
      )[0]
    )
  }

  fetch(list: string): Observable<Card[]> {
    let deck = list.toLowerCase().split('\n').map(
      name => name.trim().replace(/^[0-9]+\s+/, '')
    );

    return this.cards$.map(
      cards => _.values(cards).filter(
        card => deck.indexOf(card.name.toLowerCase()) > -1
      ).sort(
        (a, b) => a.name > b.name ? 1 : 0
      )
    );
  }
}
