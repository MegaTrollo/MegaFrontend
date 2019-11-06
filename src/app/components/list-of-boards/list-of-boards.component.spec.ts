import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBoardsComponent } from './list-of-boards.component';

describe('ListOfBoardsComponent', () => {
  let component: ListOfBoardsComponent;
  let fixture: ComponentFixture<ListOfBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
