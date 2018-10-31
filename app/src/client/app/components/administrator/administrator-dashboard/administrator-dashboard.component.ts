import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

interface GeneralInformation {
  totalQuantityOfUsers: number;
  quantityOfFemales: number;
  quantityOfMales: number;
  averageTimeSpent: any;
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

interface UsersNumberDynamics {
  femaleNumberByMonth: number[];
  maleNumberByMonth: number[];
  measurementPeriod: any[];
}

interface SiteStatistics {
  generalInformation: GeneralInformation;
  usersByAge: UsersByAge;
  usersNumberDynamics: UsersNumberDynamics;
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
    usersNumberDynamics: <UsersNumberDynamics>{
      femaleNumberByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      maleNumberByMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      measurementPeriod: []
    }
  };
  public pieChartType = 'pie';
  public doughnutChartType = 'doughnut';
  public lineChartType = 'line';
  public genderPieChartData: number[] = [];
  public agePieChartData: number[] = [];
  public usersNumberDynamicsChartData = [
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
  public usersNumberDynamicsChartLabels = [];
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
  public usersNumberDynamicsChartColors: any[] = [
    {
      backgroundColor: 'rgba(191, 113, 206, 0.2)',
      borderColor: 'rgba(191, 113, 206, 1.0)',
      pointBackgroundColor: 'rgba(191, 113, 206, 1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(191, 113, 206, 0.8)'
    },
    {
      backgroundColor: 'rgba(63, 147, 211, 0.2)',
      borderColor: 'rgba(63, 147, 211, 1.0)',
      pointBackgroundColor: 'rgba(63, 147, 211, 1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(63, 147, 211, 1.0)'
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
      this.handleAverageTimeSpentView();
      this.drawCharts();
    });

    this.administratorService.getStatistics();
  }

  handleAverageTimeSpentView(): void {
    const usersData = this.usersData;

    let averageTimeSpent;
    let fullYears;
    let days;

    if (usersData.generalInformation) {
      averageTimeSpent = this.usersData.generalInformation.averageTimeSpent;
      fullYears = Math.floor(averageTimeSpent);
      days = Math.round((averageTimeSpent - fullYears) * 365);
    }

    switch (averageTimeSpent) {
      case (averageTimeSpent < 1):
        averageTimeSpent = `${Math.round(averageTimeSpent * 365)} days`;
        break;

      case (averageTimeSpent >= 1):
        averageTimeSpent = `${fullYears} ${(fullYears === 1) ? 'year' : 'years'} ${days} ${(days === 1) ? 'day' : 'days'}`;
        break;
    }
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

    if (usersData.usersNumberDynamics) {
      this.usersNumberDynamicsChartData[0].data = usersData.usersNumberDynamics.femaleNumberByMonth;
      this.usersNumberDynamicsChartData[1].data = usersData.usersNumberDynamics.maleNumberByMonth;
      this.usersNumberDynamicsChartLabels = usersData.usersNumberDynamics.measurementPeriod;
    }
  }

}
