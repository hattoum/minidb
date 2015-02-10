var socket = io.connect("http://localhost:1337");
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
		var pcomplaint = $(".pcomplaint").val();
		var phr = $(".phr").val();
		var pge = $(".pge").val();
		var ple = $(".ple").val();
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
		var pecho = $(".pecho").val();
		var psmoking = $(".psmoking").val();
		var pch = $(".pch").val();
		var pgh = $(".pgh").val();
		var bpressure = $(".bloodpressure").val();
	socket.emit("clientNewEntry", 
		{
			"Name": pname,
			"Age": page,
			"Complaints": pcomplaint,
			"HeartRate": phr,
			"bloodpressure": bpressure,
			"GeneralExamination": pge,
			"LocalExamination": ple,
			"ECG": pecg,
			"Echo": pecho,
			"Lab": plab,
			"Other": pother,
			"Impression": pimpression,
			"Plan": pplan,
			"Medication": pmed,
			"Telphone": ptel,
			"DM": pdm,
			"Hypertension": pht,
			"Smoking": psmoking,
			"CardiacHistory": pch,
			"GeneralHistory": pgh,
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
			var clickedDate = $(this).text();
			socket.emit("visitQuery", {"dir":dirName, "date":clickedDate});
			
		});
		socket.on("jsonQuery", function(data){
			var keyArray=["Age","Complaints","HeartRate","bloodpressure","GeneralExamination","LocalExamination",
			"details", "ECG","Echo","Lab","Other","Impression","Plan","Medication","Telphone","DM","Hypertension",
			"Smoking","CardiacHistory","GeneralHistory"];
			keyArray.forEach(function(entry){
				$("<p class='dateItem'>"+entry+": "+data[entry]+"</p>").appendTo(".call").velocity("slideDown",100);
			})
		});
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
});			