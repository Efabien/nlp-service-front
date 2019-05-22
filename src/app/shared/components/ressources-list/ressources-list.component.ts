import { Component, Input } from '@angular/core';
import { RessourcesService } from '../../services/ressources.service';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'ressources-list',
  templateUrl: './ressources-list.component.html',
  styleUrls: ['./ressources-list.component.css']
})
export class RessourcesListComponent {
  Object = Object;
  _knowledges: any[];
  expansionControl = [false, false];

  @Input('knowledges')
  set knowledges(knowledges: any[]) {
    this._knowledges = knowledges;
  }

  @Input('updatedKnowledge')
  set updatedKnowledge(updatedKnowledge: number) {
    this.expansionControl[updatedKnowledge] = true;
  }


  constructor(
    private ressourcesService: RessourcesService,
    private componentService: ComponentService
  ) {}

  selectIntent(intent) {
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      this._knowledges, intent
    );
    this.ressourcesService.emitSelectedIntent({ selection, title: intent });
  }

  addIntent(id) {
    this.componentService.activate({ name: 'addIntent', id });
  }
}
