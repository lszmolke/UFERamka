import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as RtrMdl from '@ngrx/router-store';
import 'rxjs/add/operator/map';
import {RouterStateUrl } from '../shared/utils';


@Injectable()
export class EffectsService {

  @Effect({ dispatch: false })
  route$ = this.actions$
    .ofType(RtrMdl.ROUTER_NAVIGATION)
    .map((action: RtrMdl.RouterNavigationAction) => console.log(  (<RouterStateUrl><any>(action.payload.routerState)).queryParams)) ;


  constructor(private actions$: Actions) { }

}
