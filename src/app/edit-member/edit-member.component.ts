import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  memberForm!: FormGroup;
  memberId!: number;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMember(this.memberId).subscribe({
      next: (member) => {
        this.memberForm = this.fb.group({
          nom: [member.nom, Validators.required],
          prenom: [member.prenom, Validators.required],
          telephone: [member.telephone, Validators.required],
          date_inscription: [member.date_inscription, Validators.required],
          prix: [member.prix, [Validators.required, Validators.min(0)]],
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du membre :', err);
        alert("Impossible de charger les informations du membre.");
      }
    });
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      this.isSubmitting = true;
      this.memberService.updateMember(this.memberId, this.memberForm.value).subscribe({
        next: () => {
          alert('Membre mis à jour avec succès.');
          this.router.navigate(['/dashboard/members']);
        },
        error: (err) => {
          console.error('Erreur de mise à jour :', err);
          alert("Une erreur est survenue lors de la mise à jour.");
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
