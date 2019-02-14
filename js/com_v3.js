$( document ).ready(function() {
	var CANCEL = langcx['wjs.CANCEL'];
	var SURE = langcx['wjs.SURE'];
	$(".lott_left").hide();
	audiojs.events.ready(function() {
		var a = audiojs.createAll({});
		slotAudio = a[0];
		timerAudio = a[1];
		readyAudio = a[2];
		//slotRs();
    });
	
	dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 160,
      width: 400,
      modal: true,
      buttons: {
        CANCEL: function() {
			$( this ).dialog( "close" );
        }
      }
    });
	
	$('#myfile').bind('change', function() {
	  if(this.files[0].size>800000)
	  {
		showAlert(langcx['wjs.FILE_TOO_BIG']);
		$('#myfile').val("");
	  }
	});
	checkSound();
	checkCoin();
	getAnalye();
	var _showTab = 0;
	$("input.numeric").keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
    });
	$("input.numeric").keyup(function (e) {
		var value = $(this).val();
		value = value.replace(/\D+/g, '');
		$(this).val(value);
    });
	$('.abgne_tab').each(function(){
		// 目前的頁籤區塊
		var $tab = $(this);

		var $defaultLi = $('ul.tabs li', $tab).eq(_showTab).addClass('active');
		$($defaultLi.find('a').attr('href')).siblings().hide();
		sel_play = $defaultLi.find('a').attr('id');
		var _clickTab = $(this).find('li a').attr('href');
		Bbet.setDiv($(_clickTab+"_ball").attr('id'));
		Ebet.setDiv($(_clickTab+"_ball").attr('id'));
		setTitleGame(sel_play);
		// 當 li 頁籤被點擊時...
		// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
		$('ul.tabs li', $tab).click(function() {
			// 找出 li 中的超連結 href(#id)
			var $this = $(this),
				_clickTab = $this.find('a').attr('href');
			Bbet.setDiv($(_clickTab+"_ball").attr('id'));
			Ebet.setDiv($(_clickTab+"_ball").attr('id'));			
			sel_play = $this.find('a').attr('id');

			// 把目前點擊到的 li 頁籤加上 .active
			// 並把兄弟元素中有 .active 的都移除 class
			$this.addClass('active').siblings('.active').removeClass('active');
			// 淡入相對應的內容並隱藏兄弟元素
			$(_clickTab).stop(false, true).fadeIn().siblings().hide();
			setTitleGame(sel_play);
			return false;
		}).find('a').focus(function(){
			this.blur();
		});
	});
	
	$('.info_tab').each(function(){
		// 目前的頁籤區塊
		var $tab = $(this);
		var $defaultLi = $('ul.tabs li', $tab).eq(_showTab).addClass('active');
		$($defaultLi.find('a').attr('href')).siblings().hide();
		var _clickTab = $(this).find('a').attr('href');
		// 當 li 頁籤被點擊時...
		// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
		$('ul.tabs li', $tab).click(function() {
			// 找出 li 中的超連結 href(#id)
			var $this = $(this),
				_clickTab = $this.find('a').attr('href');
			if(_clickTab=="#tab1"){}
			else if(_clickTab=="#tab2")
				getBeforeGame();	
			else if(_clickTab=="#tab3")
				getTodayBet();
			else if(_clickTab=="#tab4")
				getRecentBet();		
			// 把目前點擊到的 li 頁籤加上 .active
			// 並把兄弟元素中有 .active 的都移除 class
			$this.addClass('active').siblings('.active').removeClass('active');
			// 淡入相對應的內容並隱藏兄弟元素
			$(_clickTab).stop(false, true).fadeIn().siblings().hide();
			return false;
		}).find('a').focus(function(){
			this.blur();
		});
	});
	
	$('.smalllabel' ).click(function() {
		var pid = $(this).parents(".sel_play_div").attr('id');
		var ptype = $(this).attr('id');
		mapping_type(ptype);
		setSlider(ptype);
		$("#"+pid+"_ball").hide();
		$("#"+pid+"_ball").stop(false, true).fadeIn().siblings();
	});
	$(".sound").click(function() {
		$(".sound").toggleClass("on off");
		var sound = $(".sound").hasClass("on");	
		if(sound)
		{
			setCookie("sound", true, 30);
		}
		else
		{
			slotAudio.pause();
			readyAudio.pause();
			setCookie("sound", false, 30);		
		}
	});
	$('#time_reduce').click(function() {
		var times = parseInt($('#lt_sel_times').val());
		if(times>1)
			$('#lt_sel_times').val(times-1);
		comBetMoney();	
	});
	$('#time_add').click(function() {
		var times = parseInt($('#lt_sel_times').val());
		if(times<max_bs)
			$('#lt_sel_times').val(times+1);
		comBetMoney();
	});
	var myposition={ my: "center top", at: "center top+250"};
	$( "#dialog" ).dialog({ 
		width: 500,
		autoOpen: false,
		modal: true,
		position:myposition
	});
	
	$( "#dialog_fastbet" ).dialog({ 
		width: 500,
		autoOpen: false,
		modal: true,
		position:myposition
	});
	$(".keno .pagetitle").click(function(){
		$("#SubMenu2").toggle();
	});

});
function checkSound() {
    var sound=getCookie("sound");
    if (sound == "false") {
		$(".sound").attr("class","sound switch off");
    }
}
function closeSelBet(clear)
{
	if(clear)
			Blist.init();
	$( "#dialog" ).dialog( "close" );	
}
function closeFastBet()
{
	$( "#dialog_fastbet" ).dialog( "close" );
}
function slotRs(sn,rs)
{
	var start = true;
	var loops = 6;
	var time = 7000;
	if(sn == rsSn)return;
	if(rsSn != sn)rsSn = sn;
	
	var sound = $(".sound").hasClass("on");	
	if (typeof rs == 'undefined')
	{
		return;
	}
	else
	{
		$("#lott_rs").hide();
		$("#lott_bar").show();
	}
	$(".jSlots-wrapper").remove();
	$(".fancy").append($("#slotTmp").html());
	$('.fancy .slot').jSlots({
		number : 5,
		winnerNumber : 0,
		time : time,
		loops : loops,
		start : start,
		sound : sound,
		endNumbers : rs,
		numberSets : [10,9,8,7,6,5,4,3,2,1],
		onStart : function() {
				sound = $(".sound").hasClass("on");
				if(sound)
				{
					if (typeof slotAudio != 'undefined' && sound == true)
					{
						slotAudio.load(slotAudio.mp3);
						slotAudio.play();
					}	
				}
            },
		onFinish : function() {
                if (typeof slotAudio != 'undefined' && sound == true)
					slotAudio.pause();
				getAnalye();	
				getBeforeGame();
				getRsPtype(rs);
            }	
	});
}
function getRsPtype(rs)
{
	var front = rs.slice(0,3);
	var mid = rs.slice(1,4);
	var behind = rs.slice(2,5);
	$("#rsPtype").html(langcx['wjs.STAR3']+":"+getPtype(front));
}
function getPtype(rs)
{
	var pt = "";
	if(rs[0]==rs[1]&&rs[1]==rs[2])
		pt = langcx['wjs.LEOPARD'];
	else if(rs[0]==rs[1]||rs[1]==rs[2]||rs[0]==rs[2])
		pt = langcx['wjs.GROUP3'];
	else if(rs[0]!=rs[1]&&rs[1]!=rs[2]&&rs[0]!=rs[2])
		pt = langcx['wjs.GROUP6'];
	return pt;	
}
function reCall(data)
{
	if(Casino!=data['Casino'])return;
	if((data['state']=="1" && parseInt(data['Countdown']) == 0)||data['Current'] == null)
	{
		nowSn = "";
		$('#currentSN').html("-----");
		$('#countdown').html("00:00:00");
		$('#endTime').html("");
		setTimeout('dd()',5000);
	}
	else if(data['state']=="0" && parseInt(data['Countdown']) == 0)
	{
		setTimeout('dd()',5000);
	}
	else
	{
		$( "#dialog" ).dialog( "open" );
		setTimeout('closeDialog()',5000);
		//del_tick(nowSn);
		nowSn = data['Current'][2];
		$('#currentSN').html(nowSn);
		$('#endTime').html(data['Current'][4]);
		var ts = (new Date()).getTime() + parseInt(data['Countdown'])*1000;
		countdown(ts);
		getAnalye();
	}	
}
function reError(msg)
{
	setTimeout('dd()',1000);
}
function closeDialog()
{
	$( "#dialog" ).dialog( "close" );
}

