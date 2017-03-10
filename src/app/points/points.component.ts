import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {
  private points: string[];

  constructor() { }

  ngOnInit() {
    this.points = [
      "100 Card Singleton",
      "Annihilation",
      "Apocalypse",
      "Archenemy",
      "Armageddon",
      "Army of the Faceless",
      "Back to the Beginning",
      "Becoming the Archenemy",
      "Becoming the Legend",
      "Bitter Victory",
      "Blatant Thievery",
      "Block",
      "Blood Moon",
      "Boundless Realms",
      "Braingeyser",
      "Brand",
      "Build Your Own Block",
      "Build Your Own Standard",
      "Burn It All",
      "Core Set Constructed",
      "Cranial Explosion",
      "Crumbling Sanctuary",
      "Cursed",
      "Donate",
      "Earthquake",
      "Enchanted for Victory",
      "Endurance",
      "Epic",
      "Equipped for Battle",
      "Extended",
      "Faction",
      "False Cure",
      "Fateful Hour",
      "Figurehead",
      "Final Form",
      "First Blood",
      "First Out",
      "General Death",
      "Grafdiggers Cage",
      "Healing Hand",
      "Highlander",
      "Infinite Combo",
      "Instant Death",
      "Kaleidoscope",
      "Klepto",
      "Knockout",
      "Legacy",
      "Legends Rule",
      "Legion of Doom",
      "Level Up",
      "Madness",
      "Masochist",
      "Mephistopheles Chains",
      "Modern",
      "Necropotence",
      "No",
      "Oops",
      "Participation",
      "Pauper",
      "Peasant",
      "Ping Range",
      "Planechase",
      "Prolific",
      "Redirect Damage",
      "Resource Management",
      "Sad but True",
      "Safe",
      "Secret Partners",
      "Sharing",
      "Stalemate",
      "Standard",
      "Starting Point",
      "Stranglehold",
      "Super Friends",
      "Survivor",
      "Teeg",
      "Thats Not Very Fun",
      "The Legacy",
      "The Void",
      "The World Spell",
      "Third Times the Charm",
      "Time Lord",
      "Titanicide",
      "To Mount Doom",
      "Top No More",
      "Traitor",
      "Tribal Allegiance",
      "Turn Aside",
      "Twenty-One",
      "Vanguard",
      "Variety",
      "Victor",
      "Where It Stops"
    ]
  }

}