import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSupprPostComponent } from './pop-up-suppr-post.component';

describe('PopUpSupprPostComponent', () => {
  let component: PopUpSupprPostComponent;
  let fixture: ComponentFixture<PopUpSupprPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpSupprPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpSupprPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
