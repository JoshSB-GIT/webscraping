import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ChartOptions, SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { OurVisiterComponent, VisitorChartOptions } from './dashboard-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';
import { MatCardModule } from '@angular/material/card';
import { SalesOverviewBarComponent } from './dashboard-components/sales-overview-bar/sales-overview-bar.component';
import { SalesOverviewBarTwoComponent } from './dashboard-components/sales-overview-bar-two/sales-overview-bar-two.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DashboardserviceService } from '../services/dashboardservices/dashboardservice.service';
import { Observable, of } from 'rxjs';
import {
	ApexAxisChartSeries,
	ApexChart,
	ChartComponent,
	ApexDataLabels,
	ApexPlotOptions,
	ApexYAxis,
	ApexLegend,
	ApexStroke,
	ApexXAxis,
	ApexFill,
	ApexTooltip,
	ApexGrid,
	NgApexchartsModule
} from "ng-apexcharts";
import { DemoMaterialModule } from '../demo-material-module';


export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [NgApexchartsModule, DemoMaterialModule, MatButtonModule, MatTableModule, SalesOverviewComponent, SalesOverviewBarComponent, SalesOverviewBarTwoComponent, OurVisiterComponent, MatCardModule, ProfileComponent, ContactsComponent, ActivityTimelineComponent],
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
	public ELEMENT_DATA: PeriodicElement[] = [
	];
	@ViewChild("chart") chart: ChartComponent = Object.create(null);
	public chartOptions: Partial<ChartOptions>;
	public chartOptions2: Partial<ChartOptions>;
	public chartOptions3: Partial<ChartOptions>;
	@ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
	public VisitorChartOptions: Partial<VisitorChartOptions>;
	selectedFile: File | null = null;
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = this.ELEMENT_DATA;
	visitData: Observable<any> = of(null);


	series_list_pie = []

	constructor(private dashboardService: DashboardserviceService) {
		this.chartOptions = {
			series: [
				{
					name: "Pixel",
					data: [44, 55, 57, 56, 61, 58],
				},
				{
					name: "Ample",
					data: [76, 85, 101, 98, 87, 105],
				},
			],
			chart: {
				type: "bar",
				fontFamily: "Poppins,sans-serif",
				height: 320,
			},
			grid: {
				borderColor: "rgba(0,0,0,.2)",
				strokeDashArray: 3,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "30%",
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},
			xaxis: {
				categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			},

			legend: {
				show: false,
			},
			fill: {
				colors: ["#26c6da", "#1e88e5"],
				opacity: 1,
			},
			tooltip: {
				theme: "dark",
			},
		};

		this.chartOptions2 = {
			series: [
				{
					name: "basic",
					data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
				}
			],
			chart: {
				type: "bar",
				height: 350
			},
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			dataLabels: {
				enabled: false
			},
			xaxis: {
				categories: [
					"South Korea",
					"Canada",
					"United Kingdom",
					"Netherlands",
					"Italy",
					"France",
					"Japan",
					"United States",
					"China",
					"Germany"
				]
			}
		};

		this.chartOptions3 = {
			series: [
				{
					name: "basic",
					data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
				}
			],
			chart: {
				type: "bar",
				height: 350
			},
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			dataLabels: {
				enabled: false
			},
			xaxis: {
				categories: [
					"South Korea",
					"Canada",
					"United Kingdom",
					"Netherlands",
					"Italy",
					"France",
					"Japan",
					"United States",
					"China",
					"Germany"
				]
			}
		};

		this.VisitorChartOptions = {
			series: [],
			chart: {
				type: "donut",
				fontFamily: "Poppins,sans-serif",
				height: 253,
			},
			plotOptions: {
				pie: {
					donut: {
						size: "80px",
					},
				},
			},
			tooltip: {
				fillSeriesColor: false,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: 0,
			},
			legend: {
				show: false,
			},
			labels: ["Mobile", "Tablet", "Desktop", "Other"],
			colors: ["#1e88e5", "#26c6da", "#745af2", "#eceff1"],
			responsive: [
				{
					breakpoint: 767,
					options: {
						chart: {
							width: 200,
						},
					},
				},
			],
		};

	}

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0];
	}

	private file_name: string = '';
	uploadFile() {
		if (this.selectedFile) {
			this.dashboardService.uploadFile(this.selectedFile).subscribe((response: any) => {
				this.file_name = response.file_name;
				console.log('dash -> ' + this.file_name);

				this.dashboardService.get_pie_data(this.file_name).subscribe((response: any) => {
					// Asigna un nuevo valor a this.series_list_pie para que la vista se actualice
					// this.series_list_pie = response.data;
					this.VisitorChartOptions = {
						series: response.data,
						chart: {
							type: "donut",
							fontFamily: "Poppins,sans-serif",
							height: 253,
						},
						plotOptions: {
							pie: {
								donut: {
									size: "80px",
								},
							},
						},
						tooltip: {
							fillSeriesColor: false,
						},
						dataLabels: {
							enabled: false,
						},
						stroke: {
							width: 0,
						},
						legend: {
							show: false,
						},
						labels: response.labels,
						colors: ["#1e88e5", "#26c6da", "#745af2", "#eceff1"],
						responsive: [
							{
								breakpoint: 767,
								options: {
									chart: {
										width: 200,
									},
								},
							},
						],
					};
				});

				this.dashboardService.get_price_data_bar(this.file_name).subscribe((response: any) => {
					this.chartOptions = {
						series: [
							{
								name: response.real_data.name,
								data: response.real_data.real_list,
							},
							{
								name: response.actual_data.name,
								data: response.actual_data.actual_list,
							},
						],
						chart: {
							type: "bar",
							fontFamily: "Poppins,sans-serif",
							height: 320,
						},
						grid: {
							borderColor: "rgba(0,0,0,.2)",
							strokeDashArray: 3,
						},
						plotOptions: {
							bar: {
								horizontal: false,
								columnWidth: "30%",
							},
						},
						dataLabels: {
							enabled: false,
						},
						stroke: {
							show: true,
							width: 2,
							colors: ["transparent"],
						},
						xaxis: {
							categories: response.categories,
						},

						legend: {
							show: false,
						},
						fill: {
							colors: ["#26c6da", "#1e88e5"],
							opacity: 1,
						},
						tooltip: {
							theme: "dark",
						},
					};
				});

				this.dashboardService.get_price_data(this.file_name, '1').subscribe((response: any) => {
					this.chartOptions2 = {
						series: [
							{
								name: "Actual Price",
								data: response.data
							}
						],
						chart: {
							type: "bar",
							height: 350
						},
						plotOptions: {
							bar: {
								horizontal: true
							}
						},
						dataLabels: {
							enabled: false
						},
						xaxis: {
							categories: response.categories
						}
					};
				});

				this.dashboardService.get_price_data(this.file_name, '0').subscribe((response: any) => {
					this.chartOptions3 = {
						series: [
							{
								name: "Real Price",
								data: response.data
							}
						],
						chart: {
							type: "bar",
							height: 350
						},
						plotOptions: {
							bar: {
								horizontal: true
							}
						},
						dataLabels: {
							enabled: false
						},
						xaxis: {
							categories: response.categories
						}
					};
				});
			});
		}
	}
	ngAfterViewInit() { }

}
