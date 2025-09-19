import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../notification.service';
import { MemberService } from '../services/member.service';
import { Member } from '../models/Member.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;
  expiredMembers: Member[] = [];

  constructor(
    private notificationService: NotificationService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadExpiredMembers();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: data => {
        this.notifications = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.map(n =>
        n.id === id ? { ...n, statut: 'Lue' } : n
      );
    });
  }

  loadExpiredMembers(): void {
    this.memberService.getExpiredMembers().subscribe({
      next: (members: Member[]) => this.expiredMembers = members,
      error: (err: any) => console.error(err)
    });
  }
}
