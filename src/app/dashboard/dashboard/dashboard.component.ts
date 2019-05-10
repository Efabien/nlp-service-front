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
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService
  ) { }

  async ngOnInit() {
    try {
      const { knowledges }: any = await this.ressourcesService.getList();
      this.knowledges = knowledges;
      console.log(this.knowledges);
      this.ressourcesService.activeIntent.subscribe(event => {
        console.log(event);
      });
    } catch (e) {
      this.errorService.show(e);
    }
  }
}
