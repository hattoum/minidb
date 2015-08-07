
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
	
	$(".pname").on("focus",function(){
		socket.emit("getAllPatientsCreate","hehe");
	});
	
	$(".searchtxt").on("focus",function(){
		socket.emit("getAllPatientsQuery","hehe");
	});
	
	$(".submitbtn").on("click", function(event){
		event.preventDefault();
		$("nav").velocity("scroll", { 
  			duration: 800,
  			delay: 300
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
		if(pname != ""){
			$(".pname").css("border","#ccc solid 1px")
		socket.emit("clientNewEntry", 
			{
				"Name": pname,
				
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
				
				"EntryName": pentryname,
				"details": pdetails,

				"perm": {
					"Age": page,
					"Telphone": ptel,
					"DM": pdm,
					"Hypertension": pht,
					"Smoking": psmoking

				}
			});
		}else{
			$(".pname").css("border","#f00 solid 1px")
		}
		});
	
	$(".patientsNo").on("click",function(event){
		event.preventDefault();
		socket.emit("count", "hehe");
	});
	
	$(".patientsList").on("click", function(event){
		event.preventDefault();
		socket.emit("list", "hehe");
	})
	
		$(".call").on("click",".patientVisits", function(){
			$(".dateItem").remove();
			$(".trash").remove()
			$(this).prepend("<div class= 'trash'><div class='trashIn'></div></div>")
			var clickedDate = $(this).text();
			socket.emit("visitQuery", {"dir":dirName, "date":clickedDate});
			socket.emit("giffPermData",dirName)
			
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
		$(".clear").on("click",function(){
			$(".entry input").val("")

		});
		$(".call").on("click",".trash",function(){
			event.preventDefault(event);
			socket.emit("deleteEntry",[ $(this).next().text() , $(this).parent().parent().children().first().val() ] )
			$(this).parent().velocity("slideUp")
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


////////////////////////////Socket interactions/////////////////////////////////////////////////////////////
		socket.emit("getConfig", "halp");

		//Applying config
		socket.on("config", function(data){
			$(".entry").height(data.keyHeight)
			$("body").find(".container").find(".entry").find("p").css({"font-size": data.fontSize});
			$("body").find(".container").find(".entry").find("label").css({"font-size": data.fontSize})
			$("body").find(".container").find(".morediv").find("p").css({"font-size": data.fontSize})
		})

		//Autocompletion
		socket.on("patientsArrayCreate", function(data){
			$(function(){
				$(".pname").autocomplete({source:data});
			})
		});

		//MOAR AUTOCOMPLETION
		socket.on("patientsArrayQuery", function(data){
			$(function(){
				$(".searchtxt").autocomplete({source:data});
			})
		})

		//Reporting successful entry additions
		socket.on("done", function(data){
			$(".add").children().children().val("");
			$("texarea").text("");
			$("<a class='done'>"+data+"</a>").appendTo(".add").css({position: "fixed", left: ($(window).width()*0.45)+"px", bottom: ($(window).height()*0.9)+"px"}).velocity("fadeIn",1100).velocity("fadeOut",2000);
			});
			$(".searchbtn").on("click", function(event){
				event.preventDefault();
				$(".dateItem").remove();
				dirName = $(".searchtxt").val();
				socket.emit("clientQuery", $(".searchtxt").val());
		});

		//I heff no idea
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

		//Echo history
		socket.on("history",function(data){
			data.forEach(function(entry){
				$(".historyContainer").append("<p class='echoHistory'>"+entry[0]+": "+entry[1]+"</p>") 
			})
		})

		//Listing all entries
		socket.on("serverQuery", function(data){
			$(".patientVisits").remove();
			data.forEach(function(entry){
				if(entry == "" || entry == "perm.json"){}
				else{
					$("<div class='patientVisits'><span>"+entry+"</span></div>").appendTo(".call");
				}
			})
		});

		//Notify user that no  results have been found udner the name entered
		socket.on("noResults", function(data){
		$(".searchtxt").val(data).velocity({color: "#f00"}, 600).velocity({color: "#000"}, 600);

		})

		//Show number of all patients recorded
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

		//Recieve & List data from perm.json
		socket.on("permData",function(data){
			$.each(data,function(entry){
				if(data[entry] != ""){
					$("<p class='dateItem'>"+entry+": "+data[entry]+"</p>").appendTo(".call").css({"border":"#f00 solid 1px"}).velocity("slideDown",100);
				}
			})
		})

		//I dunno
		socket.on("jsonQuery", function(data){
			$.each(data,function(entry){
				if(data[entry] != ""){
					$("<p class='dateItem'>"+entry+": "+data[entry]+"</p>").appendTo(".call").velocity("slideDown",100);
				}
			})
		});

		//I really have no idea why I made failing require server side oeprations
		socket.on("jsonQueryFail",function(data){
			$("<p class='dateItem'>Record Corrupted!</p>").appendTo(".call").velocity("slideDown",100);
		})

		//Delay on deleting entries to avoid race condition, so cheesy
		socket.on("deleteConfirm",function(){
			setTimeout(function(){$(".dateItem").remove()},50);

		})
});			