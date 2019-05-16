import { Component, Input } from '@angular/core';
import { RessourcesService } from '../../services/ressources.service';

@Component({
  selector: 'ressources-list',
  templateUrl: './ressources-list.component.html',
  styleUrls: ['./ressources-list.component.css']
})
export class RessourcesListComponent {
  Object = Object;

  @Input() knowledges: any;


  constructor(
    private ressourcesService: RessourcesService
  ) {}

  selectIntent(intent) {
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      this.knowledges, intent
    );
    this.ressourcesService.emitSelectedIntent({ selection, title: intent });
  }
}
