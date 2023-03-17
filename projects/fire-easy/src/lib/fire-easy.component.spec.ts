import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireEasyComponent } from './fire-easy.component';

describe('FireEasyComponent', () => {
  let component: FireEasyComponent;
  let fixture: ComponentFixture<FireEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireEasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
