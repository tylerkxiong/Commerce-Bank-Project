import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateFormPageComponent } from './donate-form-page.component';

describe('DonateFormPageComponent', () => {
  let component: DonateFormPageComponent;
  let fixture: ComponentFixture<DonateFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
