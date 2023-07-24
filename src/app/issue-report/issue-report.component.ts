import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IssueForm } from '../issue-form';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent {
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
  });

  constructor(private issuesService: IssuesService) {}

  addIssue() {
    this.issuesService.createIssue(this.issueForm.getRawValue() as Issue);
  }
}