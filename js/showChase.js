var dialog_chase;
var max_bs=9999;
var max_period=50;
$( document ).ready(function() {
	if(theme=="v1")
	{
		dialog_chase = $( "#chase_div" ).dialog({
		autoOpen: false,
		resizable: false,
		width: 700,
		modal: true,
		dialogClass: 'no-close loadstyle',
		open: function(ev, ui){
			$( ".checkbox" ).blur();
			}
		});
	}
	else
	{
		dialog_chase = $( "#chase_div" ).dialog({
		autoOpen: false,
		resizable: false,
		width: 800,
		modal: true,
		dialogClass: 'no-close loadstyle',
		open: function(ev, ui){
			$( ".checkbox" ).blur();
			}
		});
	}
	
	$("input[name=chaseType]").click(function(){
		var chaseType = $('input[name=chaseType]:checked').val();
		if(chaseType==0)
		{
			showNChase();
		}
		else if(chaseType==1)
		{
			t_dis_all_tick();
			if(Blist.list.length==1)
			{
				showTChase();
				
			}
			else
			{
				alert(langcx['wjs.TOPCHASE_ONLY_ONE_BET']);
				$('input[name="chaseType"]')[0].checked = true; 	
			}
		}
	});
});
function showNChase()
{
	dis_all_tick();
	$("#topChase").hide();
	$("#normalChase").show();
	$("#t_add_tick_line").hide();
	$("#add_tick_line").show();
}
function showTChase()
{
	initMaxProfit();
	$("#normalChase").hide();
	$("#topChase").show();
	$("#add_tick_line").hide();
	$("#t_add_tick_line").show();
}
function openChase()
{
	var chaseType = $('input[name=chaseType]:checked').val();
	if(chaseType==0)
		dis_all_tick();
	else if(chaseType==1)
	{
		t_dis_all_tick();
		initMaxProfit();
		if(Blist.list.length>1)
		{
			showNChase();
			$('input[name="chaseType"]')[0].checked = true;
		}
	}
	if(Blist.total_bets>0)
	{
		if($(document).height()<800)
			top.mm.resize(800,$("#mainPage").width());
		else	
			top.mm.resize($(document).height(),$("#mainPage").width());
		dialog_chase.dialog( "open" );
	}
}
function closeChase()
{
	dialog_chase.dialog( "close" );
}