function reAnalye(data)
{
	Analye=data;
	setAnalye();
}
function changeNextGame(data)
{
	if((ch==0 && cm == 0 && cs == 0) || nowSn != data[2])
	{
		dd();
		getAfterGame();
	}
}
var ch=0,cm=0,cs=0;
var tickTimeout;
function countdown(t)
{
	var hours	= 60*60,
		minutes	= 60;
	var left,h,m,s;
	if(tickTimeout)
		clearTimeout(tickTimeout);
	(function tick(){
			
		// Time left
		left = Math.floor((t - (new Date())) / 1000);
		
		if(left < 0){
			left = 0;
			return;
		}
		
		// Number of hours left
		h = Math.floor(left / hours);
		left -= h*hours;
		
		// Number of minutes left
		m = Math.floor(left / minutes);
		left -= m*minutes;
		
		// Number of seconds left
		s = left;
		setTick(h,m,s);
		// Scheduling another call of this function in 1s
		ch = h;
		cm = m;
		cs = s;
		if(h != 0 || m != 0 || s != 0)
			tickTimeout = setTimeout(tick, 1000);
		var sound = $(".sound").hasClass("on");
		if(sound && h==0 && m==0 && s==15)
		{
			if (typeof readyAudio != 'undefined' && sound == true)
			{
				readyAudio.load(readyAudio.mp3);
				readyAudio.play();
			}	
		}
		else if(sound && h==0 && m==0 && s==0)
		{
			if (typeof readyAudio != 'undefined' && sound == true)
			{
				readyAudio.pause();
			}
		}
	})();
	function setTick(lh,lm,ls){
		if(lh<10)lh="0"+lh;
		if(lm<10)lm="0"+lm;
		if(ls<10)ls="0"+ls;
		var cbt = lh+":"+lm+":"+ls;
		$("#countdown").html(cbt);
	};
}
function setCDnum(t)
{
	var hours	= 60*60,
		minutes	= 60;
	var left,h,m,s;
	h = Math.floor(left / hours);
	left -= h*hours;
	m = Math.floor(left / minutes);
	left -= m*minutes;
	s = left;
	
	if(h<10)h="0"+h;
	if(m<10)m="0"+m;
	if(s<10)s="0"+s;
	var cbt = h+":"+m+":"+s;
	$("#countdown").html(cbt);
}
function setAnalye(atype)
{
	if (typeof Analye == "undefined" || typeof Bbet.btype == "undefined")return;
	var m;
	if (typeof atype == "undefined")
		m = $(".switch_atype").find(".selected").attr("value");
	else
		m = atype;
	//var m = $('input[name=anamode]:checked').val();
	
	switch(Bbet.btype)
	{
		case "five_set":
		case "five_coms":
		case "three_front_set":
		case "three_front_coms":
		case "two_front_set":
		case "one_set":
		case "four_set":
		case "four_coms":
		case "three_mid_set":
		case "three_mid_coms":
		case "three_behind_set":
		case "three_behind_coms":
		case "two_behind_set":
		case "any2_set":
		case "any3_set":
		case "any4_set":
		case "any5_set":
			for(var s in Analye['one'])
			{
				var sObj = Analye['one'][s];
				for(var n in sObj)
				{
					$(".ana_"+s+"_"+n).html(Analye['one'][s][n][m]);
				}
			}
			break;		
		default:
			for(var n in Analye['all'])
			{
				$(".ana_"+n).html(Analye['all'][n][m]);
			}
			break;		
	}
}

