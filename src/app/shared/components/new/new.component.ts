import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';
import * as sha1 from 'sha1';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  intent: any = {
    texts: []
  };
  newText: string;
  stateHash: string;
  processing: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.stateHash = sha1(
      this.intent.texts.join('')
    );
  }

  hasChanges() {
    return this.stateHash !== sha1(
      this.intent.texts.join('')
    ) || !!this.newText;
  }

  isSomeTextEmpty() {
    return this.intent.texts.some(text => !text.length);
  }

  hasNoTextToSubmit() {
    return !this.intent.texts.length;
  }

  add() {
    this.intent.texts.push(this.newText);
    this.newText = null;
  }

  async save() {
    if (!this.hasChanges() || this.processing) return;
    this.processing = true;
    try {
      const data = {
        theme: this.intent.theme,
        intents: {
          [this.intent.name]: {
            texts: this.intent.texts
          }
        }
      };
      const { knowledge } : any = await this.ressourcesService.add(data);
      this.updateSucceed(knowledge);
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  private updateSucceed(knowledge) {
    this._reset();
    this.notificationService.show('your changes were saved successfully');
    this.ressourcesService.reload();
  }

  private _reset() {
    this.intent = {
      texts: []
    };
    this.newText = null;
  }

  private isLabeled() {
    return !!this.intent.theme && !!this.intent.name;
  }

  remove(index) {
    const texts = this.intent.texts;
    this.intent.texts = texts.slice(0, index)
      .concat(texts.slice(index + 1, this.intent.texts.length));
  }

}
