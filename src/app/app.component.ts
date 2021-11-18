import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  title = 'Регистрация';
  regForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      passConfirm: ["", [Validators.required]],
      rules: ["", [Validators.required]],
      privacy: ["", [Validators.required]]
    }, {validators: this.pass()})
  }

  get f() { return this.regForm.controls; }

  submit () {
    this.submitted = true;

    if(this.regForm.invalid) {
      return console.log("error")
    }

    console.log(this.regForm.value)
  }

  pass():ValidatorFn {
    // @ts-ignore
    return (formGroup: FormGroup) => {
      const pass = formGroup.get("password")?.value;
      const reqPass = formGroup.get("passConfirm")?.value;

      if (reqPass.error && !reqPass.errors.confirmedValidator) {
        return
      }
      if (pass !== reqPass) {
        return { notSame: true }
      } else {
        return null
      }
    }
  }

}
