import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetAsPage } from './meet-as.page';

describe('MeetAsPage', () => {
  let component: MeetAsPage;
  let fixture: ComponentFixture<MeetAsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetAsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetAsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
