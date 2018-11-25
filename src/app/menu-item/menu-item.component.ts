import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { DynamicFormService } from '../dynamic-form/services/dynamic-form.service';
import { SelectActionOptionsConfig } from '../dynamic-form/models/select-action-options-config.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, AfterViewInit {
  currentMenuId;
  config: FieldConfig[]; //this will not be an array in real time
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  selectedOption: SelectActionOptionsConfig;
  
  // in real time this will be a single object
  menuItemSeachActionSelect = [
    {
      "id": 1,
      "selectAction": true,
      "type": "select",
      "selectActionApi": "/menu/1",
      "label": "select from options",
      "placeholder": "select from options",
      "options": [ 
        { "optionName": "User Log", "optionApi": "/menu/1/search?option=admin" }, 
        { "optionName": "Create User", "optionApi": "/menu/1/search?option=crtracker" }, 
      ]
    },
    {
      "id": 2,
      "selectAction": false,
      "type": "select",
      "selectActionApi": "/menu/2",
      "label": "select from options",
      "placeholder": "select from options",
      "options": [ 
        { "optionName": "Admin", "optionApi": "/menu/1/search?option=admin" }, 
        { "optionName": "CR Tracker", "optionApi": "/menu/1/search?option=crtracker" },  
      ]
    },
  ];

  constructor(private route: ActivatedRoute,
              private dynamicFormService: DynamicFormService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log("params ", params);
      this.currentMenuId = +params['id'];
      const thisItem = this.menuItemSeachActionSelect.find((menu) => menu.id == +params['id']);

      // create an array of objects because we know there will only be one select box
      this.config = [{
        name: thisItem.label,
        type: thisItem.type,
        options: thisItem.options,
        label: thisItem.label,
        placeholder: thisItem.placeholder,
        selectAction: thisItem.selectAction,
        selectActionApi: thisItem.selectActionApi
      }];

    });

    this.dynamicFormService.selectedSearchAction.subscribe((actionOptionConfig: SelectActionOptionsConfig) => {
      console.log("actionApi", actionOptionConfig);
      this.selectedOption = actionOptionConfig;
    });
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
  }

}
