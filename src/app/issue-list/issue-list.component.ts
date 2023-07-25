import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  showReportIssue = false;
  selectedIssueResolve: Issue | null = null;
  selectedIssueEdit: Issue | null = null;

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.getIssues();
  }
  private getIssues() {
    this.issues = this.issuesService.getPendingIssues();
  }
  onFormClose() {
    this.showReportIssue = false;
    this.getIssues();
  }
  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssueResolve) {
      this.issuesService.completeIssue(this.selectedIssueResolve);
      this.getIssues();
    }
    this.selectedIssueResolve = null;
  }
  onEditModalClose() {
    this.getIssues();
    this.selectedIssueEdit = null;
  }
}
