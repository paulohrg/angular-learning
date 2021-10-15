import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRestritaComponent } from './area-restrita.component';

describe('AreaRestritaComponent', () => {
  let component: AreaRestritaComponent;
  let fixture: ComponentFixture<AreaRestritaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaRestritaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaRestritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
