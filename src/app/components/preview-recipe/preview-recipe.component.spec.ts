import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRecipeComponent } from './preview-recipe.component';

describe('PreviewRecipeComponent', () => {
  let component: PreviewRecipeComponent;
  let fixture: ComponentFixture<PreviewRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
