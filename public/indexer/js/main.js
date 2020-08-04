"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}
/**
 * @license
 * 
 * <eyy-indexer-main> [https://github.com/sixem/eyy-indexer]
 * 
 * Licensed under GPL-3.0
 * @author   emy [admin@eyy.co]
 */
!function(){var s={store:{preview:{},defaults:{},selection:{},selected:null,refresh:!1},debounce:function(t){var n;return function(e){n&&clearTimeout(n),n=setTimeout(t,100,e)}},checkNested:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0;o<n.length;o++){if(!e||!Object.prototype.hasOwnProperty.call(e,n[o]))return!1;e=e[n[o]]}return!0},getReadableSize:function(e){var t=0<arguments.length&&void 0!==e?e:0;if(0===t)return"0.00"+config.format.sizes[0];for(var n=0;n++,1024<(t/=1024););return Math.max(t,.1).toFixed(n<2?0:2)+config.format.sizes[n]},capitalize:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},fallbackCopyTextToClipboard:function(e){var t=document.createElement("textarea");t.value=e,t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy");config.debug&&console.log("fallback","copying text command was "+(n?"successful":"unsuccessful"))}catch(e){config.debug&&console.error("fallback","unable to copy",e)}document.body.removeChild(t)},copyTextToClipboard:function(e){navigator.clipboard?navigator.clipboard.writeText(e).then(function(){config.debug&&console.log("async","copying to clipboard was successful.")},function(e){config.debug&&console.error("async","could not copy text: ",e)}):s.fallbackCopyTextToClipboard(e)},getCellValue:function(e,t){var n=$(e).children("td").eq(t).data("raw");return void 0!==n?n:$(e).children("td").eq(t).text()},comparer:function(o){return function(e,t){var n=s.getCellValue(e,o),r=s.getCellValue(t,o);return $.isNumeric(n)&&$.isNumeric(r)?n-r:n.localeCompare(r)}},client:{get:function(){var n,t=["gallery","sort","style"],r={gallery:{reverse_options:config.gallery.reverse_options,list_alignment:config.gallery.list_alignment,fit_content:config.gallery.fit_content,autoplay:!0},style:{compact:config.style.compact,theme:!1}};try{n=JSON.parse(Cookies.get("ei-client")),t.forEach(function(e){Object.prototype.hasOwnProperty.call(n,e)||(n[e]=Object.prototype.hasOwnProperty.call(r,e)?r[e]:{})});var o=!1;Object.keys(r).forEach(function(t){Object.keys(r[t]).forEach(function(e){Object.prototype.hasOwnProperty.call(n[t],e)||(n[t][e]=r[t][e],o=!0)})}),o&&s.client.set(n)}catch(e){n={},config.style.themes.set&&(r.style.theme=config.style.themes.set),t.forEach(function(e){return n[e]={}}),s.client.set(Object.assign(n,r))}return n},set:function(e,t){var n=1<arguments.length&&void 0!==t?t:{},n=Object.assign({sameSite:"lax",expires:365},n);Cookies.set("ei-client",JSON.stringify(e),n)}},settings:{available:function(){return!!(s.checkNested(config,"style","themes","pool")&&0<config.style.themes.pool.length||!0===config.gallery.enabled)},create:{option:function(e,t,n,r){var o=2<arguments.length&&void 0!==n?n:{},i=3<arguments.length&&void 0!==r?r:null;Object.prototype.hasOwnProperty.call(o,"class")&&(o.class="option "+o.class);var a=Object.assign({class:"option"},o),l={class:"option-text",text:t};return i&&(l.title=i),e.wrap($("<div/>")).parent().wrap($("<div/>",a)).parent().prepend($("<div/>",l))},section:function(e,t){var n=1<arguments.length&&void 0!==t?t:null;return $("<div/>",{class:"section","data-key":e}).append($("<div/>",{class:"header",text:n||s.capitalize(e)}))},select:function(e,t,n){var r=2<arguments.length&&void 0!==n?n:null,o=$("<select/>",1<arguments.length&&void 0!==t?t:{});return o.append(e.map(function(e,t){e.text=s.capitalize(e.text);var n=$("<option/>",e);return null!==r&&!0===r(n,t,o)&&(n[0].selected=!0,o[0].selectedIndex=t),n})),o},check:function(e,t){var n=0<arguments.length&&void 0!==e?e:{},r=1<arguments.length&&void 0!==t?t:null,o=null!==r&&r();o&&(n.checked="");var i=$("<input/>",Object.assign(n,{type:"checkbox"}));return i[0].checked=o,i}},close:function(){$(".focus-overlay, .settings-container").remove()},update:{style:{theme:function(e){s.theme.set(!1===e?null:e,!1)},compact:function(e){$("body")[e?"addClass":"removeClass"]("compact")}},gallery:{list_alignment:function(t){var e,n,r;s.gallery.instance&&((e=[".gallery-container div.content-container .media .loader",".gallery-container div.content-container .list",".gallery-container div.content-container .list > div.drag"]).forEach(function(e){return 0===t?$(e).removeClass("reversed"):$(e).addClass("reversed")}),n=$(e[1]).detach(),r=".gallery-container div.content-container .media",1===t?n.insertBefore(r):n.insertAfter(r),s.gallery.instance.store.list.reverse=0!==t)},reverse_options:function(e){var t;s.gallery.instance&&(s.gallery.instance.store.reverse_options=e,t=$(".gallery-container div.content-container .media .wrapper .cover .reverse"),console.log(t),0<t.length&&t.remove())},autoplay:function(e){s.gallery.instance&&(s.gallery.instance.store.autoplay=e)},fit_content:function(e){var t;s.gallery.instance&&(s.gallery.instance.store.fit_content=e,(t=$(".gallery-container div.content-container .media .wrapper"))&&e?(t.addClass("fill"),s.store.refresh=!0,s.store.selected=null):t&&(t.removeClass("fill"),[".cover",".cover img","video"].forEach(function(e){return $(e).css({height:"",width:""})})))}}},options:{gather:function(e){var o={};return e.find(["select",'input[type="checkbox"]'].join(",")).each(function(e,t){var n,r;(t=$(t))[0].hasAttribute("name")&&(n=t.attr("name"),r=t[0].hasAttribute("data-key")?t.attr("data-key"):t.closest(".section").attr("data-key"),Object.prototype.hasOwnProperty.call(o,r)||(o[r]={}),t.is("select")?o[r][n]=t[0].selectedIndex:t.is('input[type="checkbox"]')&&(o[r][n]=t[0].checked))}),o},set:function(i,e){var a=(a=1<arguments.length&&void 0!==e?e:null)||s.client.get();return Object.keys(i).forEach(function(r){var o="main"===r;o||Object.prototype.hasOwnProperty.call(a,r)||(a[r]={}),Object.keys(i[r]).forEach(function(e){var t=null;switch(e){case"theme":i[r][e]<=config.style.themes.pool.length-1&&(t="default"!==config.style.themes.pool[i[r][e]]&&config.style.themes.pool[i[r][e]]);break;default:t=i[r][e]}var n=o?a[e]!==t:a[r][e]!==t;i[r][e]={value:t,changed:n},o?a[e]=t:a[r][e]=t,n&&(o&&Object.prototype.hasOwnProperty.call(s.settings.update,e)?s.settings.update[e](t):s.checkNested(s.settings.update,r,e)&&s.settings.update[r][e](t))})}),config.debug&&console.log("set settings",i),s.client.set(a),i}},apply:function(e,t){var n=(n=1<arguments.length&&void 0!==t?t:null)||s.client.get();s.settings.options.set(s.settings.options.gather(e),n),s.settings.close()},show:function(){var e,l,t,n;0<$(".settings-container").length||(0===$(".focus-overlay").length&&$("<div/>",{class:"focus-overlay"}).appendTo($("body")).on("click",function(){return s.settings.close()}),e=$("<div/>",{class:"settings-container"}),l=s.client.get(),t=[function(e,t){var n=0<arguments.length&&void 0!==e?e:s.settings.create.section("main"),r=1<arguments.length&&void 0!==t?t:0;return s.checkNested(config,"style","themes","pool")&&0<config.style.themes.pool.length&&(n.append(s.settings.create.option(s.settings.create.select(config.style.themes.pool.map(function(e){return{value:e,text:e}}),{name:"theme","data-key":"style"},function(e,t){return null===config.style.themes.set&&0===t||e[0].value==config.style.themes.set}),"Theme")),r++),s.checkNested(config,"style","compact")&&!config.mobile&&(n.append(s.settings.create.option(s.settings.create.check({name:"compact","data-key":"style"},function(){return s.checkNested(l,"style","compact")?l.style.compact:config.style.compact}),"Compact Style",{class:"interactable"},"Set the page to use a more compact style.")),r++),{settings:r,section:n}}()],config.gallery.enabled&&t.push(function(e,t){var i=0<arguments.length&&void 0!==e?e:s.settings.create.section("gallery"),a=1<arguments.length&&void 0!==t?t:0;config.mobile||(i.append(s.settings.create.option(s.settings.create.select(["right","left"].map(function(e){return{value:"align-"+e,text:e}}),{name:"list_alignment"},function(e,t){return t===l.gallery.list_alignment}),"List Alignment")),a++);var n=[];return n.push(["Reverse Search","reverse_options","Toggle the visibility of reverse search options on images."],["Autoplay Videos","autoplay","Toggle the autoplaying of videos."],["Fit Content","fit_content","Force images and videos to fill the screen."]),n.forEach(function(e){var t=_slicedToArray(e,3),n=t[0],r=t[1],o=t[2];i.append(s.settings.create.option(s.settings.create.check({name:r},function(){return s.checkNested(l,"gallery",r)?l.gallery[r]:config.gallery[r]}),n,{class:"interactable"},o)),a++}),{settings:a,section:i}}()),e.append($("<div/>",{class:"wrapper"}).append(t.map(function(e){return 0<e.settings?e.section:null}).filter(function(e){return null!==e}))),n=$("<div/>",{class:"bottom"}).appendTo(e),$("<div/>",{class:"apply ns",text:"Apply"}).appendTo(n).on("click",function(){return s.settings.apply(e,l)}),$("<div/>",{class:"cancel ns",text:"Cancel"}).appendTo(n).on("click",function(){return s.settings.close()}),$("body").append(e),e.find("div.section > .option.interactable").on("mouseup",function(e){var t;window.getSelection().toString()||0<(t=$(e.currentTarget).find('input[type="checkbox"]')).length&&!$(e.target).is("input")&&(t[0].checked=!t[0].checked)}))}},menu:{create:function(){var n=$("<div/>",{class:"menu"}).appendTo($("body")),e=[{text:"[Show] Filter",id:"filter"},{text:"[Copy] WGET",id:"copy"}];return!0===config.gallery.enabled&&0<$("a.preview").length&&e.unshift({text:"[Open] Gallery",id:"gallery"}),s.settings.available()&&e.unshift({text:"[Open] Settings",id:"settings",class:"settings"}),e.forEach(function(e){var t=$("<div/>",{text:e.text,class:"ns"+(Object.prototype.hasOwnProperty.call(e,"class")?" "+e.class:"")}).appendTo(n);Object.prototype.hasOwnProperty.call(e,"id")&&t.attr("id",e.id)}),n},toggle:function(e){var t=0<arguments.length&&void 0!==e?e:null,n=$("body > div.menu");return n.css("display","boolean"==typeof t?t?"inline-block":"none":n.is(":hidden")?"inline-block":"none"),$("body > .top-bar > div.extend").html(n.is(":hidden")?"&#x25BE;":"&#x25B4;"),n.is(":hidden")}},theme:{set:function(e,t){var n=0<arguments.length&&void 0!==e?e:null,r=!(1<arguments.length&&void 0!==t)||t,o=$('head > link[rel="stylesheet"]').filter(function(e,t){return t.hasAttribute("href")&&t.getAttribute("href").match(new RegExp("/(themes)/","i"))});if(null===(config.style.themes.set=n)||!n)return o.each(function(e,t){return t.remove()}),!1;r&&s.client.set(s.client.get().style.theme=n),$("head").append($("<link/>",{rel:"stylesheet",type:"text/css",href:"".concat(config.style.themes.path,"/").concat(n,".css")})),o.each(function(e,t){return t.remove()})}},filter:{apply:function(e){var o=0<arguments.length&&void 0!==e?e:null;s.store.refresh=!0;var i={reset:""===(o=o||""),shown:{directories:0,files:0},hidden:{directories:0,files:0},size:0},a=null;s.gallery.instance&&(s.gallery.instance.data.selected.index=0),$("body > table tr.file, body > table tr.directory").each(function(e,t){if(t=$(t),!0===i.reset)return t.css("display",""),!0;var n,r=t.hasClass("file");try{a={valid:!0,data:t.find("td:eq(0)").attr("data-raw").match(new RegExp(o,"i"))}}catch(e){a={valid:!1,reason:e}}t.css("display",a.valid&&a.data?"":"none"),a.valid&&a.data&&r&&(n=t.find("td:eq(2)").attr("data-raw"),isNaN(n)||(i.size=i.size+parseInt(n))),a.valid&&a.data?r?i.shown.files++:i.shown.directories++:r?i.hidden.files++:i.hidden.directories++});var t={container:$("body > div.top-bar")};["size","files","directories"].forEach(function(e){return t[e]=t.container.find('[data-count="'.concat(e,'"]'))}),Object.prototype.hasOwnProperty.call(s.store.defaults,"top_values")||(s.store.defaults.top_values={size:t.size.text(),files:t.files.text(),directories:t.directories.text()}),t.size.text(i.reset?s.store.defaults.top_values.size:s.getReadableSize(i.size)),t.files.text(i.reset?s.store.defaults.top_values.files:"".concat(i.shown.files," file").concat(1===i.shown.files?"":"s")),t.directories.text(i.reset?s.store.defaults.top_values.directories:"".concat(i.shown.directories," ").concat(1===i.shown.directories?"directory":"directories"));var n,r=$("body > div.menu > #gallery"),l=$("body > table tr.file:visible a.preview").length,c=$(".filter-container div.status");0<c.length&&(i.reset?c.text("").removeClass("se"):a&&!1===a.valid?c.text(a.reason).addClass("se"):(n=i.shown.files+i.shown.directories,c.text("".concat(n," result").concat(1===n?"":"s",".")).removeClass("se"))),!i.reset&&0===l&&0<r.length?"none"!==r.css("display")&&r.css("display","none"):(0<l||i.reset)&&0<r.length&&"none"===r.css("display")&&r.css("display","block")},toggle:function(){var e=$(".filter-container"),t=e.find('input[type="text"]');e.is(":visible")?e.hide():(t.val(""),s.filter.apply(null),e.show()),t.focus()}},dates:{format:function(e,t){function n(e,t){return s[e]?s[e]():t}function r(e,t){for(e=String(e);e.length<t;)e="0"+e;return e}var o,i,a,l=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],c=/\\?(.?)/gi,s={d:function(){return r(s.j(),2)},D:function(){return s.l().slice(0,3)},j:function(){return o.getDate()},l:function(){return l[s.w()]+"day"},N:function(){return s.w()||7},S:function(){var e=s.j(),t=e%10;return t<=3&&1===parseInt(e%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return o.getDay()},z:function(){var e=new Date(s.Y(),s.n()-1,s.j()),t=new Date(s.Y(),0,1);return Math.round((e-t)/864e5)},W:function(){var e=new Date(s.Y(),s.n()-1,s.j()-s.N()+3),t=new Date(e.getFullYear(),0,4);return r(1+Math.round((e-t)/864e5/7),2)},F:function(){return l[6+s.n()]},m:function(){return r(s.n(),2)},M:function(){return s.F().slice(0,3)},n:function(){return o.getMonth()+1},t:function(){return new Date(s.Y(),s.n(),0).getDate()},L:function(){var e=s.Y();return e%4==0&e%100!=0|e%400==0},o:function(){var e=s.n(),t=s.W();return s.Y()+(12===e&&t<9?1:1===e&&9<t?-1:0)},Y:function(){return o.getFullYear()},y:function(){return s.Y().toString().slice(-2)},a:function(){return 11<o.getHours()?"pm":"am"},A:function(){return s.a().toUpperCase()},B:function(){var e=3600*o.getUTCHours(),t=60*o.getUTCMinutes(),n=o.getUTCSeconds();return r(Math.floor((e+t+n+3600)/86.4)%1e3,3)},g:function(){return s.G()%12||12},G:function(){return o.getHours()},h:function(){return r(s.g(),2)},H:function(){return r(s.G(),2)},i:function(){return r(o.getMinutes(),2)},s:function(){return r(o.getSeconds(),2)},u:function(){return r(1e3*o.getMilliseconds(),6)},e:function(){throw new Error("Not supported (see source code of date() for timezone on how to add support)")},I:function(){return new Date(s.Y(),0)-Date.UTC(s.Y(),0)!=new Date(s.Y(),6)-Date.UTC(s.Y(),6)?1:0},O:function(){var e=o.getTimezoneOffset(),t=Math.abs(e);return(0<e?"-":"+")+r(100*Math.floor(t/60)+t%60,4)},P:function(){var e=s.O();return e.substr(0,3)+":"+e.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-o.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(c,n)},r:function(){return"D, d M Y H:i:s O".replace(c,n)},U:function(){return o/1e3|0}};return i=e,o=void 0===(a=t)?new Date:a instanceof Date?new Date(a):new Date(1e3*a),i.replace(c,n)},load:function(){var e=(new Date).getTimezoneOffset(),t=s.client.get(),n=t.timezone_offset!=e;n&&(t.timezone_offset=e,s.client.set(t)),(e={minutes:0<e?-Math.abs(e):Math.abs(e)}).hours=e.minutes/60,e.seconds=60*e.minutes,function(i,e){var a=!(1<arguments.length&&void 0!==e)||e;$("tbody tr.directory > td:nth-child(2), tbody tr.file > td[data-raw]:nth-child(2)").each(function(e,t){t=$(t);var r=parseInt(t.attr("data-raw")),n=function(e){if(0===e)return"Now";if(e<0)return!1;for(var t={year:31556926,month:2629743,week:604800,day:86e3,hour:3600,minute:60,second:1},n=Object.keys(t),r=n.length-1,o=!1,i=0;i<n.length;i++){var a=n[i];if(!(e<=t[a])){var l=i+1<=r?n[i+1]:null,c=Math.floor(e/t[a]),s=l?Math.floor((e-c*t[a])/t[l]):0,o="".concat(c," ").concat(a).concat(1==c?"":"s")+(0<s?" and ".concat(s," ").concat(l).concat(1==s?"":"s"):"")+" ago";break}}return o}(config.timestamp-r),o=!0===a?$("<span/>"):t.find("> span");!0===a&&(config.format.date.forEach(function(e,t){var n;t<=1&&(n=$("<span/>",{text:s.dates.format(e,r)}),1<config.format.date.length&&n.attr("data-view",0===t?"desktop":"mobile"),o.append(n))}),t.html(o)),n&&o.attr("title","".concat(n," (UTC").concat((0<i.hours?"+":"")+i.hours,")"))}),$('.top-bar > .directory-info div[data-count="files"], \t\t\t\t\t\t.top-bar > .directory-info div[data-count="directories"]').each(function(e,t){(t=$(t))[0].hasAttribute("data-raw")&&$(t).attr("title","Newest: "+s.dates.format(config.format.date[0],parseInt(t.attr("data-raw"))))})}(e,n)}},sort:{load:function(){if(Object.prototype.hasOwnProperty.call(config,"sorting")&&config.sorting.enabled&&(0===config.sorting.types||1===config.sorting.types)){var e,t="asc"===config.sorting.order,n=null;switch(config.sorting.sort_by){case"name":n=0;break;case"modified":n=1;break;case"size":n=2;break;case"type":n=3;break;default:n=null}null===n||0<(e=$("table th span[sortable]").eq(n).parents("th")).length&&(e[0].asc=t,e.find("> span.sort-indicator").addClass(t?"down":"up").fadeIn(350))}}},gallery:{instance:null,load:function(e){var t=0<arguments.length&&void 0!==e?e:0;if(!config.gallery.enabled)return!1;config.debug&&console.log("gallery.load =>",t);var n=$(".preview-container > video");if(s.gallery.instance&&!1!==s.gallery.instance){s.gallery.instance.store.continue.video=0<n.length?{src:n.find("source").attr("src"),time:n[0].currentTime}:null,s.store.preview.video=null;var r=s.store.refresh?s.getTableItems():null;return null!==r&&0===r.length?!1:(s.gallery.instance.show(!0,null===t?s.gallery.instance.data.selected.index:t,r),void(s.store.refresh&&(s.store.refresh=!1)))}var o=s.client.get(),i={},a=JSON.parse(Object.prototype.hasOwnProperty.call(o.gallery,"list_state")?o.gallery.list_state:1);i.start=null===t?0:t,i.filter=!1,i.console=config.debug,i.fade=config.gallery.fade,i.mobile=config.mobile,i.reverse_options=s.checkNested(o,"gallery","reverse_options")?o.gallery.reverse_options:config.gallery.autoplay,i.autoplay=s.checkNested(o,"gallery","autoplay")?o.gallery.autoplay:config.gallery.autoplay,i.fit_content=s.checkNested(o,"gallery","fit_content")?o.gallery.fit_content:config.gallery.fit_content,i.scroll_interval=config.gallery.scroll_interval,i.list={show:null==a||!!a,reverse:!!s.checkNested(o,"gallery","list_alignment")&&0!==o.gallery.list_alignment},i.continue={video:0<n.length?{src:n.find("source").attr("src"),time:n[0].currentTime}:null},s.gallery.instance=new $.fn.gallery(s.getTableItems(),i),!1!==s.gallery.instance&&$(s.gallery.instance).on("unbound",function(){return s.bind()})}},overlay:{hide:function(e){var t=0<arguments.length&&void 0!==e?e:function(){},n=0;[{e:$(".filter-container"),func:s.filter.toggle},{e:$("body > div.menu"),func:s.menu.toggle}].forEach(function(e){0<e.e.length&&e.e.is(":visible")&&(e.func(),n++)}),t(0<n)}},getTableItems:function(){var a=[];return $("tr.file td:first-child a.preview").each(function(e,t){var n=(t=$(t)).closest("tr");if(n.is(":hidden"))return!0;var r=t.attr("href"),o=t.closest("td").data("raw"),i=n.find("td").eq(2).text();void 0!==r&&void 0!==o&&a.push({name:o,url:r,size:i})}),a},events:{scroll:function(){var e=$("body > div.path"),t=$("div.top-bar > div.directory-info > div.quick-path");$(window).scrollTop()<e.offset().top+e.outerHeight()?t.fadeOut(150):(0===t.length&&(t=$("<div/>",{class:"quick-path","data-view":"desktop"}).html($("body > div.path").html()),$("div.top-bar > div.directory-info").append(t)),t.fadeIn(150).css("display","inline-block"))}},bind:function(){$(document).off("keydown").on("keydown",function(t){var e;t.shiftKey&&70===t.keyCode?(t.preventDefault(),s.filter.toggle()):27===t.keyCode?s.overlay.hide(function(e){!0===e&&t.preventDefault()}):71===t.keyCode&&!0===config.gallery.enabled&&(!1!==(e=$(".filter-container")).is(":visible")&&e.find('input[type="text"]').is(":focus")||(s.gallery.load(null),s.menu.toggle(!1)))}),$(window).on("scroll",s.debounce(function(){s.events.scroll()}))}};$("body > .top-bar > div.extend").on("click",function(e){s.menu.toggle(e.currentTarget)}),$(".filter-container > div.close > span").on("click",function(){s.filter.toggle()}),$('.filter-container > div input[type="text"]').on("input",function(e){var t=$(e.currentTarget);s.filter.apply(t.val())}),$(document).on("click","body > div.menu #filter",function(){s.filter.toggle(),s.menu.toggle()}),$(document).on("click","body > div.menu #settings",function(){s.settings.show(),s.menu.toggle(!1)}),!0===config.gallery.enabled&&($(document).on("click","body > div.menu #gallery",function(){s.gallery.load(null),s.menu.toggle(!1)}),$("tbody tr.file a.preview").on("click",function(e){var t;e.preventDefault(),$(e.target).is("a")&&(t=$(e.target).closest("table").find("tr.file:visible").filter(function(e,t){return 0<$(t).find("a.preview").length}).index($(e.target).closest("tr.file")),s.gallery.load(-1!==t?t:0))})),$(document).on("click","body > div.menu #copy",function(){var e,r;s.copyTextToClipboard((e=window.location.href,r=[],$("tr.file td:first-child a:visible").each(function(e,t){var n=$(t).text().split(".").pop().toLowerCase().trim();r.includes(n)||r.push(n)}),'wget -r -np -nH -nd -e robots=off --accept "'.concat(r.join(","),'" "').concat(e,'"'))),s.menu.toggle(!1)}),$("table th span[sortable]").on("click",function(e){var t=$(e.currentTarget).parents("th"),n=t.index(),r=$(e.currentTarget).is("th")?e.currentTarget:t[0],o=$(r).parents("table").eq(0),i={directories:o.find("tbody tr.directory").toArray(),files:o.find("tbody tr.file").toArray()},a=Object.prototype.hasOwnProperty.call(config.sorting,"sort_by")&&(2===n||3===n);0!==config.sorting.types&&2!==config.sorting.types||a||i.directories.sort(s.comparer($(r).index())),0!==config.sorting.types&&1!==config.sorting.types||i.files.sort(s.comparer($(r).index())),r.asc=!r.asc,$("body > table span.sort-indicator").removeClass("up down"),t.find("> span.sort-indicator").addClass(r.asc?"down":"up").show();var l=s.client.get();l.sort.ascending=r.asc?1:0,l.sort.row=n,s.client.set(l),r.asc||(0!==config.sorting.types&&2!==config.sorting.types||a||(i.directories=i.directories.reverse()),0!==config.sorting.types&&1!==config.sorting.types||(i.files=i.files.reverse())),Object.keys(i).forEach(function(e){return i[e].forEach(function(e){return o.append(e)})}),s.store.refresh=!0,s.store.selected=null,$("tbody tr.last").removeClass("last")}),window.addEventListener("resize",s.debounce(function(){config.debug&&console.log("resized"),config.mobile=Modernizr.mq("(max-width: 640px)"),s.gallery.instance&&(s.gallery.instance.store.mobile=config.mobile,s.gallery.instance.update.listWidth())})),$(document).ready(function(){s.bind(),s.dates.load(),$('.filter-container > input[type="text"]').val(""),config.mobile=Modernizr.mq("(max-width: 640px)"),s.menu.create().css({top:$("body > div.top-bar").innerHeight()+"px",visibility:"unset",display:"none"}),!1===config.mobile&&!0===config.preview.enabled&&$(".preview").each(function(e,t){window.hoverPreview(t,{delay:config.preview.hover_delay,cursor:config.preview.cursor_indicator})}),s.events.scroll()}),s.client.get(),s.sort.load(),config.debug&&console.log("config",config)}();