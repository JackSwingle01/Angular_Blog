import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUserPageComponent } from './about-user-page.component';

describe('AboutUserPageComponent', () => {
  let component: AboutUserPageComponent;
  let fixture: ComponentFixture<AboutUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
