import { Component, OnInit, Input } from '@angular/core';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';
import * as sha1 from 'sha1';

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
  processing: boolean;
  saveProcessing: boolean;
  successRate: number = null;
  stateHash: string = '';
  @Input('knowledges')
  set knowledges(knowledges) {
    this._knwldges = knowledges;
    this._intents = this._knwldges
      .map(knw => knw.intents)
      .reduce((result, item) => {
        return result.concat(Object.keys(item));
      }, []);
  }
  constructor(
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {
    const { cases }: any = await this.ressourcesService.getTestCases();
    this._hydrate(cases);
  }

  _hydrate(cases) {
    if (!cases.length) return;
    this.cases = cases.map(item => {
      let toInject = {
        input: item.input,
        expected: item.expected
      };
      return toInject;
    });
    this.stateHash = this.calculateHash();
  }

  calculateHash() {
    return sha1(
      this.cases.reduce((outPut, current) => {
        return outPut += current.input + current.expected;
      }, '')
    );
  }

  add() {
    this.cases.push(
      {
        input: this.data.text,
        expected: this.data.expectedIntent
      }
    )
    this.data = {};
  }

  hasChanges() {
    return this.stateHash !== this.calculateHash();
  }

  badInput() {
    return !this.data.text || !this.data.expectedIntent;
  }

  remove(index) {
    this.cases = this.cases.slice(0, index)
    .concat(this.cases.slice(index + 1));
  }

  isSomeTextEmpty() {
    return this.cases.some(item => {
      return !item.input;
    });
  }

  async submiteTest() {
    if (this.processing) return;
    try {
      this.processing = true;
      const { successRate, wrongs } : any = await this.ressourcesService.test(
        { cases: this.cases.map(item => {
            return {
              input: item.input,
              expected: item.expected
            };
          })
        }
      );
      this.successRate = successRate;
      this.injectTestDetails(wrongs);
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  async save() {
    if (this.saveProcessing) return;
    try {
      this.saveProcessing = true;
      await this.ressourcesService.updateTest(
        { cases: this.cases.map(item => {
            return {
              input: item.input,
              expected: item.expected
            };
          })
        }
      );
      this.notificationService.show('your changes were saved successfully');
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.saveProcessing = false;
    }
  }

  injectTestDetails(wrongs) {
    if (!wrongs.length) {
      this.cases = this.cases.map(item => {
        delete item.detected;
        return item;
      });
      return;
    }
    this.cases = this.cases.map(item => {
      let wrongItem = wrongs.find(w => w.input === item.input);
      if (wrongItem) {
        item.detected = wrongItem.detected;
      } else {
        delete item.detected;
      }
      return item;
    });
  }
}
