import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MembersListComponent } from './members-list/members-list.component'; // ✅ Garder uniquement ce bon chemin
import { MemberViewComponent } from './member-view/member-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'members/add', component: AddMemberComponent },
  { path: 'members/list', component: MembersListComponent },
  { path: 'members/view/:id', component: MemberViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
