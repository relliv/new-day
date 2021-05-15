import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DaybookService {
  public createDaybook(title: string, description: any = null): any {
    return gql `mutation {
      createDaybook(input: { title: "${title}", description: "${description}"}) {
        id
        title
        description
      }
    }`;
  }

  public updateDaybook(): any {
    return gql `mutation updateDaybook(
      $id: ID!
      $title: String
      $description: String
      $icon: String
      $color: String
    ) {
      updateDaybook(
        input: {
          id: $id
          title: $title
          description: $description
          icon: $icon
          color: $color
        }
      ) {
        updated_at
      }
    }`;
  }

  public getBooks(page: number = 1): any {
    return gql `query getDaybooks{
      daybooks(orderBy: [{ column: CREATED_AT, order: DESC }], first: 25){
        data{
          id
          title
          description
          icon
          color
          archive
          created_at
          updated_at
        }
        paginatorInfo {
          currentPage
          lastPage
          perPage
          hasMorePages
        }
      }
    }`;
  }

  public getBook(id: any): any {
    return gql `query getDaybook{
      daybook(id: ${id}){
        id
        title
        icon
        color
        archive
        created_at
        updated_at
        dates {
          id
          target_date
          logs_count
          last_log {
            id
            updated_at
          }
          created_at
          updated_at
        }
      }
    }`;
  }
}
