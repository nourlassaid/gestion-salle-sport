import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  members: Member[] = [];
  query: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query.trim()) {
        this.isLoading = true;
        this.error = null;
        this.memberService.searchMembers(this.query).subscribe({
          next: results => {
            this.members = results;
            this.isLoading = false;
          },
          error: err => {
            this.error = "Erreur lors de la recherche.";
            this.isLoading = false;
          }
        });
      }
    });
  }
}
