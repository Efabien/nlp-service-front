import { Component, Input, OnInit } from '@angular/core';
import { RessourcesService } from '../../services/ressources.service';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'ressources-list',
  templateUrl: './ressources-list.component.html',
  styleUrls: ['./ressources-list.component.css']
})
export class RessourcesListComponent implements OnInit {
  Object = Object;
  _knowledges: any[] = [];
  expansionControl: any[] = [];

  @Input('knowledges')
  set knowledges(knowledges: any[]) {
    if (!knowledges || !knowledges.length) return;
    this._knowledges = knowledges;
    this.expansionControl = knowledges.map(item => {
      return { state: false, intentState: false, keywordState: false };
    });
  }

  constructor(
    private ressourcesService: RessourcesService,
    private componentService: ComponentService
  ) {}

  async ngOnInit() {
    this.subscribeToKnwldgeUpdate();
  }

  selectIntent(intent) {
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      this._knowledges, intent
    );
    this.ressourcesService.emitSelectedIntent({ selection, title: intent });
  }

  selectKeyWord(title, selection) {
    selection.id = this.ressourcesService.getIdFromTitle(
      this._knowledges, title
    );
    this.ressourcesService.emitSelectedKeyWord({ title, selection });
  }

  addIntent(id) {
    this.componentService.activate({ name: 'addIntent', id });
  }

  private subscribeToKnwldgeUpdate() {
    this.ressourcesService.knowledgeUpdate.subscribe((event: any) => {
      const index = this._knowledges.map(item => item._id).indexOf(event.knowledge._id)
      this.expansionControl[index].state = true;
      this.expansionControl[index][event.source + 'State'] = true;
    });
  }

  private addKeywords(id) {
    this.componentService.activate({ name: 'addKeyWords', id});
  }
}
