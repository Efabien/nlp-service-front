import { Component, OnInit } from '@angular/core';
import { RessourcesService } from '../../shared/services/ressources.service';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ressources: any;
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService
  ) { }

  async ngOnInit() {
    try {
      this.ressources = await this.ressourcesService.getList();
      console.log(this.ressources);
    } catch (e) {
      this.errorService.show(e);
    }
  }
}
