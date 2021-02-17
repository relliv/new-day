import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DaybookLogService {
  public getDaybookDate(bookId: any, targetDate: string): any {
    return gql `query getDaybookDate{
      daybook(id: ${bookId}) {
        id
        title
        icon
        color
        archive
      },
      daybookDate(where: {
          AND: [
            { column: DAYBOOK_ID, operator: EQ, value: ${bookId} }
            { column: TARGET_DATE, operator: EQ, value: "${targetDate}" }
          ]
        }){
        id
        daybook_id
        target_date
        logs{
          id
          title
          log
          created_at
          updated_at
        }
        created_at
        updated_at
      }
    }`;
  }

  public firstDaybookDateLog(daybookId: any, targetDate: any): any {
    return gql `mutation {
      firstDaybookDateLog(
        input: {
          daybook_id: ${daybookId},
          title: "Untitled"
          log: "",
          daybook_date: { upsert: { daybook_id: ${daybookId}, target_date: "${targetDate}" } }
        }
      ) {
        id
        daybook_id
        daybook_date_id
        title
        log
        created_at
        updated_at
        daybook_date{
          id
          daybook_id
          target_date
          created_at
          updated_at
        }
      }
    }`;
  }

  public updateDaybookDateLog(id: any, title: any, log: any): any {
    return gql `mutation {
      updateDaybookDateLog(
        input: {
          id: ${id},
          title: "${title}"
          log: "${log}"
        }
      ) {
        updated_at
      }
    }
    `;
  }

  public createDaybookDateLog(daybookId: any, daybookDateId: any): any {
    return gql `mutation {
      createDaybookDateLog(
        input: { daybook_id: ${daybookId}, daybook_date_id: ${daybookDateId}, title: "Untitled", log: "" }
      ) {
        id
        title
        log
        created_at
        updated_at
      }
    }`;
  }
}
