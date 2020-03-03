import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchattingcomponentComponent } from './groupchattingcomponent.component';

describe('GroupchattingcomponentComponent', () => {
  let component: GroupchattingcomponentComponent;
  let fixture: ComponentFixture<GroupchattingcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupchattingcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchattingcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