function titlePlay(sel_play)
{
	var ptype = "";
	Tab = sel_play;
	switch(sel_play)
	{
		case "three_front":
			ptype = "three_front_set";
			break;
		case "two_front":
			ptype = "two_front_set";
			break;
		case "two_behind":
			ptype = "two_behind_set";
			break;
		case "one":
			ptype = "one_set";
			break;
		case "noset":
			ptype = "three_front_1";
			break;
		case "bseo":
			ptype = "two_front_bseo";
			break;		
	}
	return ptype;
}

function setTitleGame(sel_play)
{
	var tptype = titlePlay(sel_play);
	$("#"+tptype).attr("checked","checked");
	var name = $("#"+tptype).attr("name");
	var sptype = $('input[name='+name+']:checked').attr('id');
	mapping_type(sptype);
	setSlider(sptype);
}
function numAdd(n1,n2)
	{
	return Math.round((Number(n1)*1000000+Number(n2)*1000000)/1000000*10*10)/100;
	}
function setSlider(type) {
	Code = getCode(type);
	var sRatio = BaseRatio[0][Code];
	var water = BaseWater[0][Code];
	var step = BaseRatio.length;
	
	$("#ratioSel option").remove();
	$("#ratioSel").append($("<option></option>").attr("value", sRatio).attr("water", water).text(sRatio+"/"+water+'%'));
	switch(Code)
	{
		case "5008":
			Bbet.setRatio(sRatio);
			Ebet.setRatio(sRatio);
			Bbet.setWater(water);
			Ebet.setWater(water);
			break;
		default:
			var rq = parseFloat((BaseRatio[0][Code]/85)*BaseWater[0][Code]);
			var ratio = accAdd(BaseRatio[0][Code],rq);
			var nr = new Number(ratio);
			nr = Math.round(accMul(nr,100))/100;
			$("#ratioSel").append($("<option></option>").attr("value", nr).attr("water", 0).text(nr+"/"+0+'%'));
			$("#ratioSel").val(nr);
			Bbet.setRatio(nr);
			Ebet.setRatio(nr);
			Bbet.setWater(0);
			Ebet.setWater(0);
			break;
	}
	$("#ratioSel").change(function() {
		var r = $(this).find(":selected").val();
		var w = $(this).find(":selected").attr("water");
		Bbet.setRatio(r);
		Ebet.setRatio(r);
		Bbet.setWater(w);
		Ebet.setWater(w);
	});
	/*
	$( "#wrSwitch" ).html( sRatio+"-"+water+'%' );
	$( "#slider" ).slider({
		range: "min",
		value: 0,
        min: 0,
        max: step-1,
        step: step-1,
		slide: function( event, ui ) {
			if(ui.value==0)
			{
				$( "#wrSwitch" ).html( BaseRatio[ui.value][Code]+"-"+BaseWater[ui.value][Code]+'%' );
				Bbet.setRatio(BaseRatio[ui.value][Code]);
			}
			else
			{
				if(BaseWater[0][Code]>0)
				{
					var rq = parseFloat((BaseRatio[0][Code]/85)*BaseWater[0][Code]);
					var ratio = parseFloat(BaseRatio[0][Code]+rq);
					var nr = new Number(ratio);
					nr = Math.floor(nr*100)/100;
					$( "#wrSwitch" ).html( nr+"-"+0+'%' );
					Bbet.setRatio(ratio);
					Ebet.setRatio(ratio);
				}
				else
				{
					$( "#wrSwitch" ).html( BaseRatio[0][Code]+"-"+BaseWater[0][Code]+'%' );
					Bbet.setRatio(BaseRatio[0][Code]);
					Ebet.setRatio(BaseRatio[0][Code]);
				}
			}
		}
	});
	*/
}
function setBeforeGame(data)
{
	var html = "";
	for(var i=0;i<data.length;i++)
	{
		var d = data[i];
		html += "<tr><td>"+d[2]+"</td><td><ul class='history_prize'>";
		for(var j=0;j<d[3].length;j++)
		{
			html += "<li>"+d[3][j]+"</li>";
		}
		html += "</ul></td>";
		html += "<td>"+d[4]+"</td></tr>"
	}
	$("#beforeGame").html(html);
}
function setTodayBet(data)
{
	$("#todayBet .tdbet").remove();
	for(var bid in data)
		{
			var html = "";
		//html += '<tr onclick="showBet(\'mem-betview?bi='+bid+'\');" class="tdbet">';
		html += '<tr class="tdbet">';
		html += '<td style="border-right: 1px solid #eee;">'+data[bid]['game']+'</td>';
		html += '<td style="border-right: 1px solid #eee;">'+data[bid]['gsn']+'</td>';
		html += '<td style="border-right: 1px solid #eee;">'+data[bid]['bets']+'</td>';
		html += '<td style="border-right: 1px solid #eee;">'+data[bid]['betmoney']+'</td>';
		html += '<td>'+data[bid]['win']+'</td>';
		html += '</tr>';
		$("#todayBet").append(html);
	}
	top.mm.resize($(document).height(),$(document).width());
}
function setRecentBet(data)
{
	$("#tab4 .rtbet").remove();
	for(var bid in data)
	{
		var html = "";
		html += '<table class="rtbet" style="text-align:center;border-bottom: 1px solid #fff;"><tr>';
		html += '<td>'+data[bid]['game']+'</td>';
		html += '<td>'+data[bid][9]+'</td>';
		html += '<td>$'+data[bid][15]+'</td>';
		if(data[bid]['open']==0 && data[bid][19]==0 && data[bid]['del']==1)
			html += '<td rowspan="2" style="width:50px;"><a href="javascript:void(0)" onclick="delBet(&quot;'+data[bid][1]+'&quot;);">'+langcx['wjs.DELETE_ORDER']+'</a></td>';
		else 
		{
			if(data[bid][19]==1)
				html += '<td rowspan="2" style="color:red;width:50px;">'+langcx['wjs.DELETED_BET']+'</td></tr>';
			else 
			{
				if(data[bid]['open']==0)
					html += '<td rowspan="2" style="color:#666;width:50px;">'+langcx['wjs.NO_LOTTERY']+'</td></tr>';
				else if(data[bid]['open']==1 && data[bid]['wflag']==0)
				{
					if(data[bid][5]==1)
						html += '<td rowspan="2" style="color:green;width:50px;">'+langcx['wjs.TIEWIN']+'</td></tr>';
					else
						html += '<td rowspan="2" style="color:red;width:50px;">'+langcx['wjs.NO_WIN']+'</td></tr>';
				}	
				else if(data[bid]['open']==1 && data[bid]['wflag']==1)
					html += '<td rowspan="2" style="color:green;width:50px;">'+langcx['wjs.WIN']+'</td></tr>';	
			}		
		}		
		html += '<tr>';
		html += '<td>'+data[bid]['gsn']+'</td>';
		html += '<td colspan="2"><a href="javascript:void(0)" onclick="showBet(&quot;mem-betview?bi='+data[bid][1]+'&quot;);">'+data[bid][1]+'</a></td>';
		html += '</tr></table>';
		$("#tab4").append(html);		
	}
	top.mm.resize($(document).height(),$(document).width());
}
var dflag=false;
function delBet(id){
	if(dflag)return;
	if(confirm(langcx['wjs.HISTORYACCOUNT_DELETE'])){
		dflag=true;
		$.post('mem-dd',{"d":id},dhandler,'json');
	}
}
function dhandler(d){
	if(d[0]){
		alert(langcx['wjs.HISTORYACCOUNT_DELETED']);
	}else{
		alert(langcx['wjs.HISTORYACCOUNT_CANT_DELETED']);
	}
	dflag=false;
	getRecentBet();
}
function showBet(page){
	$("#dialogb").dialog({
		title:'',
		width: 600,
		height:420,
		modal: true,
		draggable: false,
		resizable: false,
		overlay:{opacity: 0.9, background: "#fff" },
		open: function(ev, ui){
		     $('#myIframe').attr('src',page);
		},
		buttons: {
		    CANCEL: function() {
				$('#myIframe').attr('src','');
		        $(this).dialog('close');
		    }
		}
	});
}