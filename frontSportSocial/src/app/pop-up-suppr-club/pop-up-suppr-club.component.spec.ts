import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSupprClubComponent } from './pop-up-suppr-club.component';

describe('PopUpSupprClubComponent', () => {
  let component: PopUpSupprClubComponent;
  let fixture: ComponentFixture<PopUpSupprClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpSupprClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpSupprClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
