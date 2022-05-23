import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  like = [
    { name: "Students", selected: false },
    { name: "Location", selected: false },
    { name: "Campus", selected: false },
    { name: "Atmosphere", selected: false },
    { name: "Dorm rooms", selected: false },
    { name: "Sports", selected: false }
  ]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitSurvey(values) {
    var processedlike = this.like
      .filter(opt => opt.selected)
      .map(opt => opt.name);

    var body = {
      "firstName": values.firstname,
      "lastName": values.lastname,
      "address": values.address,
      "city": values.city,
      "states": values.state,
      "zip": values.zip,
      "telephone": values.phone,
      "email": values.email,
      "surveyDate": values.date,
      "campusLikes": processedlike,
      "interested": values.interested,
      "recommend": values.recommend,

    }

    console.log("Body : " + JSON.stringify(body));

    let obs = this.http.post("http://3.86.28.178:31880/student", body)



    obs.subscribe((response) => {
      console.log(response)
      alert("Student survey has been successfully submitted.");
      window.location.reload();
      // let mean = response["dataBean"]["mean"]
      // let standardDev = response["dataBean"]["standardDev"]
      //  window.location.href = `http://localhost:4200/all?mean=${mean}&standardDev=${standardDev}`;
    },
      (error) => {
        console.log('oops', console.log(error.status))
        alert("Something went wrong! Please try again.");
      }
    )
  }
  clearSurvey() {
    window.location.reload();
  }


}
