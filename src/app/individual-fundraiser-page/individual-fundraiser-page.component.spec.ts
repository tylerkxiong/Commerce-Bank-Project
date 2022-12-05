import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualFundraiserPageComponent } from './individual-fundraiser-page.component';

describe('IndividualFundraiserPageComponent', () => {
  let component: IndividualFundraiserPageComponent;
  let fixture: ComponentFixture<IndividualFundraiserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualFundraiserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualFundraiserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
