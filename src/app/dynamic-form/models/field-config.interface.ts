import { ValidatorFn } from '@angular/forms';
import { SelectActionOptionsConfig } from './select-action-options-config.interface';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string, // this is to identify a field
  options?: SelectActionOptionsConfig[], // if type is select this will have options
  selectAction?: boolean, // if this is true then navigation will happen
  willHaveSearchString?: boolean, // if this is true then form select field will have accompanying input box
  selectActionApi?: string, // if selectAction is true then this will have API endpoint to get the form to load
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any
}