function getChase()
{
	var chaseSn = new Object;
	chaseSn['type']=1;
	chaseSn['data'] = [];
	var chaseType = $('input[name=chaseType]:checked').val();
	if(chaseType==0)
	{
		chaseSn['data']=normalChase();
	}
	else if(chaseType==1)
	{
		chaseSn['data']=topChase();
	}

	var cflag = true;
	if(chaseSn['data'].length==0)
	{
		var data = [];
		if(nowSn!="")
		{
			data.push(nowSn);
			data.push(1);
			chaseSn['data'].push(data);
		}
		cflag = false;
	}
	var check = $("#lt_trace_stop").prop("checked");
	if(check && cflag)
		chaseSn['type']=3;
	else if(cflag)
		chaseSn['type']=2;

	return chaseSn;
}
function normalChase()
{
	var chase=[];
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		var chk = $("#sel_"+sn).prop("checked");
		if(chk)
		{
			var data = [];
			var times = parseFloat($("#input_"+sn).val());
			data.push(sn);
			data.push(times);
			chase.push(data);
		}
	});
	return chase;
}
function topChase()
{
	var chase=[];
	$("#t_add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("t_add_tick_","");
		var chk = $("#t_sel_"+sn).prop("checked");
		if(chk)
		{
			var data = [];
			var times = parseFloat($("#t_input_"+sn).html());
			data.push(sn);
			data.push(times);
			chase.push(data);
		}
	});
	return chase;
}
function initMaxProfit()
{
	var bets = Blist.list[0].bets;
	var ratio = Blist.list[0].ratio/2;
	var unit = Blist.list[0].unit;
	var obm = bets*unit;
	
	var tn=unit*ratio;
	var tc=tn-obm;
	var tp = (tc/obm)*100;
	
	$("#max_profit").html(tp.toFixed(2)+"%");
}
function checkboxTime(obj)
{
	var sn = $(obj).val();
	if($(obj).prop("checked"))
	{
		$("#input_"+sn).removeAttr('disabled');
		$("#input_"+sn).val(1);
		var cm = Blist.base_money;
		$("#amo_"+sn).html(parseFloat(cm).toFixed(2));
	}
	else
	{
		dis_tick(sn);
	}
	comCount();
	getChase();
}
function changeboxTime(sn)
{
	var times = $("#input_"+sn).val();
	var cm = Blist.base_money;
	$("#amo_"+sn).html(parseFloat(cm*times).toFixed(2));
	comCount();
	getChase();
}
function comCount()
{
	var tm = 0;
	var ts = 0;
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		var chk = $("#sel_"+sn).prop("checked");
		if(chk)
		{
			var amo = parseFloat($("#amo_"+sn).html());
			tm += amo;
			ts ++;
		}
	});
	$("#lt_trace_count").html(ts);
	$("#lt_trace_hmoney").html(tm.toFixed(2));
}
function beginTimes()
{
	var display = $("#chase_div").css('display');
	if(display != "block")return;
	if($("#input_xg").val()=="" || $("#input_bs").val()=="" || $("#input_bs").val()==0 || Blist.base_money==0)
	return;
	
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		dis_tick(sn);
	});
	
	var tm = 0;
	var ts = 0;
	var idx = 0;
	var xg = parseInt($("#input_xg").val());
	var bs = parseInt($("#input_bs").val());
	var bsx = 1;
	var cm = parseFloat(Blist.base_money);
	var period = $("#input_period").val();
	if(period == "")
		period = 0;
	else
		period = parseInt(period);
	
	if(max_bs<bsx)
	{
		alert(langcx['wjs.OVER_MAX_BS']+":"+max_bs);
		return false;
	}
	if(max_period<period)
	{
		alert(langcx['wjs.OVER_MAX_CHASE']+":"+max_period+langcx['wjs.CHI']);
		return;
	}
	
	var redouble = $('input[name=redouble]:checked').val(); 
	//showAlert(redouble);
	if(redouble==1)
	{
		$("#input_xg").attr('disabled', "disabled");
		$("#input_xg").val(1);
	}
	else
	{
		$("#input_xg").removeAttr('disabled');
	}
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		if(period != 0)
		{
			if(redouble == "0" && index != 0 && index % xg == 0)
				bsx = bsx*bs;
			else if(redouble == "0" && index != 0)
				bsx = bsx;
			else if(redouble == "0" && index == 0)
				bsx = 1
			else
				bsx = bs;
			
			if(max_bs<bsx)
			{
				alert(langcx['wjs.DI']+sn+langcx['wjs.CHI']+langcx['wjs.OVER_MAX_BS']+":"+max_bs);
				return false;
			}
			
			$("#input_"+sn).removeAttr('disabled');
			$("#input_"+sn).val(bsx);
			$("#amo_"+sn).html((bsx*cm).toFixed(2));
			$("#sel_"+sn).prop("checked", true);
			tm += bsx*cm;
			ts++;
			period--;
			//showAlert(idx);
		}
		else
		{
			dis_tick(sn);
		}
	});
	$("#lt_trace_count").html(ts);
	$("#lt_trace_hmoney").html(tm.toFixed(2));
}
function del_tick(del_sn)
{
	$("#add_tick_"+del_sn).remove();
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		dis_tick(sn);
	});
	
	$("#t_add_tick_"+del_sn).remove();
	$("#t_add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("t_add_tick_","");
		t_dis_tick(sn);
	});
	
	$("#lt_trace_count").html(0);
	$("#lt_trace_hmoney").html(0);
}

