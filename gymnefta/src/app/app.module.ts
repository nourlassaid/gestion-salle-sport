import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { AddMemberComponent } from './add-member/add-member.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { SearchResultsComponent } from './members/search-results/search-results.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachFormComponent } from './coach-form/coach-form.component';
import { AddComponent } from './planning/add/add.component';
import { PlanningImageListComponent } from './planning-image-list/planning-image-list.component';
import { PlanningUploadComponent } from './planning-upload/planning-upload.component';
import { PlanningComponent } from './planning/planning.component'; // ✅ Ajout du composant manquant
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
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
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ContactComponent } from './contact/contact.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditCoachComponent } from './edit-coach/edit-coach.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    AdminDashboardComponent,
    AddMemberComponent,
    MembersListComponent,
    MemberViewComponent,
    SearchResultsComponent,
    TopbarComponent,
    DashboardComponent,
    AddCoachComponent,
    CoachListComponent,
    CoachFormComponent,
    AddComponent,
    PlanningImageListComponent,
    PlanningUploadComponent,
    PlanningComponent, // ✅ Ici
    FactureListComponent,
    FactureAddComponent,
    MonthMembersComponent,
    AddReceptionComponent,
    ListReceptionsComponent,
    AddAbonnementComponent,
    ListAbonnementComponent,
    EditMemberComponent,
    AccueilComponent,
    AboutComponent,
    ActivitiesComponent,
    CoachesComponent,
    SubscriptionsComponent,
    InscriptionComponent,
    ContactComponent,
    CoachDetailComponent,
    NotificationsComponent,
    EditCoachComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
        NgChartsModule



  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
