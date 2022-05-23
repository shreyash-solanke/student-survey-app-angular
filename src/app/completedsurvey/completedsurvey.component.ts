import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completedsurvey',
  templateUrl: './completedsurvey.component.html',
  styleUrls: ['./completedsurvey.component.css']
})
export class CompletedsurveyComponent implements OnInit {
  survey = null
  isDataAvailable = false
  constructor(private http: HttpClient) { }

  like = [
    { name: "Students", selected: false },
    { name: "Location", selected: false },
    { name: "Campus", selected: false },
    { name: "Atmosphere", selected: false },
    { name: "Dorm rooms", selected: false },
    { name: "Sports", selected: false }
  ]

  ngOnInit(): void {
    this.getStudentData()
  }

  getStudentData() {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get('id')
    const url = "http://3.86.28.178:31880/student/"
    let obs = this.http.get(url + id);
    obs.subscribe((response) => this.loadData(response),
      (error) => {
        console.log('oops', console.log(error.status))
        if (error.status == 404) {
          alert("Student data does not exists");
        }
      })
  }

  loadData(studentData) {

    let likeArray = studentData.campusLikes;

    this.like.forEach(individualLike => {
      if (likeArray.includes(individualLike.name)) {
        individualLike.selected = true
      }
    });

    this.survey = studentData;
    this.isDataAvailable = true;
  }
  return() {
    window.history.back();
  }
}
