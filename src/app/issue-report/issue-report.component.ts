import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IssueForm } from '../issue-form';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  addIssueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  @Output() formClose = new EventEmitter();
  suggestions: Issue[] = [];

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.addIssueForm.controls.title.valueChanges.subscribe((title) => {
      this.suggestions = this.issuesService.getSuggestions(title);
    });
  }

  addIssue() {
    if (this.addIssueForm && this.addIssueForm.invalid) {
      this.addIssueForm.markAllAsTouched();
      return;
    }

    this.issuesService.createIssue(this.addIssueForm.getRawValue() as Issue);
    this.formClose.emit();
  }
}
