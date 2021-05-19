import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectInputComponent),
  multi: true
};


@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectInputComponent implements ControlValueAccessor{

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() label: string;
  @Input() id: string;
  private innerValue: any;
  public disabled = false;

  constructor() { }

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = (_: any) => {};

  set value(val: any){
    if (val !== this.innerValue){
      this.innerValue = val;
      this.onChangeCallback(val);
    }
  }

  get value(){
    return this.innerValue;
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(obj: any): void {
    if (obj !== this.innerValue){
      this.innerValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
