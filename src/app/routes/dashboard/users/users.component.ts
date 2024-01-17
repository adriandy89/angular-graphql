import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_USERS = gql`
  query Users {
  users {
    _id
    name
    username
    email
    active
    role {
      permissions {
        administration
      }
    }
  }
}
`;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  users: any;

  private querySubscription!: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_USERS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.users = data.users;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
