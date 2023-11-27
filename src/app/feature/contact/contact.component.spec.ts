import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  const mockResponseStatus: EmailJSResponseStatus = {
    status: 200, 
    text: 'Success',
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('message')).toBeTruthy();
  });

  it('should send email successfully', async () => {
    spyOn(emailjs, 'init');
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve(mockResponseStatus));

    component.form.setValue({
      email: 'test@example.com',
      message: 'Test message',
    });

    await component.send();

    expect(emailjs.init).toHaveBeenCalledWith('3cHrz8zvT5xILHT90');
    expect(emailjs.send).toHaveBeenCalledWith('service_okya4sd', 'template_s6685pb', {
      email: 'test@example.com',
      message: 'Test message',
    });
  });

  it('should reset form after sending email', async () => {
    spyOn(emailjs, 'init');
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve(mockResponseStatus));
    spyOn(component.form, 'reset');

    component.form.setValue({
      email: 'test@example.com',
      message: 'Test message',
    });

    await component.send();

    expect(component.form.reset).toHaveBeenCalled();
  });

});
