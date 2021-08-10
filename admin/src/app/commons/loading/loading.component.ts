import { Component, OnInit } from '@angular/core';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isLoading: boolean;
  constructor(
    private loading: LoadingService,
  ) {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit(): void {
  }

}
