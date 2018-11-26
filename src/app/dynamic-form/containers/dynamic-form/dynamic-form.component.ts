import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FieldConfig } from '../../models/field-config.interface';


@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `
    {{ count }}
    <form
      class="dynamic-form"
      [formGroup]="form"
      (submit)="handleSubmit($event)"
      >
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form">
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input()
  config: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  // return all controls except type button
  get controls() { return this.config.filter(({type}) => type !== 'button'); }

  // return all the value changes of current form
  get changes() { return this.form.valueChanges; }

  // returns if the current form is valid
  get valid() { return this.form.valid; }

  // returns current form's value
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  /**
   * this fires when Inputs change; when config object change for the current form
   * could be used to add input controls on the fly
   */
  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup() {
    const group = this.fb.group({}); //creates empty form group

    //this loops over controls in config object and creates & adds respective FormControl to the empty FormGroup
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    console.log("GROUP", group);
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable': 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

}
