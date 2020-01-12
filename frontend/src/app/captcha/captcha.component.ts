import {Component, ElementRef, Injectable, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})

@Injectable()
export class CaptchaComponent implements OnInit, ControlValueAccessor {

  @Input()
  required = false;

  recaptcha: any[];
  private recaptchaResponse: any[];
  @Input()
  captcha: FormControl;

  constructor(private fb: FormBuilder, private element: ElementRef) {
  }

  ngOnInit() {
    let validator = null;
    this.captcha = new FormControl();
    if (this.required) {
      validator = Validators.required;
    }
    this.captcha = this.fb.control(null, validator);
  }

  resolvedC(recaptchaResponse: any[]) {
    this.recaptchaResponse = recaptchaResponse;
    this.recaptcha = this.recaptchaResponse;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }


}

