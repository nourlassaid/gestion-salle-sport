import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../services/member.service'; // Corrigé : chemin correct
import { Member } from '../models/Member.model';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  member: Member | null = null;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMember(+id).subscribe((data: Member) => {
        this.member = data;
      });
    }
  }
}
