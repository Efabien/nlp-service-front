import { Component, OnInit } from '@angular/core';
import { RessourcesService } from '../../shared/services/ressources.service';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  knowledges: [];
  activeIntent: any;
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService
  ) { }

  async ngOnInit() {
    await this.loadRessource();
    this.subscribeToActiveIntent();
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
    });
  }
}
