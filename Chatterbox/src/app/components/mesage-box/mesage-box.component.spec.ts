import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesageBoxComponent } from './mesage-box.component';

describe('MesageBoxComponent', () => {
  let component: MesageBoxComponent;
  let fixture: ComponentFixture<MesageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
