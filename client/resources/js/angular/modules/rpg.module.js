"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const http_1 = require('@angular/http');
const forms_1 = require('@angular/forms');
const common_1 = require('@angular/common');
const index_routing_1 = require('../routings/index.routing');
const api_service_1 = require('../services/api.service');
const authentication_service_1 = require('../services/authentication.service');
const index_component_1 = require('../components/rpg/index/index.component');
const nav_bar_component_1 = require('../components/shared/nav-bar/nav-bar.component');
const sticky_footer_component_1 = require('../components/shared/sticky-footer/sticky-footer.component');
const home_component_1 = require('../components/rpg/home/home.component');
const login_component_1 = require('../components/rpg/login/login.component');
const profile_component_1 = require('../components/rpg/profile/profile.component');
let RpgModule = class RpgModule {
};
RpgModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            index_routing_1.IndexRouting
        ],
        declarations: [
            index_component_1.IndexComponent,
            nav_bar_component_1.NavBarComponent,
            sticky_footer_component_1.StickyFooterComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            profile_component_1.ProfileComponent
        ],
        providers: [
            common_1.FormBuilder,
            api_service_1.ApiService,
            authentication_service_1.AuthenticationService
        ],
        bootstrap: [
            index_component_1.IndexComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], RpgModule);
exports.RpgModule = RpgModule;
//# sourceMappingURL=rpg.module.js.map