import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

interface GeneralInformation {
  totalQuantityOfUsers: number;
  quantityOfFemales: number;
  quantityOfMales: number;
  averageTimeSpent: number;
  difTotalQuantityOfUsers: number;
  difQuantityOfFemales: number;
  difQuantityOfMales: number;
  difAverageTimeSpent: number;
}

interface UsersByAge {
  'less than 20': number;
  'from 20 to 30': number;
  'from 30 to 40': number;
  'from 40 to 50': number;
  'from 50 to 60': number;
  'greater than 60': number;
}

interface UsersAttendance {
  femaleAttendanceByMonth: number[];
  maleAttendanceByMonth: number[];
  measurementPeriod: string[];
}

interface SiteStatistics {
  generalInformation: GeneralInformation;
  usersByAge: UsersByAge;
  usersAttendance: UsersAttendance;
}

@Component({
  selector: 'app-administrator-dashboard',
  templateUrl: './administrator-dashboard.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    '../shared/default-layout-styles.scss',
    './administrator-dashboard.component.scss'
  ]
})
export class AdministratorDashboardComponent implements OnInit {
  public mainSectionIsVisible: boolean;

  public usersData: SiteStatistics = {
    generalInformation: <GeneralInformation>{
      totalQuantityOfUsers: 0,
      quantityOfFemales: 0,
      quantityOfMales: 0,
      averageTimeSpent: 0,
      difTotalQuantityOfUsers: 0,
      difQuantityOfFemales: 0,
      difQuantityOfMales: 0,
      difAverageTimeSpent: 0
    },
    usersByAge: <UsersByAge>{
      'less than 20': 0,
      'from 20 to 30': 0,
      'from 30 to 40': 0,
      'from 40 to 50': 0,
      'from 50 to 60': 0,
      'greater than 60': 0,
    },
    usersAttendance: <UsersAttendance>{
      femaleAttendanceByMonth: [],
      maleAttendanceByMonth: [],
      measurementPeriod: []
    }
  };

  public pieChartType = 'pie';
  public doughnutChartType = 'doughnut';
  public lineChartType = 'line';
  public genderPieChartData: number[] = [];
  public agePieChartData: number[] = [];
  public usersActivitiesChartData = [
    {data: [], label: 'Females'},
    {data: [], label: 'Males'}
  ];
  public genderPieChartLabels: string[] = [
    'Females',
    'Males'
  ];
  public agePieChartLabels: string[] = [
    'less than 20',
    'from 20 to 30',
    'from 30 to 40',
    'from 40 to 50',
    'from 50 to 60',
    'greater than 60'
  ];
  public usersActivitiesChartLabels = [];
  public genderPieChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(191, 113, 206, 1.0)',
        'rgba(63, 147, 211, 1.0)'
      ]
    }
  ];
  public agePieChartColors: any[] = [
    {
      backgroundColor: [
        'rgba(2, 117, 216, 1.0)',
        'rgba(32, 214, 205, 1.0)',
        'rgba(122, 170, 204, 1.0)',
        'rgba(191, 113, 206, 1.0)',
        'rgba(63, 147, 211, 1.0)',
        'rgba(99, 97, 229, 1.0)'
      ]
    }
  ];

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedData.subscribe(data => {
      this.usersData = data;
      this.drawCharts();
    });

    this.administratorService.getStatistics();
  }

  drawCharts(): void {
    const usersData = this.usersData;

    this.genderPieChartData = <number[]>[];
    this.agePieChartData = <number[]>[];

    if (usersData.generalInformation) {
      this.genderPieChartData.push(usersData.generalInformation.quantityOfFemales);
      this.genderPieChartData.push(usersData.generalInformation.quantityOfMales);
    }

    for (const p in usersData.usersByAge) {
      if (usersData.usersByAge.hasOwnProperty(p)) {
        this.agePieChartData.push(usersData.usersByAge[p]);
      }
    }

    if (usersData.usersAttendance) {
      this.usersActivitiesChartData[0].data = usersData.usersAttendance.femaleAttendanceByMonth;
      this.usersActivitiesChartData[1].data = usersData.usersAttendance.maleAttendanceByMonth;
      this.usersActivitiesChartLabels = usersData.usersAttendance.measurementPeriod;
    }
  }

}
