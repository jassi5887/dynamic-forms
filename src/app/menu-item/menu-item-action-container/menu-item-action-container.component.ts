import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FieldConfig } from '../../dynamic-form/models/field-config.interface';
import { SelectActionOptionsConfig } from '../../dynamic-form/models/select-action-options-config.interface';
import { DynamicFormComponent } from '../../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-menu-item-action-container',
  templateUrl: './menu-item-action-container.component.html',
  styleUrls: ['./menu-item-action-container.component.scss']
})
export class MenuItemActionContainerComponent implements OnInit, AfterViewInit {
  @Input() searchFormConfig: SelectActionOptionsConfig;
  config: FieldConfig[] = [];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  searchForms = [
    {
      "selectAction": false,
      "willHaveSearchString": true,
      "type": "select",
      "label": "field 1",
      "name": "field1",
      "placeholder": "select from options",
      "options": [ 
        {"name": 'LIKE'}, {"name":'NOT LIKE'}, {"name":'CONTAINS'}, {"name":'NOT CONTAINS'} 
      ]
    },
    {
      "selectAction": false,
      "willHaveSearchString": true,
      "type": "select",
      "label": "field 2",
      "name": "field2",
      "placeholder": "select from options",
      "options": [ 
        {"name": 'LIKE'}, {"name":'NOT LIKE'}, {"name":'CONTAINS'}, {"name":'NOT CONTAINS'} 
      ]
    },
    {
      "selectAction": false,
      "willHaveSearchString": true,
      "type": "select",
      "label": "field 3",
      "name": "field3",
      "placeholder": "select from options",
      "options": [ 
        {"name": 'LIKE'}, {"name":'NOT LIKE'}, {"name":'CONTAINS'}, {"name":'NOT CONTAINS'} 
      ]
    },
    {
      "type": "button",
      "label": "search",
      "name": "search"
    },
  ];

  constructor() { }

  ngOnInit() {
    /**
     * we will hit api to get the form here. Api url will be in searchFormConfig
     */
    this.searchForms.forEach((field) => {
      if (field.type !== 'button') {
        const fieldConfig: FieldConfig = {
          name: field.name,
          type: field.type,
          label: field.label,
          options: [...field.options].map((f) => ({ optionName: f.name }))
        }

        this.config.push(fieldConfig);
      }
      
    });

    console.log("MenuItemActionContainerComponent", this.config);
  }

  ngAfterViewInit() {
    
  }

}
