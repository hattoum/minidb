/**
*Dragula.js because lazy
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.dragula=e()}}(function(){return function e(n,t,r){function o(a,u){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var f=t[a]={exports:{}};n[a][0].call(f.exports,function(e){var t=n[a][1][e];return o(t?t:e)},f,f.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,n){(function(t){"use strict";function r(e,n){function t(e){var n=Array.isArray(e)?e:[e];Z.containers=Z.containers.concat(n),console.warn&&console.warn("drake.addContainer is deprecated. please access drake.containers directly, instead")}function r(e){function n(e){return-1===t.indexOf(e)}var t=Array.isArray(e)?e:[e];Z.containers=Z.containers.filter(n),console.warn&&console.warn("drake.removeContainer is deprecated. please access drake.containers directly, instead")}function a(e){return-1!==Z.containers.indexOf(e)||W.isContainer(e)}function v(e){var n=e?"remove":"add";o(J,n,"mousedown",b),o(J,n,"mouseup",O)}function h(){v(!0),O({})}function b(e){var n=e.target,t=0!==e.which&&1!==e.which||e.metaKey||e.ctrlKey;if(!t&&E(n)===!0){var r=i(q);U=p("pageX",e)-r.left,_=p("pageY",e)-r.top,F=p("clientX",e),I=p("clientY",e),"number"==typeof W.delay?V=setTimeout(w,W.delay):w(),e.preventDefault()}}function w(){d(H||q,"gu-transit"),X(),P()}function E(e){var n=e;if(!(Z.dragging&&R||a(e))){for(;e.parentElement&&a(e.parentElement)===!1;){if(W.invalid(e,n))return;if(e=e.parentElement,!e)return}var t=e.parentElement;if(t&&!W.invalid(e,n)){var r=W.moves(e,t,n);if(r)return C(),W.copy&&(H=e.cloneNode(!0),Z.emit("cloned",H,e)),j=t,q=e,K=z=f(e),Z.dragging=!0,Z.emit("drag",q,j),!0}}}function x(e){return"A"===e.tagName||"BUTTON"===e.tagName}function C(){if(Z.dragging){var e=H||q;S(e,e.parentElement)}}function O(e){if(Z.dragging){var n=H||q,t=p("clientX",e),r=p("clientY",e),o=u(R,t,r),i=k(o,t,r);!i||W.copy!==!1&&i===j?W.removeOnSpill?N():T():S(n,i)}}function S(e,n){A(n)?Z.emit("cancel",e,j):Z.emit("drop",e,n,j),B()}function N(){if(Z.dragging){var e=H||q,n=e.parentElement;n&&n.removeChild(e),Z.emit(W.copy?"cancel":"remove",e,n),B()}}function T(e){if(Z.dragging){var n=arguments.length>0?e:W.revertOnSpill,t=H||q,r=t.parentElement;r===j&&W.copy&&r.removeChild(H);var o=A(r);o===!1&&W.copy===!1&&n&&j.insertBefore(t,K),o||n?Z.emit("cancel",t,j):Z.emit("drop",t,r,j),B()}}function B(){var e=H||q;Y(),e&&s(e,"gu-transit"),V&&clearTimeout(V),Z.dragging=!1,Z.emit("dragend",e),Z.emit("out",e,Q,j),j=q=H=K=z=V=Q=null}function A(e,n){var t;return t=void 0!==n?n:R?z:f(q||H),e===j&&t===K}function k(e,n,t){function r(){var r=a(o);if(r===!1)return!1;var i=D(o,e),u=L(o,i,n,t),c=A(o,u);return c?!0:W.accepts(q,o,j,u)}for(var o=e;o&&!r();)o=o.parentElement;return o}function P(e){function n(e){Z.emit(e,a,Q,j)}function t(){d&&n("over")}function r(){Q&&n("out")}if(R){e&&(F=p("clientX",e),I=p("clientY",e));var o=F-U,i=I-_;R.style.left=o+"px",R.style.top=i+"px";var a=H||q,c=u(R,F,I),l=k(c,F,I),d=null!==l&&l!==Q;if((d||null===l)&&(r(),Q=l,t()),l===j&&W.copy)return void(a.parentElement&&a.parentElement.removeChild(a));var s,v=D(l,c);if(null!==v)s=L(l,v,F,I);else{if(W.revertOnSpill!==!0||W.copy)return void(!W.copy&&W.removeOnSpill!==!0||null===a.parentElement||a.parentElement.removeChild(a));s=K,l=j}(null===s||s!==a&&s!==f(a))&&(z=s,l.insertBefore(a,s),Z.emit("shadow",a,l))}}function X(){if(!R){var e=q.getBoundingClientRect();R=q.cloneNode(!0),R.style.width=m(e)+"px",R.style.height=g(e)+"px",s(R,"gu-transit"),d(R," gu-mirror"),G.appendChild(R),o(J,"add","mousemove",P),d(G,"gu-unselectable"),Z.emit("cloned",R,q)}}function Y(){R&&(s(G,"gu-unselectable"),o(J,"remove","mousemove",P),R.parentElement.removeChild(R),R=null)}function D(e,n){for(var t=n;t!==e&&t.parentElement!==e;)t=t.parentElement;return t===J?null:t}function L(e,n,t,r){function o(){var n,o,i,a=e.children.length;for(n=0;a>n;n++){if(o=e.children[n],i=o.getBoundingClientRect(),u&&i.left>t)return o;if(!u&&i.top>r)return o}return null}function i(){var e=n.getBoundingClientRect();return a(u?t>e.left+m(e)/2:r>e.top+g(e)/2)}function a(e){return e?f(n):n}var u="horizontal"===W.direction,c=n!==e?i():o();return c}var M=arguments.length;1===M&&Array.isArray(e)===!1&&(n=e,e=[]);var R,j,q,U,_,F,I,K,z,H,V,G=document.body,J=document.documentElement,Q=null,W=n||{};void 0===W.moves&&(W.moves=l),void 0===W.accepts&&(W.accepts=l),void 0===W.invalid&&(W.invalid=x),void 0===W.containers&&(W.containers=e||[]),void 0===W.isContainer&&(W.isContainer=c),void 0===W.copy&&(W.copy=!1),void 0===W.revertOnSpill&&(W.revertOnSpill=!1),void 0===W.removeOnSpill&&(W.removeOnSpill=!1),void 0===W.direction&&(W.direction="vertical"),void 0===W.delay&&(W.delay=!1),W.delay===!0&&(W.delay=300);var Z=y({containers:W.containers,addContainer:t,removeContainer:r,start:E,end:C,cancel:T,remove:N,destroy:h,dragging:!1});return v(),Z}function o(e,n,r,o){var i={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},a={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};t.navigator.msPointerEnabled&&h[n](e,a[r],o),h[n](e,i[r],o),h[n](e,r,o)}function i(e){var n=e.getBoundingClientRect();return{left:n.left+a("scrollLeft","pageXOffset"),top:n.top+a("scrollTop","pageYOffset")}}function a(e,n){if("undefined"!=typeof t[n])return t[n];var r=document.documentElement;if(r.clientHeight)return r[e];var o=document.body;return o[e]}function u(e,n,t){if(!n&&!t)return null;var r,o=e||{},i=o.className;return o.className+=" gu-hide",r=document.elementFromPoint(n,t),o.className=i,r}function c(){return!1}function l(){return!0}function f(e){function n(){var n=e;do n=n.nextSibling;while(n&&1!==n.nodeType);return n}return e.nextElementSibling||n()}function d(e,n){-1===e.className.indexOf(" "+n)&&(e.className+=" "+n)}function s(e,n){e.className=e.className.replace(new RegExp(" "+n,"g"),"")}function v(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}function p(e,n){var t=v(n),r={pageX:"clientX",pageY:"clientY"};return e in r&&!(e in t)&&r[e]in t&&(e=r[e]),t[e]}function m(e){return e.width||e.right-e.left}function g(e){return e.height||e.bottom-e.top}var y=e("contra/emitter"),h=e("crossvent");n.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"contra/emitter":4,crossvent:6}],2:[function(e,n){n.exports=function(e,n){return Array.prototype.slice.call(e,n)}},{}],3:[function(e,n){"use strict";var t=e("ticky");n.exports=function(e,n,r){e&&t(function(){e.apply(r||null,n||[])})}},{ticky:8}],4:[function(e,n){"use strict";var t=e("atoa"),r=e("./debounce");n.exports=function(e,n){var o=n||{},i={};return void 0===e&&(e={}),e.on=function(n,t){return i[n]?i[n].push(t):i[n]=[t],e},e.once=function(n,t){return t._once=!0,e.on(n,t),e},e.off=function(n,t){var r=arguments.length;if(1===r)delete i[n];else if(0===r)i={};else{var o=i[n];if(!o)return e;o.splice(o.indexOf(t),1)}return e},e.emit=function(){var n=t(arguments);return e.emitterSnapshot(n.shift()).apply(this,n)},e.emitterSnapshot=function(n){var a=(i[n]||[]).slice(0);return function(){var i=t(arguments),u=this||e;if("error"===n&&o["throws"]!==!1&&!a.length)throw 1===i.length?i[0]:i;return a.forEach(function(t){o.async?r(t,i,u):t.apply(u,i),t._once&&e.off(n,t)}),e}},e}},{"./debounce":3,atoa:2}],5:[function(e,n){(function(e){function t(){try{var e=new r("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(n){}return!1}var r=e.CustomEvent;n.exports=t()?r:"function"==typeof document.createEvent?function(e,n){var t=document.createEvent("CustomEvent");return n?t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):t.initCustomEvent(e,!1,!1,void 0),t}:function(e,n){var t=document.createEventObject();return t.type=e,n?(t.bubbles=Boolean(n.bubbles),t.cancelable=Boolean(n.cancelable),t.detail=n.detail):(t.bubbles=!1,t.cancelable=!1,t.detail=void 0),t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(e,n){(function(t){"use strict";function r(e,n,t,r){return e.addEventListener(n,t,r)}function o(e,n,t){return e.attachEvent("on"+n,l(e,n,t))}function i(e,n,t,r){return e.removeEventListener(n,t,r)}function a(e,n,t){return e.detachEvent("on"+n,f(e,n,t))}function u(e,n,t){function r(){var e;return p.createEvent?(e=p.createEvent("Event"),e.initEvent(n,!0,!0)):p.createEventObject&&(e=p.createEventObject()),e}function o(){return new s(n,{detail:t})}var i=-1===v.indexOf(n)?o():r();e.dispatchEvent?e.dispatchEvent(i):e.fireEvent("on"+n,i)}function c(e,n,r){return function(n){var o=n||t.event;o.target=o.target||o.srcElement,o.preventDefault=o.preventDefault||function(){o.returnValue=!1},o.stopPropagation=o.stopPropagation||function(){o.cancelBubble=!0},o.which=o.which||o.keyCode,r.call(e,o)}}function l(e,n,t){var r=f(e,n,t)||c(e,n,t);return y.push({wrapper:r,element:e,type:n,fn:t}),r}function f(e,n,t){var r=d(e,n,t);if(r){var o=y[r].wrapper;return y.splice(r,1),o}}function d(e,n,t){var r,o;for(r=0;r<y.length;r++)if(o=y[r],o.element===e&&o.type===n&&o.fn===t)return r}var s=e("custom-event"),v=e("./eventmap"),p=document,m=r,g=i,y=[];t.addEventListener||(m=o,g=a),n.exports={add:m,remove:g,fabricate:u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":7,"custom-event":5}],7:[function(e,n){(function(e){"use strict";var t=[],r="",o=/^on/;for(r in e)o.test(r)&&t.push(r.slice(2));n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n){var t,r="function"==typeof setImmediate;t=r?function(e){setImmediate(e)}:function(e){setTimeout(e,0)},n.exports=t},{}]},{},[1])(1)});




var socket = io.connect("http://localhost:1337");
var testConnection = setInterval(function(){
	try{
		socket.emit("hehe")
	}
	catch(err){
		console.log("error")
	}
	},100)
var ind = 0;
var listind = 0;
var dirName;
var shown = false;
var title = ["","Hello!","This is a title","Good Morning","Good Evening","So?","Hey there","Random Title","Smile","Listen...","It was not Luck"];
var randIndex = Math.floor(Math.random()*11);
$(document).ready(function() {
	$("title").text(title[randIndex]);
	$(".useless").children().css("display", "none")
	socket.emit("getConfig", "halp");
	socket.on("config", function(data){
		$(".entry").height(data.keyHeight)
		$("body").find(".container").find(".entry").find("p").css({"font-size": data.fontSize});
		$("body").find(".container").find(".entry").find("label").css({"font-size": data.fontSize})
		$("body").find(".container").find(".morediv").find("p").css({"font-size": data.fontSize})
	})
	$(".pname").on("focus",function(){
		socket.emit("getAllPatientsCreate","hehe");
	});
	socket.on("patientsArrayCreate", function(data){
		$(function(){
			$(".pname").autocomplete({source:data});
		})
	});
	$(".searchtxt").on("focus",function(){
		socket.emit("getAllPatientsQuery","hehe");
	});
	socket.on("patientsArrayQuery", function(data){
		$(function(){
			$(".searchtxt").autocomplete({source:data});
		})
	})
	$(".submitbtn").on("click", function(event){
		event.preventDefault();
		$("nav").velocity("scroll", { 
  			duration: 800,
  			delay: 500
		});

		var pname = $(".pname").val();
		var page = $(".page").val();
		var prelatedhistory = $(".prelatedhistory").val();
		var pcomplaint = $(".pcomplaint").val();
		var pge = $(".pge").val();
		var pdetails = $(".pdetails").val();
		var pecg = $(".pecg").val();
		var plab = $(".plab").val();
		var pother = $(".pother").val();
		var pimpression = $(".pimpression").val();
		var pplan = $(".pplan").val();
		var pmed = $(".pmed").val();
		var ptel = $(".ptel").val();
		var pdm = $(".pdm").val();
		var pht = $(".pht").val();
		var peofvm = $(".peofvm").val();
		var pecho = $(".pecho").val();
		var psmoking = $(".psmoking").val();
		var pch = $(".pch").val();
		var pgh = $(".pgh").val();
		var prelatedhistory = $(".prelatedhistory").val();
		var pentryname = $(".pentryname").val();
		socket.emit("clientNewEntry", 
			{
				"Name": pname,
				"Age": page,
				"Complaints": pcomplaint,
				"RelatedHistory": prelatedhistory,
				"Medication": pmed,
				"FamilyHistory": pch,
				"UnrelatedHistory": pgh,
				"Examination": pge,
				
				"ECG": pecg,
				"Echo": pecho,
				"Others": pother,
				"Lab": plab,
				
				"Impression": pimpression,
				"Plan": pplan,
				"EndOfVisitMedication":peofvm,
				
				"Telphone": ptel,
				"DM": pdm,
				"Hypertension": pht,
				"Smoking": psmoking,

				"EntryName": pentryname,
				"details": pdetails
			});
		});
	socket.on("done", function(data){
	$("input").val("");
	$("texarea").text("");
	$("<a class='done'>"+data+"</a>").appendTo(".add").css({position: "fixed", left: ($(window).width()*0.45)+"px", bottom: ($(window).height()*0.9)+"px"}).velocity("fadeIn",1100).velocity("fadeOut",2000);
	});
	$(".searchbtn").on("click", function(event){
		event.preventDefault();
		$(".dateItem").remove();
		dirName = $(".searchtxt").val();
		socket.emit("clientQuery", $(".searchtxt").val());
	});
	socket.on("history",function(data){
		data.forEach(function(entry){
			$(".historyContainer").append("<p class='echoHistory'>"+entry[0]+": "+entry[1]+"</p>")
		})
	})
	socket.on("serverQuery", function(data){
		$(".patientVisits").remove();
		data.forEach(function(entry){
			$("<div class='patientVisits'><span>"+entry+"</span></div>").appendTo(".call");
		})
	});
	socket.on("noResults", function(data){
		$(".searchtxt").val(data).velocity({color: "#f00"}, 600).velocity({color: "#000"}, 600);

	})					 
	$(".patientsNo").on("click",function(event){
		event.preventDefault();
		socket.emit("count", "hehe");
	});
	socket.on("countNo", function(data){
		if(ind === 0){
		$(".patients").text(data).velocity("slideDown");
		ind++;
		}
		else{
		$(".patients").text(data).velocity("slideUp");
		ind--;
		}
	})
	$(".patientsList").on("click", function(event){
		event.preventDefault();
		socket.emit("list", "hehe");
	})
	socket.on("listRep", function(data){
		
		if(listind === 0){
			data.forEach(function(entry){
			var finalStr = "";
			for(var i = 0; i< entry.length; i++){
				if(entry.charAt(i) != "."){
					finalStr= finalStr+entry.charAt(i);
				}
				else{ i = entry.length}
			}
			$("<p class='listItem'>"+finalStr+"</p>").appendTo(".fn2");
		});
			listind++;
		}
		else{
		$(".listItem").remove();
		listind--;
		}
	})
		$(".call").on("click",".patientVisits", function(){
			$(".dateItem").remove();
			$(".trash").remove()
			$(this).prepend("<div class= 'trash'><div class='trashIn'></div></div>")
			var clickedDate = $(this).text();
			socket.emit("visitQuery", {"dir":dirName, "date":clickedDate});
			
		});
		$(".call").on("click",".trash",function(){
			event.preventDefault(event);
			socket.emit("deleteEntry",[ $(this).next().text() , $(this).parent().parent().children().first().val() ] )
			$(this).parent().velocity("slideUp")
		});
		socket.on("jsonQuery", function(data){
			var keyArray=["Age","Complaints","RelatedHistory","Medication","UnrelatedHistory","FamilyHistory",
			"Examination", "ECG","Echo","Others","Lab","Impression","Plan","Telphone","DM","Hypertension",
			"Smoking","CardiacHistory","GeneralHistory"];

			$.each(data,function(entry){
				console.log(data[entry])
				$("<p class='dateItem'>"+entry+": "+data[entry]+"</p>").appendTo(".call").velocity("slideDown",100);
			})
		});
		socket.on("jsonQueryFail",function(data){
			$("<p class='dateItem'>Record Corrupted!</p>").appendTo(".call").velocity("slideDown",100);
		})
		$(".ajaxConfig").on("click", function(){
			$.ajax("config.html", {
				success: function(data){
					$(".config").html(data).velocity("fadeIn",200);
				},
				error: function(err){
					alert(err+"error");
				}
			})
		});
		socket.on("deleteConfirm",function(){
			console.log("heh")
			setTimeout(function(){$(".dateItem").remove()},50);

		})
		$(".config").on("click",".configbtn",function(event){
			event.preventDefault();
			if(/^[0-9]+$/.test($(".height").val()) && /^[0-9]+$/.test($(".fSize").val())){
				$(".config").velocity("fadeOut",200);
				socket.emit("configChange", "{\"keyHeight\":\""+$(".height").val()+"px\""+", \"fontSize\":\""+$(".fSize").val()+"px\"}");
			}
			else{
				$(".config").velocity("fadeOut",200);
			}
		});
		$(".morediv").on("click", function(){
			$(this).find(".more").toggleClass("rotated");
			if(shown === false){
				$(".useless").children().velocity("slideDown", {stagger: 80});
				shown = !shown;
				$(".pgh").velocity("scroll", {duration:300, delay:300});
			}
			else{
				$(".useless").children().velocity("slideUp", {stagger: 80 });
				shown = !shown;
			}
		})
		$(".clear").on("click",function(){
			$(".entry input").val("")

		});

		$(".pecho").on("focus",function(){
			$(".historyContainer").velocity("fadeIn")
			socket.emit("giffHistory",$(".pname").val())
		})
		$(".pecho").on("blur",function(){
			$(".historyContainer").velocity("fadeOut");
			$(".historyContainer").children().remove()
		})
		$(".historyContainer").css("top",$(".historyContainer").height-$(window).height())

		//dragula([document.querySelector('.patientVisits'), document.querySelector('.trashon')]);
});			