import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RedditserviceService } from 'src/app/services/redditservices/redditservice.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [DemoMaterialModule, MatGridListModule, NgFor],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public hot_list: any = []
  public new_list: any = []
  public top_list: any = []

  constructor(private redditService: RedditserviceService) {

  }

  ngOnInit(): void {
    this.redditService.get_reddit_posts().subscribe(data => {
      this.hot_list = data.hot_list;
      this.new_list = data.new_list;
      this.top_list = data.top_list;
    });
  }

}
