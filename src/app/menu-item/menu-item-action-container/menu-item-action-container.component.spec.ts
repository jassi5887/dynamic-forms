import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemActionContainerComponent } from './menu-item-action-container.component';

describe('MenuItemActionContainerComponent', () => {
  let component: MenuItemActionContainerComponent;
  let fixture: ComponentFixture<MenuItemActionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemActionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemActionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
