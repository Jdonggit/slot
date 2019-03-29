$( document ).ready(function() {
	var CANCEL = '取消';
	var SURE = '确定';
	$(".lott_left").hide();
});
function slotRs(rs)
{
	$("#lott_rs").hide();
	$("#lott_bar").show();

	var sound = $(".switch-input").prop("checked");
	var start = true;
	var loops = 6;
	var t = 6000;
	//$('.mmc_pond').text('result = '+yiu);
	$(".jSlots-wrapper").remove();
	$("#box").append($("#slotTmp").html());
	if(rs!=""){
		$('#box .inbox').jSlots({
				number : 5,
				winnerNumber : 0,
				time : t,
				loops : loops,
				start : start,
				endNumbers :rs,
				numberSets : [10,9,8,7,6,5,4,3,2,1],
				onStart : function() {
					console.log('start');
					sound = $(".switch-input").prop("checked");
				
					document.getElementById("goon").style.pointerEvents = "none";
					var count=0;
					var factor = 1;
					
					for (var i=0;i<=(t/80);i++) {		
					   (function(ind) {					 
						   setTimeout(function(){
								factor = count == 0 ? 1 : (count==7 ? -1 : factor);
								count += factor;				
								markers[count].draw();
								clear();
						   }, 100 *0.5* (ind+1) );

					   })(i);
					}
					clear();
				},		
				onFinish : function() {		
					
					document.getElementById("goon").style.pointerEvents = "";
					$(".pop-modal").css('display', 'block');
					var sound = $(".switch-input").prop("checked");
				
					getBeforeGame();
					clear();
				}	
		});
	}else{
		$('#lott_rs .inbox').jSlots({
				number : 5,
				time : t,
				loops : 40,
				start : start,
				onStart : function() {
					console.log('star');
					
				
				},		
		});
	
	}
}
