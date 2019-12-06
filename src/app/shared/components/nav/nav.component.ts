import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RessourcesService } from '../../services/ressources.service';
import { ComponentService } from '../../services/component.service';
import { AuthenticationService }  from '../../../core/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  Object = Object;

  @Input() knowledges: any;
  @Input() updatedKnowledge: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ressourceService: RessourcesService,
    private componentService: ComponentService,
    private authenticationService: AuthenticationService,
  ) {}

  create() {
    this.ressourceService.emitCreation();
  }

  test() {
    this.componentService.activate({ name: 'test' });
  }

  logout() {
    this.authenticationService.logout();
  }
}
