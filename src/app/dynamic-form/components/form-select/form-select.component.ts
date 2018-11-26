import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div 
      class="dynamic-field form-select"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <select [formControlName]="config.name" (change)="onSelectChange($event)">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option.optionName }}
        </option>
      </select>
      <input *ngIf="config.willHaveSearchString" [formControlName]="config.name + '-searchInput'" />
    </div>
  `
})
export class FormSelectComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit() {
    if( this.config.willHaveSearchString ) {
      this.group.addControl(this.config.name + "-searchInput", new FormControl(this.config.name + "-searchInput"));
    }
  }

  onSelectChange(event) {
    console.log("FormSelectComponent, config", this.config);

    if( this.config && this.config.selectAction ) {
      console.log("1", this.group.controls[this.config.name].value);
      const selectedOptionName = this.group.controls[this.config.name].value;
      this.dynamicFormService.selectedSearchAction.next(
        this.config.options.find( (op) => op.optionName === selectedOptionName )
      );
    }
  }
}
