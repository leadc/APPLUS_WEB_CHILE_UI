import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDateComponent),
  multi: true
};

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class InputDateComponent implements ControlValueAccessor{

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() placeHolder: string;
  @ViewChild('calendarContainer') calendarContainer: ElementRef;
  private innerValue: Date;
  public disabled = false;
  public currentMonth = new Date();
  public days: Date[] = [];
  public showCalendar = false;

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = (_: any) => {};
  public date = new Date();

  constructor() {
    this.setMonthDays();
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    console.log("listener");
    if(!this.calendarContainer.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
  }

  set value(val: Date){
    if (val !== this.innerValue){
      this.innerValue = val;
      this.showCalendar = false;
      this.onChangeCallback(val);
    }
  }

  get value(){
    return this.innerValue;
  }

  selectedDate(day: Date){
    if (day && this.innerValue) {
      return day.toISOString().split('T')[0] === this.innerValue.toISOString().split('T')[0];
    }
    return false; 
  }

  setMonthDays(){
    const firstDay = new Date(this.currentMonth);
    firstDay.setDate(1);
    const lastDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );

    var firstDayUnset = true;
    this.days = [];
    while(firstDay <= lastDay) {
      if (firstDayUnset && firstDay.getDay() > this.days.length) {
        this.days.push(null);
      } else {
        this.days.push(new Date(firstDay));
        firstDay.setDate(firstDay.getDate() + 1);
        firstDayUnset = false;
      }
    }

    while(firstDay.getDay() < 6) {
      this.days.push(null);
      firstDay.setDate(firstDay.getDate() + 1);
    }
    this.days.push(null);
  }

  nextMonth(){
    this.processMonthChange(1);
  }

  previousMonth(){
    this.processMonthChange(-1);
  }
  
  processMonthChange(monthChange: number){
    this.currentMonth.setMonth(this.currentMonth.getMonth() + monthChange);
    this.currentMonth = new Date(this.currentMonth);
    this.setMonthDays();
  }

  selectDate(day: any){
    this.value = day || this.value;
  }

  showCalendarClick(){
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar && this.innerValue) {
      this.currentMonth.setMonth(this.innerValue.getMonth());
      this.currentMonth = new Date(this.currentMonth);
      this.processMonthChange(0);
    }
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
