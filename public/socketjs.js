var socket = io.connect("http://localhost:1337");
var ind = 0;
var listind = 0;
$(document).ready(function() {
$(".submitbtn").on("click", function(event){
	event.preventDefault();
	var pname = $(".pname").val();
	var page = $(".page").val();
	var pvisits = $(".pvisits").val();
	var pdate = $(".pdate").val();
	var pdetails = $(".pdetails").val();
	socket.emit("clientNewEntry", 
		{
			"name": pname,
			"age": page,
			"visits": pvisits,
			"lastvisit": pdate,
			"details": pdetails
		});
});
socket.on("done", function(data){
	$("input").val("");
	$("texarea").text("");
	$("<span class='done'>"+data+"</span>").appendTo(".add").velocity("fadeIn",900).velocity("fadeOut",500);
});
$(".searchbtn").on("click", function(event){
	event.preventDefault();
	socket.emit("clientQuery", $(".searchtxt").val());
});
socket.on("serverQuery", function(data){
	$(".age").html(data.age)
	$(".visits").html(data.visits)
	$(".date").html(data.lastvisit)
	$(".detail").html(data.details)
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
});			
