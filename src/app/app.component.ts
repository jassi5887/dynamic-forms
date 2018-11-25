import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  // @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor(private chRef: ChangeDetectorRef) {}

  // config: FieldConfig[] = [
  //   {
  //     type: 'input',
  //     label: 'Full name',
  //     name: 'name',
  //     placeholder: 'Enter your name',
  //     validation: [Validators.required, Validators.minLength(4)]
  //   },
  //   {
  //     type: 'select',
  //     label: 'Favourite Food',
  //     name: 'food',
  //     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
  //     placeholder: 'Select an option',
  //     validation: [Validators.required]
  //   },
  //   {
  //     label: 'Submit',
  //     name: 'submit',
  //     type: 'button'
  //   }
  // ];

  ngAfterViewInit() {
    // let previousValid = this.form.valid;
    // this.form.changes.subscribe(() => {
    //   if (this.form.valid !== previousValid) {
    //     previousValid = this.form.valid;
    //     this.form.setDisabled('submit', !previousValid);
    //   }
    // });

    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');

    // this.chRef.detectChanges();
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
