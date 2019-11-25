import { Component, OnInit, Input } from '@angular/core';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  cases: any[] = [];
  data: any = {};
  _knwldges: any[];
  _intents: string[];
  @Input('knowledges')
  set knowledges(knowledges) {
    this._knwldges = knowledges;
    this._intents = this._knwldges
      .map(knw => knw.intents)
      .reduce((result, item) => {
        return result.concat(Object.keys(item));
      }, []);
    console.log(this._intents)
  }
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
  ) { }

  ngOnInit() {
  }

  add() {
    console.log(this.data);
    this.cases.push(
      {
        input: this.data.text,
        expected: this.data.expectedIntent
      }
    )
  }

  badInput() {
    return !this.data.text || !this.data.expectedIntent;
  }

}
