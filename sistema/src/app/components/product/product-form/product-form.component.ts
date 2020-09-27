import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() name: string;
  form: FormGroup;
  estado_fecha: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      estado_fecha: this.fb.array([], [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  showform = function () {
      this.estado_fecha =true;
      console.log(this.estado_fecha)
    }
    onCheckboxChange(e) {
      const estado_fecha: FormArray = this.form.get('estado_fecha') as FormArray;
  
      if (e.target.checked) {
        const index = estado_fecha.controls.findIndex(x=>x.value === e.target.value);
        estado_fecha.removeAt(index)
        console.log(index)
      } else {
        estado_fecha.push(new FormControl(e.target.value));
      }
    }

 
}
