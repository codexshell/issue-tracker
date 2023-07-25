import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Issue } from '../issue';
import { IssueForm } from '../issue-form';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit {
  @Input() issue: Issue | undefined = undefined;
  @Output() modalClose = new EventEmitter<Issue>();
  editIssueForm: FormGroup<IssueForm> | undefined;

  constructor(
    private builder: FormBuilder,
    private issuesService: IssuesService
  ) {}

  ngOnInit(): void {
    if (this.issue) {
      this.editIssueForm = this.builder.group<IssueForm>({
        title: new FormControl(this.issue.title, {
          nonNullable: true,
          validators: Validators.required,
        }),
        description: new FormControl(this.issue.description, {
          nonNullable: true,
        }),
        priority: new FormControl(this.issue.priority, {
          nonNullable: true,
          validators: Validators.required,
        }),
        type: new FormControl(this.issue.type, {
          nonNullable: true,
          validators: Validators.required,
        }),
      });
    }
  }

  editIssue() {
    if (this.issue) {
      if (this.editIssueForm?.invalid) {
        this.editIssueForm.markAllAsTouched();
        return;
      }
      const issue: Issue = this.editIssueForm?.getRawValue() as Issue;
      issue.issueNo = this.issue?.issueNo!;
      this.issuesService.updateIssue(issue);
      this.modalClose.emit();
    }
  }
}
