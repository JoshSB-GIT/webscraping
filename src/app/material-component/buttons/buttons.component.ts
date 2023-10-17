import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CsvserviceService } from 'src/app/services/csvservices/csvservice.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [DemoMaterialModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  constructor(private csvService: CsvserviceService) {

  }
  public filename: string = '';

  public getFile(): void {
    this.csvService.getCSV().subscribe((data: any) => {
      // Agrega la extensión .csv al nombre del archivo
      const currentDateTime = new Date();

      const currentYear = currentDateTime.getFullYear();
      const currentMonth = currentDateTime.getMonth(); // Los meses comienzan desde 0 (enero) hasta 11 (diciembre).
      const currentDay = currentDateTime.getDate();
      const currentHour = currentDateTime.getHours();
      const currentMinutes = currentDateTime.getMinutes();
      const currentSeconds = currentDateTime.getSeconds();
      this.filename = 'datos-'+currentYear.toString()+'-'+currentMonth.toString()+'-'+currentDay.toString()+'-'+currentHour.toString()+'-'+currentMinutes.toString()+'-'+currentSeconds.toString()+'.csv';

      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace temporal para descargar el archivo con el nombre deseado
      const a = document.createElement('a');
      a.href = url;
      a.download = this.filename;
      document.body.appendChild(a);
      a.click();

      // Limpia el enlace temporal
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  ngOnInit(): void {

  }
}
