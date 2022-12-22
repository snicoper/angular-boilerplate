import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from './../../../services/layout.service';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;

  private navbarValue = false;
  private sidebarValue = false;
  private footerValue = false;

  constructor(private layoutService: LayoutService, private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.buildForm();

    // Save current values.
    this.navbarValue = this.layoutService.showSidebarValue;
    this.sidebarValue = this.layoutService.showSidebarValue;
    this.footerValue = this.layoutService.showFooterValue;

    this.layoutService.setValueNavbar(false);
    this.layoutService.setValueSidebar(false);
    this.layoutService.setValueFooter(false);
  }

  ngOnDestroy(): void {
    // Restore old values.
    this.layoutService.setValueNavbar(this.navbarValue);
    this.layoutService.setValueSidebar(this.sidebarValue);
    this.layoutService.setValueFooter(this.footerValue);
  }

  public handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}
