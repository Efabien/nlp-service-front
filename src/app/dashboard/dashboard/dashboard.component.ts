import { Component, OnInit } from '@angular/core';
import { RessourcesService } from '../../shared/services/ressources.service';
import { ErrorService } from '../../shared/services/error.service';
import { ComponentService } from '../../shared/services/component.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  knowledges: any[];
  activeIntent: any;
  activeKeyWord: any;
  onScreen: string;
  componentParams: any = {
    onScreen: ''
  };
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
    private componentService: ComponentService
  ) { }

  async ngOnInit() {
    await this.loadRessource();
    this.subscribeToActiveIntent();
    this.subscribeToActiveKeyWord();
    this.subscribeToActiveComponent();
    this.subscribeToKnwldgeUpdate();
    this.subscribeToNewKnldge();
    this.subscribeToReload();
  }

  async loadRessource() {
    try {
      const { knowledges }: any = await this.ressourcesService.getList();
      this.knowledges = knowledges;
      console.log(this.knowledges);
    } catch (e) {
      this.errorService.show(e);
    }
  }

  private subscribeToActiveIntent() {
    this.ressourcesService.activeIntent.subscribe(({ selection, title }) => {
      this.activeIntent = selection;
      this.activeIntent.title = title;
      this.componentParams.onScreen = 'intent';
    });
  }

  private subscribeToActiveKeyWord() {
    this.ressourcesService.activeKeyWord.subscribe(({ selection, title }) => {
      this.activeKeyWord = selection;
      this.activeKeyWord.title = title;
      this.componentParams.onScreen = 'keyWord';
    });
  }

  private subscribeToKnwldgeUpdate() {
    this.ressourcesService.knowledgeUpdate.subscribe((event: any) => {
      const ids = this.knowledges.map((item: any) => item._id);
      const index = ids.indexOf(event.knowledge._id);
      if (index < 0) {
        return this.knowledges.push(event.knowledge);
      }
      return this.knowledges[index] = event.knowledge;
    });
  }

  private subscribeToActiveComponent(){
    this.componentService.active.subscribe((event: any) => {
      this.componentParams.onScreen = event.name;
      this.componentParams.knowledgeId = event.id;
    });
  }

  private subscribeToNewKnldge() {
    this.ressourcesService.createKldge.subscribe(() => {
      this.componentParams.onScreen = 'new_knwldge';
    });
  }

  private subscribeToReload() {
    this.ressourcesService.reloadData.subscribe(async() => {
      await this.loadRessource();
    });
  }
}
