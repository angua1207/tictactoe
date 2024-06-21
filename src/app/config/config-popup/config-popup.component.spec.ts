import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPopupComponent } from './config-popup.component';

describe('ConfigPopupComponent', () => {
  let component: ConfigPopupComponent;
  let fixture: ComponentFixture<ConfigPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
