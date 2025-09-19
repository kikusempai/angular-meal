import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRecipeComponent } from './grid-recipe.component';

describe('GridRecipeComponent', () => {
  let component: GridRecipeComponent;
  let fixture: ComponentFixture<GridRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
