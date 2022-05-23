import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }
  allSurveys = []
  // mean = 0
  // standardDev = 0

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.mean = params['mean'];
    //   this.standardDev = params['standardDev'];
    // });
    this.getSurveyData()
    // console.log("mean is: ", this.mean, "standard dev is: ", this. standardDev)
  }

  getSurveyData() {
    let obs = this.http.get("http://3.86.28.178:31880/student");
    obs.subscribe((response) => this.formatData(response))
  }

  formatData(survey) {
    try {
      let idList: string[] = [];

      survey.forEach(element => {
        idList.push(element.id);
      });
      this.allSurveys = idList;
    } catch (error) {
      console.log(error)
    }
  }
}
