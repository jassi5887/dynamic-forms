import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { SelectActionOptionsConfig } from '../models/select-action-options-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private currentSelectActionOption;

  selectedSearchAction = new Subject<SelectActionOptionsConfig>(); //this will send selected action url

  setCurrentSelectedActionOption(selectActionOption) {
    this.currentSelectActionOption = selectActionOption;
  }

  getCurrentSelectedActionOption() {
    return this.currentSelectActionOption;
  }
}