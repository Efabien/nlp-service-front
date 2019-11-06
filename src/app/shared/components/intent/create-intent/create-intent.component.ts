import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { RessourcesService } from '../../../services/ressources.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-create-intent',
  templateUrl: './create-intent.component.html',
  styleUrls: ['./create-intent.component.css']
})
export class CreateIntentComponent  {
  intent: any = {
    title: '',
    texts: []
  };
  processing: boolean;

  titleControl = new FormControl('', [Validators.required]);

  constructor(
    private notificationService: NotificationService,
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
  ) { }

  @Input('knowledgeId')
  set knowledgeId(knowledgeId) {
    this.intent.id = knowledgeId;
  }

  addToList() {
    if (!this.intent.new) return;
    this.intent.texts.push(this.intent.new);
    this.intent.new = '';
  }

  remove(index) {
    const texts = this.intent.texts;
    this.intent.texts = texts.slice(0, index)
      .concat(texts.slice(index + 1, this.intent.texts.length));
  }

  async create() {
    if (this.processing) return;
    this.processing = true;
    try {
      const data = {
        intents: {
          [this.intent.title]: {
            texts: this.intent.texts
          }
        }
      };
      const { knowledge }: any = await this.ressourcesService.update(
        this.intent.id,
        data
      );
      this.updateSucceed(knowledge);
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  canCreate() {
    return this.titleControl.valid &&
      this.intent.texts.length &&
      !this.hasEmptySentence();
  }

  hasEmptySentence() {
    return this.intent.texts.some(sentence => !sentence.length);
  }

  private updateSucceed(knowledge) {
    this.notificationService.show('your changes were saved successfully');
    this.ressourcesService.emitKnwldgeUpdate({ knowledge, source: 'intent'});
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      [knowledge], this.intent.title
    );
    this.ressourcesService.emitSelectedIntent({ selection, title: this.intent.title });
  }
}
