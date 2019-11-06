import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(
    private testService: TestService
  ) { }

  ngOnInit() {
    console.log('jestem');
  }

  onClick() {
    let test = '';
    console.log('klikam sobie');
    this.testService.getTestValue().subscribe(data => {
      test = data;
      console.log('z serwera : ' + test);
    });

  }

}
