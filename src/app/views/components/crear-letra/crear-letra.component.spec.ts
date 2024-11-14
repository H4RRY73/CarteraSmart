import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLetraComponent } from './crear-letra.component';

describe('CrearLetraComponent', () => {
  let component: CrearLetraComponent;
  let fixture: ComponentFixture<CrearLetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearLetraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
