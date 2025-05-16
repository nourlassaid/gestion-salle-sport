import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { SearchResultsComponent } from './members/search-results/search-results.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachFormComponent } from './coach-form/coach-form.component';
import { AddComponent } from './planning/add/add.component';
import { PlanningImageListComponent } from './planning-image-list/planning-image-list.component';
import { PlanningUploadComponent } from './planning-upload/planning-upload.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
import { FactureListComponent } from './facture-list/facture-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admindashboard', component: DashboardComponent },
  { path: 'members/add', component: AddMemberComponent },
  { path: 'members/list', component: MembersListComponent },
  { path: 'members/view/:id', component: MemberViewComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'coaches/add', component: CoachFormComponent }, // ✅ corrigé
  { path: 'coaches/list', component: CoachListComponent },
  { path: 'coaches/edit', component: CoachFormComponent },
  { path: 'planning/add', component: AddComponent },
  { path: 'planning/list', component: PlanningImageListComponent }, // ✅ si créé
    { path: 'planning/upload', component: PlanningUploadComponent },
{ path: 'factures/add', component: FactureAddComponent },
  { path: 'factures/list', component: FactureListComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
