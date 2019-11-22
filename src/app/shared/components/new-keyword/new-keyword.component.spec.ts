import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeywordComponent } from './new-keyword.component';

describe('NewKeywordComponent', () => {
  let component: NewKeywordComponent;
  let fixture: ComponentFixture<NewKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewKeywordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
