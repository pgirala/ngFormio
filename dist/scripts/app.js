"use strict";angular.module("formioApp",["ngSanitize","restangular","ui.router","ui.bootstrap.alert","ui.bootstrap.tpls","ui.select","angularMoment","formioApp.controllers","formioApp.services","formioApp.directives"]).config(["$stateProvider","$urlRouterProvider","FormioProvider","RestangularProvider",function(e,r,o,s){o.setBaseUrl("/api"),s.setBaseUrl("/api"),e.state("home",{url:"/?",templateUrl:"views/home/home.html"}),r.otherwise("/")}]).filter("trusted",["$sce",function(e){return function(r){return e.trustAsResourceUrl(r)}}]).run(["$state","$stateParams","$rootScope","FormioAlerts",function(e,r,o,s){e.go("home"),o.alerts=[],o.closeAlert=function(e){o.alerts.splice(e,1)},o.isActive=function(){for(var e=!0,r=arguments[0],o=1;o<arguments.length;o++){if(!r.hasOwnProperty(arguments[o])){e=!1;break}r=r[arguments[o]]}return e},o.$state=e,o.$stateParams=r,o.$on("$stateChangeSuccess",function(e,r,t,i,u){o.alerts=s.getAlerts(),o.previousState=i.name,o.previousParams=u,o.currentState=r.name}),o.back=function(){e.go(o.previousState,o.previousParams)}}]),angular.module("formioApp.controllers",["formioApp.controllers.resource"]).config(["ResourceProvider",function(e){var r=function(e){return e.toLowerCase().replace(/ (.)/g,function(e,r){return r.toUpperCase()})},o=function(e){e.$watch("resource.title",function(){e.resource.name=e.resource.title?r(e.resource.title):""})};e.register({title:"Form",name:"form",url:"/form",views:{create:"views/form/form.html",edit:"views/form/form.html"}}),e.register({title:"Resource",name:"resource",url:"/resource",onEdit:o,onCreate:o,views:{create:"views/resource/resource.html",edit:"views/resource/resource.html"}})}]);var app=angular.module("formioApp.controllers.resource",["ngDialog","ui.sortable","ui.bootstrap.tabs","ui.bootstrap.tpls","ngFormBuilder","formio","bgf.paginateAnything"]);app.provider("Resource",["$stateProvider","RestangularProvider",function(e,r){var o={};return r.setRestangularFields({id:"_id"}),{register:function(r){var s=" resource-title=\"'"+r.title+"'\"";s+=" resource-name=\"'"+r.name+"'\"",o[r.name]=r,e.state("list"+r.title+"s",{url:r.url,template:"<resource-list"+s+"></resource-list>"}).state("view"+r.title,{url:r.url+"/:id",templateUrl:"views/resource/resource-view.html",controller:"ResourceViewController",params:{resource:r}}).state("edit"+r.title,{url:r.url+"/:id/edit",templateUrl:"views/resource/resource-edit.html",controller:"ResourceEditController",params:{resource:r}}).state("delete"+r.title,{url:r.url+"/:id/delete",templateUrl:"views/resource/resource-delete.html",controller:"ResourceDeleteController",params:{resource:r}}).state("create"+r.title,{url:"/create/"+r.name,templateUrl:"views/resource/resource-create.html",controller:"ResourceCreateController",params:{resource:r}}).state("api"+r.title,{url:r.url+"/:id/api",templateUrl:"views/resource/resource-api.html",controller:"ResourceAPIController",params:{resource:r}}).state("api"+r.title+".spec",{url:"/spec",templateUrl:"views/resource/resource-api.spec.html",controller:"ResourceAPISpecController",params:{resource:r}}).state("api"+r.title+".embed",{url:"/embed",templateUrl:"views/resource/resource-api.embed.html",controller:"ResourceAPIEmbedController",params:{resource:r}}).state("list"+r.title+"Submissions",{url:r.url+"/:id/submission",templateUrl:"views/resource/resource-submissions.html",controller:"ResourceSubmissionsController",params:{resource:r}}).state("view"+r.title+"Submission",{url:r.url+"/:id/submission/:subId",templateUrl:"views/resource/resource-submission-view.html",controller:"ResourceSubmissionViewController",params:{resource:r}}).state("edit"+r.title+"Submission",{url:r.url+"/:id/submission/:subId/edit",templateUrl:"views/resource/resource-submission-edit.html",controller:"ResourceSubmissionEditController",params:{resource:r}}).state("delete"+r.title+"Submission",{url:r.url+"/:id/submission/:subId/delete",templateUrl:"views/resource/resource-submission-delete.html",controller:"ResourceSubmissionDeleteController",params:{resource:r}})},$get:function(){return o}}}]),app.factory("FormioAlerts",["$rootScope",function(e){var r=[];return{addAlert:function(o){e.alerts.push(o),o.element?angular.element("#form-group-"+o.element).addClass("has-error"):r.push(o)},getAlerts:function(){var e=angular.copy(r);return r.length=0,r=[],e},onError:function(e){_.each(e.data.errors,function(e){this.addAlert({type:"danger",message:e.message,element:e.path})}.bind(this))}}}]),app.service("Submission",function(e){return{on:function(r,o){return e.service("submission",e.one(r,o))}}}),app.directive("resourceList",function(){return{restrict:"E",replace:!0,templateUrl:"views/resource/resource-list.html",scope:{resourceTitle:"=",resourceName:"=",numPerPage:"="},compile:function(e,r){r.numPerPage||(r.numPerPage=25),r.resourceTitle||(r.resourceTitle="Resource"),r.resourceName||(r.resourceName="resource")},controller:["$scope","Restangular",function(e,r){e.resources=[],e.resourcesPerPage=e.numPerPage,e.resourceUrl=r.all(e.resourceName).getRestangularUrl(),e.resourceInfo={title:e.resourceTitle,name:e.resourceName}}]}}),app.controller("ResourceViewController",["$scope","$state","$stateParams","FormioAlerts","$location",function(e,r,o,s,t){e.nav={},e.nav[o.resource.name]={view:!0},e.resourceUrl=t.url(),e.resourceInfo=o.resource,e.resource={},e.$on("formLoad",function(r,o){e.resource=o}),e.$on("formSubmission",function(t,i){s.addAlert({type:"success",message:"New submission added!"}),r.go("view"+o.resource.title+"Submission",{id:e.resource._id,subId:i._id})})}]),app.controller("ResourceCreateController",["$scope","$state","$stateParams","Restangular","FormioAlerts",function(e,r,o,s,t){e.resourceName=o.resource.name,e.resource={title:"",components:[]},e.nav={},e.resourceInfo=o.resource,e.nav[o.resource.name]={edit:!0},e.resourceInfo.onCreate&&e.resourceInfo.onCreate(e,r,o,s,t),e.saveResource=function(){s.all(o.resource.name).post(e.resource).then(function(e){t.addAlert({type:"success",message:"Successfully created form!"}),r.go("api"+o.resource.title,{id:e._id})},t.onError.bind(t))}}]),app.controller("ResourceEditController",["$scope","$state","$stateParams","Restangular","FormioAlerts",function(e,r,o,s,t){e.resource={},e.nav={},e.resourceInfo=o.resource,e.nav[o.resource.name]={edit:!0},e.resourceInfo.onEdit&&e.resourceInfo.onEdit(e,r,o,s,t),s.one(o.resource.name,o.id).get().then(function(s){e.resource=s,e.saveResource=function(){e.resource.save().then(function(){t.addAlert({type:"success",message:"Saved form successfull."}),r.go("view"+o.resource.title,{id:s._id})},t.onError.bind(t))}})}]),app.controller("ResourceDeleteController",["$scope","$state","$stateParams","Restangular","FormioAlerts",function(e,r,o,s,t){e.nav={},e.nav[o.resource.name]={"delete":!0},e.resourceInfo=o.resource,e.resource=s.one(o.resource.name,o.id).get().$object,e.deleteResource=function(){e.resource.remove().then(function(){t.addAlert({type:"success",message:"Delete successfull."}),r.go("list"+o.resource.title+"s")},t.onError.bind(t))}}]),app.controller("ResourceAPIController",["$scope","$state","$stateParams","Restangular",function(e,r,o,s){e.resource=s.one(o.resource.name,o.id).get().$object,e.resourceInfo=o.resource,e.nav={},e.nav[o.resource.name]={api:!0},r.transitionTo("api"+o.resource.title+".spec",{id:o.id})}]),app.controller("ResourceAPISpecController",["$scope",function(e){e.getSwaggerURL=function(){return"http://localhost:3000/form/"+e.resource._id+"/spec.html"},e.nav[e.$parent.resourceInfo.name]={api:{spec:!0}}}]),app.controller("ResourceAPIEmbedController",["$scope",function(e){e.nav[e.$parent.resourceInfo.name]={api:{embed:!0}}}]),app.controller("ResourceSubmissionsController",["$scope","$state","$stateParams","$location",function(e,r,o,s){e.nav={},e.resourceInfo=o.resource,e.nav[o.resource.name]={submission:!0},e.resourceUrl=s.url().replace("/submission",""),e.resource={},e.$on("formLoad",function(r,o){e.resource=o}),e.$on("submissionView",function(o,s){r.go("view"+e.resourceInfo.title+"Submission",{id:e.resource._id,subId:s._id})}),e.$on("submissionEdit",function(o,s){r.go("edit"+e.resourceInfo.title+"Submission",{id:e.resource._id,subId:s._id})}),e.$on("submissionDelete",function(o,s){r.go("delete"+e.resourceInfo.title+"Submission",{id:e.resource._id,subId:s._id})})}]),app.controller("ResourceSubmissionViewController",["$scope","$stateParams","Formio","Restangular","Submission",function(e,r,o,s,t){e.nav={form:{submission:{view:!0}}},e.resourceInfo=r.resource,e.submissionData=o.submissionData,e.submission=t.on(r.resource.name,r.id).one(r.subId).get().$object,e.resource=s.one(r.resource.name,r.id).get().$object}]),app.controller("ResourceSubmissionEditController",["$scope","$state","$stateParams","FormioAlerts","$location",function(e,r,o,s,t){e.nav={},e.nav[o.resource.name]={submission:{edit:!0}},e.resourceInfo=o.resource,e.submissionUrl=t.url(),e.resource={},e.submission={},e.$on("formLoad",function(r,o){e.resource=o}),e.$on("submissionLoad",function(r,o){e.submission=o}),e.$on("formSubmission",function(e,t){var i="put"===t.method?"updated":"created";s.addAlert({type:"success",message:"Submission was "+i+"."}),r.go("list"+o.resource.title+"Submissions",{id:o.id})}),e.deleteSubmission=function(){e.submission.remove().then(function(){r.go("list"+o.resource.title+"Submissions",{id:o.id})},s.onError.bind(s))}}]),app.controller("ResourceSubmissionDeleteController",["$scope","$state","$stateParams","FormioAlerts","$location",function(e,r,o,s,t){e.nav={},e.nav[o.resource.name]={submission:{"delete":!0}},e.resource={_id:o.id},e.submissionUrl=t.url(),e.resourceInfo=o.resource,e.$on("delete",function(){s.addAlert({type:"success",message:"Submission was deleted."}),r.go("list"+o.resource.title+"Submissions",{id:o.id})}),e.$on("cancel",function(){r.go("view"+o.resource.title+"Submission",{id:o.id,subId:o.subId})}),e.$on("formError",function(e,r){s.onError(r)})}]),angular.module("formioApp.directives",[]).directive("logo",function(){return{restrict:"E",scope:{size:"@"},templateUrl:"views/partials/logo.html"}}),angular.module("formioApp.services",[]).service("popupService",["$window",function(e){this.showPopup=function(r){return e.confirm(r)}}]);