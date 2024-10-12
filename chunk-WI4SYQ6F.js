import{Aa as h,Ba as i,Ca as n,Da as d,Ga as k,Ha as N,Ia as $,Ja as _,K as B,Ka as r,La as O,Ma as u,Na as R,O as V,P as v,Qa as c,R as s,Ra as I,Sa as j,U as L,ga as M,gb as G,hb as U,lb as H,ma as a,pb as W,qb as F,rb as y,ta as f,tb as q,ua as z,wa as T,xa as w,ya as C,z as E,za as x}from"./chunk-IDPCQHP4.js";var b=(()=>{let e=class e{constructor(l){this.http=l,this.BLOG_API="./assets/mock-data/data.json",this.CV_API="./assets/mock-data"}getPosts(){return this.http.get(this.BLOG_API).pipe(E(500))}getExperience(){return this.http.get(`${this.CV_API}/experience.json`).pipe(E(500))}getProjects(){return this.http.get(`${this.CV_API}/projects.json`).pipe(E(500))}getSkills(){return this.http.get(`${this.CV_API}/skills.json`).pipe(E(500))}getUser(){return this.http.get(`${this.CV_API}/data.json`).pipe(E(500))}};e.\u0275fac=function(o){return new(o||e)(V(H))},e.\u0275prov=B({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var J=(()=>{let e=class e{constructor(){this.mainService=v(b)}ngOnInit(){this.user=this.mainService.getUser()}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-header"]],standalone:!0,features:[c],decls:21,vars:6,consts:[[1,"flex","flex-col","justify-between","gap-5"],["src","https://www.dropbox.com/scl/fi/98hlsposc0ylyk3op0pl2/Ronjo.jpg?rlkey=1ijjhanp3w2ygtosu7oiecx1d&st=kxfpz1gt&raw=1","alt","Ron profile image","width","150","height","150",1,"rounded-full","border-4","border-cyan-500"],[1,"flex","flex-col","gap-2"],[1,"text-sm","font-semibold","text-neutral-400","md:text-base"],[1,"text-5xl","font-semibold","md:text-6xl"],[1,"text-lg","text-cyan-500","md:text-xl"],[1,"flex","gap-3"],["href","www.linkedin.com/in/ron-jo-linkme","title","Linkedin page"],[1,"h-5"],["href","https://github.com/RonJo07/","title","Github profile"],["href","https://www.dropbox.com/scl/fi/9ma7cwpwqrr5pty3riuj5/Ron.pdf?rlkey=nl884jdpc4sct1zl48ilhyakk&st=393ulh1s&dl=0","title","Curriculim Vitae"],[1,"h-5","w-5"]],template:function(o,p){if(o&1&&(i(0,"section",0),d(1,"img",1),i(2,"div",2)(3,"div")(4,"span",3),r(5,"Hey! I'm"),n(),i(6,"h1",4),r(7),I(8,"async"),n()(),i(9,"h2",5),r(10),I(11,"async"),n(),i(12,"p",3),r(13," Web Developer & Tech Enthusiast | Creating Elegant and Functional Online Spaces | Transforming Ideas into Interactive Experiences | Crafting Code with Creativity and Minimalism. "),n()(),i(14,"div",6)(15,"app-link-button",7),d(16,"app-x-icon",8),n(),i(17,"app-link-button",9),d(18,"app-github-icon",8),n(),i(19,"app-link-button",10),d(20,"app-file-icon",11),n()()()),o&2){let P,A;a(7),u(" ",(P=j(8,2,p.user))==null?null:P.name," "),a(3),u(" ",(A=j(11,4,p.user))==null?null:A.label," ")}},dependencies:[q,F,y,W,G],encapsulation:2});let t=e;return t})();var Q=(()=>{let e=class e{constructor(){this.label=""}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-badge"]],inputs:{label:"label"},standalone:!0,features:[c],decls:2,vars:1,consts:[[1,"rounded-md","border","border-neutral-600","px-2","text-sm","text-neutral-400"]],template:function(o,p){o&1&&(i(0,"div",0),r(1),n()),o&2&&(a(1),u(" ",p.label," "))},encapsulation:2});let t=e;return t})();var D=(()=>{let e=class e{constructor(){this.class=""}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-link-icon"]],inputs:{class:"class"},standalone:!0,features:[c],decls:2,vars:2,consts:[["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 640 512"],["d","M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"]],template:function(o,p){o&1&&(L(),i(0,"svg",0),d(1,"path",1),n()),o&2&&z(p.class)},encapsulation:2});let t=e;return t})();function ie(t,e){if(t&1&&(i(0,"li"),d(1,"app-badge",7),n()),t&2){let m=e.$implicit;a(1),f("label",m)}}function oe(t,e){if(t&1&&(i(0,"app-link-button",6),d(1,"app-link-icon",8),n()),t&2){let m=k();_("title","",m.project.name," page"),f("href",m.project.url)}}function re(t,e){if(t&1&&(i(0,"app-link-button",6),d(1,"app-github-icon",8),n()),t&2){let m=k();_("title","",m.project.name," repository"),f("href",m.project.repo)}}var K=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-project"]],inputs:{project:"project"},standalone:!0,features:[c],decls:12,vars:4,consts:[[1,"rounded-lg","border","border-neutral-800","px-5","py-4","transition-all","hover:scale-[102%]","hover:border-cyan-600"],[1,"mb-3","flex","flex-row","flex-wrap","items-center","gap-3"],[1,"text-nowrap","text-xl","font-semibold","transition-all","md:text-2xl"],[1,"flex","flex-wrap","gap-3"],[1,"mb-4","text-sm","leading-snug","text-neutral-400","sm:text-base"],[1,"flex","gap-2"],[3,"href","title"],[3,"label"],[1,"h-4","w-4"]],template:function(o,p){o&1&&(i(0,"article",0)(1,"header",1)(2,"h3",2),r(3),n(),i(4,"ul",3),x(5,ie,2,1,"li",null,C),n()(),i(7,"p",4),r(8),n(),i(9,"footer",5),T(10,oe,2,2,"app-link-button",6)(11,re,2,2,"app-link-button",6),n()()),o&2&&(a(3),u(" ",p.project.name," "),a(2),h(p.project.tags),a(3),u(" ",p.project.description," "),a(2),w(10,p.project.url?10:-1),a(1),w(11,p.project.repo?11:-1))},dependencies:[y,F,D,Q],encapsulation:2});let t=e;return t})();var ae=["*"],S=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-title"]],standalone:!0,features:[c],ngContentSelectors:ae,decls:2,vars:0,consts:[[1,"text-4xl","font-semibold"]],template:function(o,p){o&1&&(N(),i(0,"h2",0),$(1),n())},encapsulation:2});let t=e;return t})();function le(t,e){if(t&1&&(i(0,"li"),d(1,"app-project",2),n()),t&2){let m=e.$implicit;a(1),f("project",m)}}var X=(()=>{let e=class e{constructor(){this.mainService=v(b),this.projects=[]}ngOnInit(){this.mainService.getProjects().subscribe(l=>this.projects=l)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-projects"]],standalone:!0,features:[c],decls:6,vars:0,consts:[["id","projects"],[1,"mt-10","flex","flex-col","gap-3"],[3,"project"]],template:function(o,p){o&1&&(i(0,"section",0)(1,"app-title"),r(2,"Projects"),n(),i(3,"ul",1),x(4,le,2,1,"li",null,C),n()()),o&2&&(a(4),h(p.projects))},dependencies:[K,S],encapsulation:2});let t=e;return t})();function pe(t,e){if(t&1&&(i(0,"a",6),r(1),n(),d(2,"app-link-icon",7)),t&2){let m=k();f("href",m.experience.url,M),a(1),u(" ",m.experience.company," ")}}function se(t,e){if(t&1&&r(0),t&2){let m=k();u(" ",m.experience.company," ")}}var Y=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-experience-card"]],inputs:{experience:"experience"},standalone:!0,features:[c],decls:11,vars:5,consts:[[1,"group/item","flex","flex-col","rounded-lg","border-neutral-800","py-3","transition-all","hover:scale-[102%]","md:flex-row","md:items-center","md:gap-6"],[1,"w-32","shrink-0","font-medium","text-neutral-400","transition-all","group-hover/item:text-cyan-500","md:text-right"],[1,"flex","flex-col","gap-1"],[1,"flex","items-center","gap-2","text-2xl","font-semibold"],[1,"text-sm","font-medium","text-neutral-300"],[1,"text-sm","text-neutral-400"],["target","_blank","rel","noopener noreferrer",1,"hover:underline",3,"href"],[1,"h-4","w-4","fill-neutral-50"]],template:function(o,p){o&1&&(i(0,"article",0)(1,"div",1),r(2),n(),i(3,"div",2)(4,"h3",3),T(5,pe,3,2)(6,se,1,1),n(),i(7,"p",4),r(8),n(),i(9,"p",5),r(10),n()()()),o&2&&(a(2),R(" ",p.experience.startDate," - ",p.experience.endDate," "),a(3),w(5,p.experience.url?5:6),a(3),u(" ",p.experience.position," "),a(2),u(" ",p.experience.description," "))},dependencies:[D],encapsulation:2});let t=e;return t})();function ce(t,e){if(t&1&&(i(0,"li"),d(1,"app-experience-card",3),n()),t&2){let m=e.$implicit;a(1),f("experience",m)}}var Z=(()=>{let e=class e{constructor(){this.mainService=v(b),this.experiences=[]}ngOnInit(){this.mainService.getExperience().subscribe(l=>this.experiences=l)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-experience"]],standalone:!0,features:[c],decls:8,vars:0,consts:[["id","experience"],[1,"mt-10","flex","flex-col","gap-3"],["href","","btnStyle","base",1,"mt-8","flex","underline"],[3,"experience"]],template:function(o,p){o&1&&(i(0,"section",0)(1,"app-title"),r(2,"Experience"),n(),i(3,"ul",1),x(4,ce,2,1,"li",null,C),n(),i(6,"app-link-button",2),r(7,"Read more..."),n()()),o&2&&(a(4),h(p.experiences))},dependencies:[Y,S,y],encapsulation:2});let t=e;return t})();function me(t,e){if(t&1&&(i(0,"li",2),r(1),n()),t&2){let m=e.$implicit;a(1),u(" ",m," ")}}var ee=(()=>{let e=class e{constructor(){this.mainService=v(b),this.skills=[]}ngOnInit(){this.mainService.getSkills().subscribe(l=>this.skills=l)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-skills"]],standalone:!0,features:[c],decls:6,vars:0,consts:[["id","skills"],[1,"mt-10","flex","flex-wrap","justify-center","gap-3"],[1,"select-none","rounded-md","border","border-neutral-600","px-2","py-1","text-base","font-semibold","text-neutral-400","transition-all","hover:scale-105","hover:text-cyan-500"],["class","select-none rounded-md border border-neutral-600 px-2 py-1 text-base font-semibold text-neutral-400 transition-all hover:scale-105 hover:text-cyan-500"]],template:function(o,p){o&1&&(i(0,"section",0)(1,"app-title"),r(2,"Skills"),n(),i(3,"ul",1),x(4,me,2,1,"li",3,C),n()()),o&2&&(a(4),h(p.skills))},dependencies:[S],encapsulation:2});let t=e;return t})();function de(t,e){if(t&1&&(i(0,"div",5),r(1),n()),t&2){let m=e.$implicit;a(1),u(" #",m," ")}}var te=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-post"]],inputs:{post:"post"},standalone:!0,features:[c],decls:12,vars:6,consts:[["target","_blank","rel","noopener noreferrer",1,"flex","h-fit","flex-col","rounded-lg","px-4","py-3","transition-all","hover:scale-[102%]","hover:bg-neutral-500/10",3,"href"],[1,"text-sm","font-semibold","text-neutral-400/80"],[1,"mb-1","line-clamp-2","text-xl","font-semibold","md:text-2xl"],[1,"mt-1.5","line-clamp-2","text-sm","font-medium","text-neutral-500","md:text-base","dark:text-neutral-400/80"],[1,"mt-1.5","flex","flex-row","items-center","gap-2"],[1,"text-sm","font-semibold","text-neutral-600","md:text-base","dark:text-neutral-300"],["class","text-sm font-semibold text-neutral-600 md:text-base dark:text-neutral-300"]],template:function(o,p){o&1&&(i(0,"a",0)(1,"header")(2,"span",1),r(3),I(4,"date"),n(),i(5,"h3",2),r(6),n()(),i(7,"p",3),r(8),n(),i(9,"footer",4),x(10,de,2,1,"div",6,C),n()()),o&2&&(f("href",p.post.url,M),a(3),O(j(4,4,p.post.date)),a(3),u(" ",p.post.title," "),a(2),u(" ",p.post.description," "),a(2),h(p.post.tags))},dependencies:[U],encapsulation:2});let t=e;return t})();var ue=(t,e)=>e.id;function fe(t,e){if(t&1&&(i(0,"li",7),d(1,"app-post",8),n()),t&2){let m=e.$implicit;a(1),f("post",m)}}var ne=(()=>{let e=class e{constructor(){this.mainService=v(b),this.posts=[]}ngOnInit(){this.mainService.getPosts().subscribe(l=>this.posts=l)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-blog"]],standalone:!0,features:[c],decls:50,vars:0,consts:[["id","blog"],[1,"flex","items-baseline","gap-2"],[1,"text-xs","font-semibold","text-neutral-400"],[1,"mt-10","flex","flex-col","justify-center","gap-3","md:flex-row","md:flex-wrap"],[1,"mt-8"],[1,"text-2xl","font-bold"],["href","https://blog.ron.com","btnStyle","base",1,"mt-8","flex","underline"],[1,"flex-[1_0_40%]"],[3,"post"],["class","flex-[1_0_40%]"]],template:function(o,p){o&1&&(i(0,"section",0)(1,"hgroup",1)(2,"app-title"),r(3,"Blog"),n(),i(4,"span",2),r(5,"(English)"),n()(),i(6,"ul",3),x(7,fe,2,1,"li",9,ue),n(),i(9,"article",4)(10,"h2",5),r(11,"The Full Stack Developer's Guide to Building Robust Web Applications"),n(),i(12,"p")(13,"strong"),r(14,"Introduction:"),n(),r(15," As a full stack developer, I\u2019ve had the privilege of working with various tools, frameworks, and technologies. From mastering ASP.NET Core MVC to creating e-commerce applications with Angular and Node.js, my journey has been both challenging and rewarding. In this post, I\u2019ll walk you through some of the key projects and skills I\u2019ve developed over the years, focusing on ASP.NET Core MVC, PayPal integration, and full-stack development with Angular and Node.js."),n(),i(16,"h3")(17,"strong"),r(18,"Mastering ASP.NET Core MVC: A Developer's Journey"),n()(),i(19,"p"),r(20,"ASP.NET Core MVC is one of the most powerful frameworks for building scalable and maintainable web applications. It follows the Model-View-Controller pattern, which separates concerns in your application and makes it easier to manage large codebases."),n(),i(21,"p")(22,"strong"),r(23,"Key Features:"),n()(),i(24,"ul")(25,"li")(26,"strong"),r(27,"CRUD operations with Entity Framework:"),n(),r(28," I\u2019ve implemented advanced functionalities like pagination, search, and sorting to make data handling more efficient."),n(),i(29,"li")(30,"strong"),r(31,"User Authentication with Identity:"),n(),r(32," Implemented role-based authorization to give users different levels of access."),n()(),i(33,"h3")(34,"strong"),r(35,"Creating Robust Web Applications with Angular and Node.js"),n()(),i(36,"p"),r(37,"With Angular, I developed responsive and dynamic user interfaces using TypeScript. On the back-end, I used Node.js to create RESTful APIs, ensuring a seamless integration."),n(),i(38,"h3")(39,"strong"),r(40,"Enhancing User Engagement with Quadient\xAE Inspire Designer"),n()(),i(41,"p"),r(42,"Utilized Quadient\xAE Inspire Designer to create personalized customer communications, increasing customer engagement by 15%."),n(),i(43,"h3")(44,"strong"),r(45,"Conclusion:"),n()(),i(46,"p"),r(47,"My experience with ASP.NET Core, Angular, Node.js, and others has taught me that building robust web applications requires a solid understanding of both front-end and back-end development."),n()(),i(48,"app-link-button",6),r(49," Coming Soon.. "),n()()),o&2&&(a(7),h(p.posts))},dependencies:[te,S,y],encapsulation:2});let t=e;return t})();var Et=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=s({type:e,selectors:[["app-home"]],standalone:!0,features:[c],decls:7,vars:0,consts:[[1,"flex","justify-center","py-16","print:py-0","md:py-28"],[1,"mx-4","flex","w-full","max-w-3xl","flex-col","gap-20","md:mx-8"],["id","header"],["id","experience"],["id","projects"],["id","skills"],["id","blog"]],template:function(o,p){o&1&&(i(0,"div",0)(1,"main",1),d(2,"app-header",2)(3,"app-experience",3)(4,"app-projects",4)(5,"app-skills",5)(6,"app-blog",6),n()())},dependencies:[J,X,Z,ee,ne],encapsulation:2});let t=e;return t})();export{Et as HomeComponent};