function dis_tick(sn)
{
	$("#input_"+sn).attr('disabled', "disabled");
	$("#input_"+sn).val("");
	$("#amo_"+sn).html("0.00");
	$("#sel_"+sn).prop("checked", false);
}
function dis_all_tick()
{
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		$("#input_"+sn).attr('disabled', "disabled");
		$("#input_"+sn).val("");
		$("#amo_"+sn).html("0.00");
		$("#sel_"+sn).prop("checked", false);
	});
	$("#input_period").val("");
	$("#lt_trace_count").html(0);
	$("#lt_trace_hmoney").html(0.00);
	//$( "#chase_div" ).hide( "fast" );
}
function clear_all_tick()
{
	$("#add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("add_tick_","");
		$("#input_"+sn).attr('disabled', "disabled");
		$("#input_"+sn).val("");
		$("#amo_"+sn).html("0.00");
		$("#sel_"+sn).prop("checked", false);
	});
	$("#input_period").val("");
	$("#lt_trace_count").html(0);
	$("#lt_trace_hmoney").html(0.00);
}
function setAfterGame(data)
{
	$("#add_tick_line .chase_tr").remove();
	for(var i=0;i<data.length;i++)
	{
		if($("#add_tick_"+data[i][2]).length==0)
		{
			var html = "";
			html += '<tr class="chase_tr" id="add_tick_'+data[i][2]+'">';
			html += '<td valign="middle">';
			html += '<input id="sel_'+data[i][2]+'" type="checkbox" onclick="checkboxTime(this);" value="'+data[i][2]+'">';
			html += '</td>';
			html += '<td>'+data[i][2]+'</td>';
			html += '<td>';
			html += '<input id="input_'+data[i][2]+'" type="text" name="textfield6" class="input6 numeric" maxlength="4" size="4" onkeyup="changeboxTime('+data[i][2]+');" disabled=""> '+langcx['wjs.MULTIPLE']; //倍
			html += '</td>';
			html += '<td>';
			html += '¥<span id="amo_'+data[i][2]+'">0.00</span>';
			html += '</td></tr>';
			/*
			html += '<tr class="chase_tr" id="add_tick_'+data[i][2]+'" class="list_font">';
			html += '<td width="10%" height="32" align="center" valign="middle" scope="row">';
			html += '<input id="sel_'+data[i][2]+'" type="checkbox" name="checkbox2" class="chb" onclick="checkboxTime(this);" value="'+data[i][2]+'">';
			html += '</td>';
			html += '<td width="30%" height="32" align="center" valign="middle">'+data[i][2]+'</td>';
			html += '<td width="30%" height="32" align="center" valign="middle">';
			html += '<input id="input_'+data[i][2]+'" type="text" name="textfield6" class="input6 numeric" maxlength="4" size="4" onkeyup="changeboxTime('+data[i][2]+');" disabled=""> '+langcx['wjs.MULTIPLE']; //倍
			html += '</td>';
			html += '<td width="20%" height="32" align="center" valign="middle">';
			html += '¥<span id="amo_'+data[i][2]+'">0.00</span>';
			html += '</td></tr>';
			*/
			$("#add_tick_line").append(html);
		}
	}
	$(".numeric").on("paste", function(){
		return false;
    });
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
	
	$("#t_add_tick_line .chase_tr").remove();
	for(var i=0;i<data.length;i++)
	{
		if($("#t_add_tick_"+data[i][2]).length==0)
		{
			var html = "";
			html += '<tr class="chase_tr" id="t_add_tick_'+data[i][2]+'">';
			html += '<td valign="middle">';
			html += '<input id="t_sel_'+data[i][2]+'" type="checkbox" value="'+data[i][2]+'" disabled="disabled">';
			html += '</td>';
			html += '<td>'+data[i][2]+'</td>';
			html += '<td><span id="t_input_'+data[i][2]+'">0</span></td>';
			html += '<td><span id="t_amo_'+data[i][2]+'">0.00</span></td>';
			html += '<td><span id="t_acm_'+data[i][2]+'">0.00</span></td>';
			html += '<td><span id="t_nem_'+data[i][2]+'">0.00</span></td>';
			html += '<td><span id="t_cwm_'+data[i][2]+'">0.00</span></td>';
			html += '<td><span id="t_pp_'+data[i][2]+'">0.00</span></td>';
			html += '';
			html += '</td></tr>';
			$("#t_add_tick_line").append(html);
		}
	}
}
function makeTChase()
{
	var period = $("#input_tper").val();
	if(max_period<period)
	{
		alert(langcx['wjs.OVER_MAX_CHASE']);
		return;
	}
	var bets = Blist.list[0].bets;
	var ratio = Blist.list[0].ratio/2;
	var unit = Blist.list[0].unit;
	var tcType = $('input[name=tcType]:checked').val();
	var bsx = 1;
	var ts = 0;
	var obm = bets*unit;
	var amo=0,acm=0,nem=0,cwm=0,pp=0;
	
	bsx=$("#input_tbs").val();;
	//amo=obm*1;
	//acm=1*obm;
	var tn=unit*ratio;
	var tc=tn-obm;
	var tp = (tc/obm)*100;
	if(tp<0)
	{
		alert(langcx['wjs.MAX_PROFIT']+tp.toFixed(2)+"%");
		return;
	}	
	var atp,snp,bnp,anp;
	var atm,snm,bnm,anm;
	
	if(tcType==1)
	{
		atp = parseInt($("#input_atp").val());
		if(tp<atp)
		{
			alert(langcx['wjs.MAX_PROFIT']+tp.toFixed(2)+"%");
			return;
		}
	}
	else if(tcType==2)
	{
		snp = $("#input_snp").val();
		bnp = $("#input_bnp").val();
		anp = $("#input_anp").val();
		if(tp<bnp || tp<anp)
		{
			alert(langcx['wjs.MAX_PROFIT']+tp.toFixed(2)+"%");
			return;
		}
	}
	else if(tcType==3)
	{
		atm = parseInt($("#input_atm").val());
	}
	else if(tcType==4)
	{
		snm = $("#input_snm").val();
		bnm = $("#input_bnm").val();
		anm = $("#input_anm").val();
	}
	$("#t_add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("t_add_tick_","");
		if(period != 0)
		{
			
			if(tcType==1)
			{
				bsx=getPBS(atp,bsx,unit,obm,ratio,acm);
			}
			else if(tcType==2)
			{
				if(index<snp)
					bsx=getPBS(bnp,bsx,unit,obm,ratio,acm);
				else
					bsx=getPBS(anp,bsx,unit,obm,ratio,acm);
			}
			else if(tcType==3)
			{
				bsx=getMBS(atm,bsx,unit,obm,ratio,acm);
			}
			else if(tcType==4)
			{
				if(index<snm)
					bsx=getMBS(bnm,bsx,unit,obm,ratio,acm);
				else
					bsx=getMBS(anm,bsx,unit,obm,ratio,acm);
			}
			amo=obm*bsx;
			acm=acm+amo;
			nem=bsx*unit*ratio;
			cwm=nem-acm;
			pp = (cwm/acm)*100;
			
			if(max_bs<bsx)
			{
				//var ots = ts+1;
				alert(langcx['wjs.DI']+sn+langcx['wjs.CHI']+langcx['wjs.OVER_MAX_BS']+":"+max_bs);
				return false;
			}
			$("#t_sel_"+sn).prop("checked", true);
			$("#t_input_"+sn).html(bsx);
			$("#t_amo_"+sn).html((amo).toFixed(4));
			$("#t_acm_"+sn).html((acm).toFixed(4));
			$("#t_nem_"+sn).html((nem).toFixed(4));
			$("#t_cwm_"+sn).html((cwm).toFixed(4));
			$("#t_pp_"+sn).html((pp).toFixed(2));
			period--;
			ts++;
		}
		else
			t_dis_tick(sn);
	});
	$("#lt_trace_count").html(ts);
	$("#lt_trace_hmoney").html(acm.toFixed(2));
}
function t_dis_all_tick()
{
	$("#t_add_tick_line").find(".chase_tr").each(function( index ) {
		var sn = $(this).attr('id').replace("t_add_tick_","");
		t_dis_tick(sn);
	});
	$("#input_tper").val(0);
	$("#lt_trace_count").html(0);
	$("#lt_trace_hmoney").html(0.00);
}
function t_dis_tick(sn)
{
	//$("#t_input_"+sn).attr('disabled', "disabled");
	$("#t_input_"+sn).html("0");
	$("#t_amo_"+sn).html("0.00");
	$("#t_acm_"+sn).html("0.00");
	$("#t_nem_"+sn).html("0.00");
	$("#t_cwm_"+sn).html("0.00");
	$("#t_pp_"+sn).html("0.00");
	$("#t_sel_"+sn).prop("checked", false);
}

function getPBS(atp,bsx,unit,obm,ratio,acm)
{
	var pp=0;
	while (pp<=atp){
		var t_acm=acm+(bsx*obm);
		var nem=bsx*unit*ratio;
		var cwm=nem-t_acm;
		pp = (cwm/t_acm)*100;
		if(pp<=atp)
			bsx++;
	}
	return bsx;
}
function getMBS(atm,bsx,unit,obm,ratio,acm)
{
	var pm=0;
	while (pm<=atm){
		var t_acm=acm+(bsx*obm);
		var nem=bsx*unit*ratio;
		var pm=nem-t_acm;
		if(pm<=atm)
			bsx++;
	}
	return bsx;
}
