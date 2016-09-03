import { Component }		from '@angular/core';
import { Router }						from '@angular/router';
import { TranslateService }	from 'ng2-translate/ng2-translate';

import { SessionService }	from '../../../../services/session.service';

@Component({
    selector: 'rpg-manage-home',
	templateUrl: 'angular/components/rpg/manage/home/manage-home.component.tpl.html',
	styleUrls: [
		'angular/components/rpg/manage/home/manage-home.component.css'
	]
})

export class ManageHomeComponent { 
	
	constructor (
		private session:	SessionService,
		private translate:	TranslateService,
		private router:		Router) { 
			//console.log(router.config);
		}
}