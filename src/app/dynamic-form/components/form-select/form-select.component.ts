import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  constructor(private dynamicFormService: DynamicFormService) {}

  onSelectChange(event) {
    console.log("config", this.config);

    if( this.config && this.config.selectAction ) {
      console.log("1", this.group.controls[this.config.name].value);
      const selectedOptionName = this.group.controls[this.config.name].value;
      this.dynamicFormService.selectedSearchAction.next(
        this.config.options.find( (op) => op.optionName === selectedOptionName )
      );
    }
  }
}
