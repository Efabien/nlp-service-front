import { Component, Input } from '@angular/core';

@Component({
  selector: 'ressources-list',
  templateUrl: './ressources-list.component.html',
  styleUrls: ['./ressources-list.component.css']
})
export class RessourcesListComponent {
  Object = Object;

  @Input() knowledges: any;


  constructor() {}

}
