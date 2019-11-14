import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterAccountComponent } from './login-and-register-account.component';

describe('LoginAndRegisterAccountComponent', () => {
  let component: LoginAndRegisterAccountComponent;
  let fixture: ComponentFixture<LoginAndRegisterAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAndRegisterAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndRegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
