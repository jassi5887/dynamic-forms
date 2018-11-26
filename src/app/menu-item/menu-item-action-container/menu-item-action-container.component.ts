import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FieldConfig } from '../../dynamic-form/models/field-config.interface';
import { SelectActionOptionsConfig } from '../../dynamic-form/models/select-action-options-config.interface';
import { DynamicFormComponent } from '../../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormService } from '../../dynamic-form/services/dynamic-form.service';

@Component({
  selector: 'app-menu-item-action-container',
  templateUrl: './menu-item-action-container.component.html',
  styleUrls: ['./menu-item-action-container.component.scss']
})
export class MenuItemActionContainerComponent implements OnInit, AfterViewInit {
  // @Input() searchFormConfig: SelectActionOptionsConfig;
  config: FieldConfig[] = [];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  searchForm = {
    "formSubmitUrl": "",
    "searchFormFields": [
      {
        "id": "1",
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
        "id": "2",
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
        "id": "3",
        "selectAction": false,
        "willHaveSearchString": true,
        "type": "select",
        "label": "field 3",
        "name": "field3",
        "placeholder": "select from options",
        "options": [ 
          {"name": 'LIKE'}, {"name":'NOT LIKE'}, {"name":'CONTAINS'}
        ]
      },
      {
        "type": "button",
        "label": "search",
        "name": "search",
      },
    ]
  };

  searchFormFields = this.searchForm["searchFormFields"];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    /**
     * we will hit api to get the form here inside subscribe
     */
    this.route.params.subscribe(() => {
      const getFormUrl = this.dynamicFormService.getCurrentSelectedActionOption();
      console.log("getFormUrl", getFormUrl);

      if (!getFormUrl) this.router.navigate(['home']);
      
      this.config = []; // this is so that on each action selected there is a new search form
      this.searchFormFields.forEach((field) => {
        let fieldConfig: FieldConfig;

        if (field.type !== 'button') {
          fieldConfig = {
            name: field.name,
            type: field.type,
            label: field.label,
            options: [...field.options].map((f) => ({ optionName: f.name }))
          }

        } else {
          fieldConfig = {
            name: field.name,
            type: field.type,
            label: field.label,
          }
        }

        this.config.push(fieldConfig);
        
      });
    });
   // console.log("MenuItemActionContainerComponent", this.config, this.searchFormConfig);
  }

  ngAfterViewInit() {
    
  }

  submit(value) {
    // get submit url from searchForm.formSubmitUrl and hit it with POST request with form values in payload
    console.log(value);
  }

}
