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
  updatedKnowledge: number = -1;
  activeIntent: any;
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
    this.subscribeToActiveComponent();
    this.subscribeToKnwldgeUpdate();
  }

  private async loadRessource() {
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

  private subscribeToKnwldgeUpdate() {
    this.ressourcesService.knowledgeUpdate.subscribe((knowledge: any) => {
      const ids = this.knowledges.map((item: any) => item._id);
      const index = ids.indexOf(knowledge._id);
      if (index < 0) {
        this.updatedKnowledge = this.knowledges.length;
        return this.knowledges.push(knowledge);
      }
      this.updatedKnowledge = index;
      return this.knowledges[index] = knowledge;
    });
  }

  private subscribeToActiveComponent(){
    this.componentService.active.subscribe((event: any) => {
      this.componentParams.onScreen = event.name;
      this.componentParams.knowledgeId = event.id;
    });
  }
}
