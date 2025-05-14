import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../services/member.service';
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
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.memberService.getMember(id).subscribe({
        next: (data: Member) => {
          this.member = data;
        },
        error: () => {
          console.error('Erreur lors de la récupération du membre');
          this.member = null;
        }
      });
    }
  }
}
