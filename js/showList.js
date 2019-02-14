var Blist;
$( document ).ready(function() {
	Blist = new Blist();
	Blist.init();
});
function Blist()
{
	var listObj = this;
	listObj.list = [];
	listObj.total_money = 0.00;
	listObj.base_money = 0.00;
	listObj.total_bets = 0;
	this.init = function ()
	{
		//$("#"+targetDiv).html("");
		listObj.list = [];
		$("#lt_bt_content").html("");
		//$("#lt_bt_content").append("<tr class='list_font'><td>"+"暫無投注項"+"</td></tr>"); //暫無投注項
		$("#lt_cf_count").html(listObj.list.length);
		$("#lt_cf_bets").html(listObj.total_bets);
		$("#lt_cf_money").html(listObj.total_money);
		countTatal();
		
	}
	this.add = function (bet)
	{
		if(listObj.list.length == 0)
			$("#lt_bt_content").html("");
		listObj.list.push(bet);
		var pickName;
		if(Bbet.style=="Bseo")
		{
			pickName = parserBseo(bet['pickName']);
		}
		else
			pickName = bet['pickName'];
		
		var shortPn = subpick(bet['pickName']);
 
		if (typeof bet['poset'] != 'undefined' && bet['poset'] != "")
		{
			pickName = pickName+"~"+bet['poset'];
			shortPn = shortPn+"~"+bet['poset'];
		}	
		var html = "<tr class='list_font' height='32'>"+
				   "<td>"+bet['cname']+"</td>"+
				   "<td valign='middle' title='"+pickName+"'>"+shortPn+"</td>"+
				   "<td align='center' valign='middle'>["+getUnitName(bet['uname'])+"]</td>"+
				   "<td align='center' valign='middle'>"+bet['bets']+""+"</td>"+ //注
				   "<td align='center' valign='middle'>"+bet['times']+""+"</td>"+ //倍
				   "<td align='center' valign='middle'>¥"+bet['xmoney']+"</td>"+
				   "<td class='list_cursor' onclick='delRowBet(this)' width='30' align='center' valign='middle'><img src='images/mmc_delete.png'></td>"+
				   "</tr>";
		$("#lt_bt_content").append(html);
		countTatal();
		//top.mm.resize($(document).height(),$(document).width());
	}
	var subpick = function (str)
	{
		if(str.length>30)
			return str.substring(0,30)+"...";
		else
			return str;
	}
	var parserBseo = function (str)
	{
		var bseo = [];
		bseo[1]="大"; //大
		bseo[2]="小"; //小
		bseo[3]="單"; //单
		bseo[4]="雙"; //双
		var nrow = [];
		var row = str.split("|");
		for(var i=0;i<row.length;i++)
		{
			var rowPick = row[i].split(",");
			var rp = [];
			for(var p=0;p<rowPick.length;p++)
			{
				var pn = bseo[rowPick[p]];
				rp.push(pn);
			}
			nrow.push(rp.join(","));
		}
		return nrow.join("|");
	}
	
	this.del = function (idx)
	{
		listObj.list.splice(idx,1);
		if(listObj.list.length==0)
			listObj.init();
		
		countTatal();
		//top.mm.resize($(document).height(),$(document).width());
	}
	var countTatal = function ()
	{
		listObj.total_money = 0;
		listObj.base_money = 0;
		listObj.total_bets = 0;
		for(var i=0;i<listObj.list.length;i++)
		{
			listObj.total_money = parseFloat(listObj.total_money)+parseFloat(listObj.list[i].xmoney);
			listObj.base_money = parseFloat(listObj.base_money)+parseFloat(listObj.list[i].money);
			listObj.total_bets += listObj.list[i].bets;
		}
		
		$("#lt_cf_count").html(listObj.list.length);
		$("#lt_cf_bets").html(listObj.total_bets);
		$("#lt_cf_money").html(listObj.total_money.toFixed(2));
	}
	var getUnitName = function (key)
	{
		var units = [];
		units['yuan']="元"; //元
		units['jiao']="角"; //角
		units['fen']="分"; //分
		return units[key];
	}
}
function delRowBet(obj)
{
	var tr = $(obj).parent("tr");
	var idx = $("#lt_bt_content").find("tr").index(tr);
	tr.remove();
	Blist.del(idx);
	if(Blist.list.length==0)
		dis_all_tick();
	else
		beginTimes();
	//showAlert(idx);
}
function conClearAll()
{
	if(confirm('確認清除?'))
	{
		clearAll();
	}
}
function clearAll()
{
	Blist.init();
	dis_all_tick();
	top.mm.resize($(document).height(),$(document).width());
}
function sendBet()
{
	var bets = [];
	var list = Blist.list;
	if(list.length==0)
	{
		showAlert("请先选择下注"); //请先选择下注
		return;
	}
	if(nowSn=="")
	{
		showAlert("暂无期数，请等待开盘"); //暂无期数，请等待开盘
		return;
	}
	var chase = getChase();
	var type = chase['type'];
	var betSns = chase['data'];
	if(betSns.length==0)
	{
		showAlert("期數錯誤!");
		return;
	}
	for(var i=0;i<betSns.length;i++)
	{
		if(betSns[i][1]==0 || betSns[i][1]=="" || isNaN(betSns[i][1]))
		{
			showAlert(langcx['wjs.PERIOD']+":"+betSns[i][0]+langcx['wjs.MULTIPLE_ERR']); //期數倍數錯誤
			return;
		}		
	}
	for(var i=0;i<list.length;i++)
	{
		var bet = [];
		bet.push(list[i].code);
		bet.push(list[i].ratio);
		bet.push(list[i].pick);
		bet.push(list[i].times);
		bet.push(list[i].bets);
		if(typeof list[i].unit != 'number' || list[i].unit<=0 || isNaN(list[i].unit))
		{
			showAlert(langcx['wjs.BETS_ERR']); //注单错误
			clearAll();
			return;
		}
		bet.push(list[i].unit);
		if (typeof list[i].poset != 'undefined' && list[i].poset != "")
		{
			var pary = list[i].pick.split("~");
			list[i].pickName = pary[0]+"~"+list[i].poset;
		}
		bet.push(list[i].pickName);
		bet.push(list[i].water);
		bets.push(bet);
	}
	 top.mm.sendBetData(type,betSns,bets);
	 dis_all_tick();
	 t_dis_all_tick();
}