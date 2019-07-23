import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleMarketingComponent } from './tele-marketing.component';

describe('TeleMarketingComponent', () => {
  let component: TeleMarketingComponent;
  let fixture: ComponentFixture<TeleMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
