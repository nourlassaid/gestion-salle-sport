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
import { MonthMembersComponent } from './month-members/month-members.component';
import { AddReceptionComponent } from './receptions/add-reception/add-reception.component';
import { ListReceptionsComponent } from './receptions/list-receptions/list-receptions.component';
import { AddAbonnementComponent } from './add-abonnement/add-abonnement.component';
import { ListAbonnementComponent } from './list-abonnement/list-abonnement.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CoachesComponent } from './coaches/coaches.component';
import { PlanningComponent } from './planning/planning.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ContactComponent } from './contact/contact.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { AuthGuard } from './auth.guard';
import { EditCoachComponent } from './edit-coach/edit-coach.component';

const routes: Routes = [
{ path: 'admin', component: AdminComponent },

  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  { path: 'members/add', component: AddMemberComponent },
  { path: 'members/list', component: MembersListComponent },
  { path: 'members/view/:id', component: MemberViewComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'coaches/add', component: CoachFormComponent },
  { path: 'coaches/list', component: CoachListComponent },
  { path: 'coaches/edit/:id', component: CoachFormComponent }, // <-- correcte
  { path: 'planning/add', component: AddComponent },
  { path: 'planning/list', component: PlanningImageListComponent }, // ✅ si créé
    { path: 'planning/upload', component: PlanningUploadComponent },
{ path: 'factures/add', component: FactureAddComponent },
  { path: 'factures/list', component: FactureListComponent },
  { path: 'members/month/:month', component: MonthMembersComponent },
  {
    path: 'receptions/add',
    component: AddReceptionComponent,
  },
  {
    path: 'receptions/list',
    component: ListReceptionsComponent,},
  { path: 'subscriptions/add', component: AddAbonnementComponent },
  { path: 'subscriptions/list', component: ListAbonnementComponent },
  { path: 'edit-coach/:id', component: EditCoachComponent },
  // Redirection par défaut si besoin
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
{ path: 'members/edit/:id', component: EditMemberComponent },
  { path: 'Accueil', component: AccueilComponent },
    { path: 'about', component: AboutComponent },
      { path: 'activities', component: ActivitiesComponent },
        { path: 'coaches', component: CoachesComponent },
          { path: 'planning', component: PlanningComponent },
          { path: 'inscription', component: InscriptionComponent },
  { path: 'contact', component: ContactComponent },
    { path: 'coach/:id', component: CoachDetailComponent },

{ path: 'pages/dash', component: DashboardComponent },
  { path: 'admindashboard', component: DashboardComponent },

{
  path: 'admindashboard',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard]
},




{ path: 'members/month/:month/:group', component: MonthMembersComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
