import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from 'src/app/errors/not-found/not-found.component';
import { ServerErrorComponent } from 'src/app/errors/server-error/server-error.component';
import { TestErrorsComponent } from 'src/app/errors/test-errors/test-errors.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ListsComponent } from 'src/app/lists/lists.component';
import { MemberDetailComponent } from 'src/app/members/member-detail/member-detail.component';
import { MemberEditComponent } from 'src/app/members/member-edit/member-edit.component';
import { MemberListComponent } from 'src/app/members/member-list/member-list.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { PreventUnsavedChangesGuard } from 'src/app/_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from 'src/app/_resolvers/member-detailed.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver} },
      { path: 'member/edit', component: MemberEditComponent , canDeactivate: [PreventUnsavedChangesGuard]},
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: 'errors', component: TestErrorsComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
