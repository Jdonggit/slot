var Bbet;
Bbet = new Bbet();
function Bbet()
{
	var targetDiv;
	var betObj = this;
	betObj.numLen=1;
	betObj.style = "";
	betObj.code;
	betObj.cname = "";
	betObj.pickFlag = false;
	betObj.pickRow = 0;
	betObj.rowPick = [];
	betObj.rowName = [];
	betObj.pick = 0;
	betObj.bdiv;
	betObj.btype = "";
	betObj.minBall = 0;
	betObj.maxBall = 0;
	betObj.maxRsBall = 9;
	betObj.bets = 0;
	betObj.money = 0;
	betObj.xmoney = 0;
	betObj.ratio = 0;
	betObj.water = 0;
	betObj.posComs = 0;
	betObj.poset = "";
	betObj.Analye = true;
	betObj.bseoAry = [];
	betObj.funNames = [];
	betObj.anySetHtml;
	betObj.getBallTitle;
	betObj.getPosName;
	this.init = function () 
	{
		betObj.pickFlag = false;
		betObj.bets = 0;
		betObj.money = 0;
		betObj.xmoney = 0;
		betObj.posComs = 0;
		betObj.poset = "";
		//betObj.Analye = true;
		$('#lt_sel_money').html("0.00");
		$('#lt_sel_bets').html(0);
		if($("#"+targetDiv).length>0)
		{
			$("#"+targetDiv).html("");
			$("#"+targetDiv).append("<div class='ballDiv'></div>");
			betObj.bdiv = $("#"+targetDiv).find(".ballDiv");
		}
		else
		{
			$(".tab_content").html("");
		}
	}
	this.setDiv = function (div) 
	{
		targetDiv = div;
	}
	this.set = function (style,pick,minBall,maxBall,btype)
	{
		//betObj.init();
		betObj.style = style;
		betObj.pick = pick;
		betObj.minBall = minBall;
		betObj.maxBall = maxBall;
		betObj.btype = btype;
		//betObj.cname = getCname(btype);
		//betObj.code = getCode(btype);
		betObj.ratio = 0;
		betObj.water = 0;
		switch(betObj.style)
		{
			case "Any":
			case "Single":
				betObj.pickRow = 1;
				break;
			case "Set":
			case "Rep":
			case "Bseo":
			case "Com":
			case "Double":
			case "One":
				betObj.pickRow = betObj.pick;
				break;
			case "Anyset":
				betObj.pickRow = 5;
				break;
			default:
				break;
		}
	};
	this.setCname = function (cname)
	{
		betObj.cname = cname;
	}
	this.setCode = function (code)
	{
		betObj.code = code;
	}
	this.setRatio = function (ratio)
	{
		betObj.ratio = ratio;
	}
	this.setWater = function (water)
	{
		betObj.water = water;
	}
	this.setNumLen = function (len)
	{
		betObj.numLen = len;
	}
	this.setAnalye = function (val)
	{
		betObj.Analye = val;
	}
	
	this.getCode = function ()
	{
		return betObj.code;
	}
	this.setBseoAry = function (ary)
	{
		betObj.bseoAry = ary;
	}
	this.setFunNames = function (ary)
	{
		betObj.funNames = ary;
	}
	this.setAnySetFun = function (fun)
	{
		betObj.anySetHtml = fun;
	}
	this.setBallTitle = function (fun)
	{
		betObj.getBallTitle = fun;
	}
	this.setPosName = function (fun)
	{
		betObj.getPosName = fun;
	}
	this.getRowPick = function ()//
	{
		var bet = new Object;
		var row = [];
		var nrow = [];
		for(var i=0;i<betObj.rowPick.length;i++)
		{
			switch(betObj.btype)
			{
				case "three_front_sum":
				case "three_front_com_sum":
				case "three_front_bd":
				case "three_mid_sum":
				case "three_mid_com_sum":
				case "three_mid_bd":
				case "three_behind_sum":
				case "three_behind_com_sum":
				case "three_behind_bd":
				case "two_front_sum":
				case "two_behind_sum":
				case "two_front_com_sum":
				case "two_behind_com_sum":
				case "two_front_bd":
				case "two_behind_bd":
					row.push(betObj.rowPick[i].join(","));
					break;
				default:
					row.push(betObj.rowPick[i].join(","));
					break;	
			}
			if(betObj.style=="Bseo")
			{
				nrow.push(betObj.rowName[i].join(","));
			}
		}
		var uname = $('.btnType .selected').attr('id');
		var unit = parseFloat($('.btnType .selected').attr('unit'));
		bet['code']=betObj.code;
		bet['cname']=betObj.cname;
		
		if (typeof betObj.poset != 'undefined' && betObj.poset != "")
		{
			bet['pick']=row.join("|")+"~"+betObj.poset;
		}
		else
			bet['pick']=row.join("|");
			
		if(betObj.style=="Bseo")
			bet['pickName']=nrow.join("|");
		else
			bet['pickName']=row.join("|");	
		bet['bets']=betObj.bets;
		bet['money']=betObj.money;
		bet['xmoney']=betObj.xmoney;
		bet['unit']=unit;
		bet['uname']=uname;
		bet['times']=$('#lt_sel_times').val();
		bet['ratio']=betObj.ratio;
		bet['water']=betObj.water;
		bet['poset']=betObj.getPosName(betObj.poset);
		return bet;
	}
	
	this.reset = function ()//重新設定畫面
	{
		betObj.init();
		setPick();//設定球數
		setFast();//設定快速選擇
	}
	this.clearSel = function () 
	{
		betObj.bdiv.find( ".numList li" ).removeClass("selected");
		betObj.bdiv.find( ".btnList li" ).removeClass("selected");
		$('#lt_sel_money').html("0.00");
		$('#lt_sel_bets').html(0);
		checkPick();
	}
	var numpad = function (num, n)
	{
		var i = (''+num).length;
		while (i++ < n) num = '0' + num;
		return num;
	}
	var parserBseo = function (num)
	{
		return betObj.bseoAry[num];
	}
	
	this.comBetMoney = function ()
	{
		comBetMoney();
	}
	var comBetMoney = function ()
	{
		var unit = parseFloat($('.btnType .selected').attr('unit'));
		var lt_sel_times = $('#lt_sel_times').val();
		if(lt_sel_times=="")
		{
			lt_sel_times=0;
		}
		var times = parseFloat(lt_sel_times);
		betObj.money = (betObj.bets*unit).toFixed(2);
		betObj.xmoney = (betObj.bets*unit*times).toFixed(2);
		$('#lt_sel_money').html(betObj.xmoney);
		$('#lt_sel_bets').html(betObj.bets);
		//betObj.cdiv.html("你選擇了"+betObj.bets+"注");
	}
	var setFast = function ()
	{
		switch(betObj.btype)//設定快速按鈕
		{
			case "three_front_sum":
			case "three_front_com_sum":
			case "three_front_bd":
			case "three_mid_sum":
			case "three_mid_com_sum":
			case "three_mid_bd":
			case "three_behind_sum":
			case "three_behind_com_sum":
			case "three_behind_bd":
			case "two_front_sum":
			case "two_behind_sum":
			case "two_front_com_sum":
			case "two_behind_com_sum":
			case "two_front_bd":
			case "two_behind_bd":
			case "three_front_bseo":
			case "three_behind_bseo":
			case "two_front_bseo":
			case "two_behind_bseo":
			case "any2_sum":
			case "any2_com_sum":
			case "any3_sum":
			case "any3_com_sum":
			
				break;
			default:
				setSelFun();
				break;	
		}
	}
	var setPick = function ()//設定球數 
	{
		var btitle = betObj.getBallTitle(betObj.btype);
		setAnyPick();
		for(var p=0;p<betObj.pickRow;p++)
		{
			var bli = "";
			for(var b=betObj.minBall;b<=betObj.maxBall;b++)
			{
				b = numpad(b,betObj.numLen);
				if(betObj.style=="Bseo")
				{
					var bseo = parserBseo(b);
					bli += "<li><b>"+bseo+"</b><span class='rate'></span></li>";
				}
				else
				{
					if(betObj.maxRsBall!=betObj.maxBall || !betObj.Analye)
					{
						bli += "<li><b>"+b+"</b><span class='rate'></span></li>";
					}
					else
					{
						var set = getBallSet(p);
						var ana;
						if(set == "all")
							ana = "ana_"+b;
						else
							ana = "ana_"+set+"_"+b;
						bli += "<li><b>"+b+"</b><span class='rate "+ana+"'>0</span></li>";
					}
				}
			}
			betObj.bdiv.append("<div class='numbers'><span class='name radius'>"+btitle[p]+"</span><ul class='numList width70'>"+bli+"</ul><ul class='btnList'></ul>");
			
		}
		betObj.bdiv.find( ".numList li" ).hover(
			function() {
				if(!$( this ).hasClass("selected"))
					$( this ).addClass("hover");
			}, function() {
				$( this ).removeClass("hover");
				}
		);
		
		betObj.bdiv.find( ".numList li" ).click(function() {
			if(!$(this).hasClass("selected"))
			{
				var num = $(this).find("b").html();
				/*
				if(betObj.style == "Double")
					checkNonRep(num);//複數行不重複
				else */if(betObj.style == "Single")
					checkSingle();//單行不重複
			}
			$(this).toggleClass("selected");
			checkPick();
		});
	};
	
	var getBallSet = function (p)
	{
		var set;
		switch(betObj.btype)
		{
			case "five_set":
			case "five_coms":
			case "three_front_set":
			case "three_front_coms":
			case "two_front_set":
			case "one_set":
			case "any2_set":
			case "any3_set":
			case "any4_set":
				set=p;
				break;
			case "four_set":
			case "four_coms":
			case "three_mid_set":
			case "three_mid_coms":
				set=p+1;
				break;
			case "three_behind_set":
			case "three_behind_coms":
				set=p+2;
				break;
			case "two_behind_set":
				set=p+3;
				break;	
			default:
				return "all";
				break;		
		}
		return set;	
	}
	
	var checkPick = function ()
	{
		switch(betObj.style)
		{
			
			case "Any":
			case "Single":
				checkPickAny();
				break;
			case "Set":
				checkPickSet();
				break;
			case "Rep":
			case "Com":
				checkPickRep();
				break;
			case "Double":
				checkPickDouble();
				break;
			case "One":
				checkPickOne();
				break;
			case "Bseo":
				checkPickBseo();
				break;	
			case "Anyset":
				checkPickAnyset();
				break;	
			default:
				break;
		}
	}
	
	//單行複選組合(不重複號碼)
	//---------------------------------------------------------------------------------------------------------------
	var checkPickAny = function ()
	{
		betObj.rowPick = [];
		var sball = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			//sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			if(sball.length)betObj.rowPick.push(sball);
		});
		if(sball.length>=betObj.pick && chkPickSet())
		{
			perCombAny();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var perCombAny = function ()
	{
		//用以存放結果的陣列
		//var resultComb = [];
		var resultPick = betObj.rowPick[0];
		var results = getComFun(resultPick,betObj.pick);
		
		var rsLength = 0;
		switch(betObj.btype)
		{
			case "three_front_com_3":
			case "three_mid_com_3":
			case "three_behind_com_3":
				rsLength = results.length*betObj.pick;
				break;
			case "three_front_sum":
			case "three_mid_sum":
			case "three_behind_sum":
				rsLength = three_sum_len(results);
				break;
			case "three_front_com_sum":
			case "three_mid_com_sum":
			case "three_behind_com_sum":
				rsLength = three_com_sum_len(results);
				break;	
			case "three_front_across":
			case "three_mid_across":
			case "three_behind_across":
				rsLength = three_across_len(results);
				break;
			case "three_front_bd":
			case "three_mid_bd":
			case "three_behind_bd":
				rsLength = results.length*54;
				break;
			case "two_front_sum":
			case "two_behind_sum":
				rsLength = two_sum_len(results);
				break;
			case "two_front_across":
			case "two_behind_across":
				rsLength = two_across_len(results);
				break;
			case "two_front_com_sum":
			case "two_behind_com_sum":
				rsLength = two_com_sum_len(results);
				break;
			case "two_front_bd":
			case "two_behind_bd":
				rsLength = results.length*9;
				break;
			case "any2_com":
			case "any3_com_6":
			case "any4_com_24":
			case "any4_com_6":
				rsLength = results.length*betObj.posComs;
				break;
			case "any2_sum":
				rsLength = two_sum_len(results)*betObj.posComs;
				break;
			case "any2_com_sum":
				rsLength = two_com_sum_len(results)*betObj.posComs;
				break;
				
			case "any3_sum":
				rsLength = three_sum_len(results)*betObj.posComs;
				break;
			case "any3_com_3":
				rsLength = results.length*betObj.pick*betObj.posComs;
				break;	
			case "any3_com_sum":
				rsLength = three_com_sum_len(results)*betObj.posComs;
				break;	
			
			default:
				rsLength = results.length;
				break;
		}
		betObj.bets = rsLength;
		comBetMoney();
		//betObj.cdiv.html("你選擇了"+rsLength+"注");
	}
	
	var three_sum_len = function (results)
	{
		var len = [];
		
		len[0]=1;
		len[1]=3;
		len[2]=6;
		len[3]=10;
		len[4]=15;
		len[5]=21;
		len[6]=28;
		len[7]=36;
		len[8]=45;
		len[9]=55;
		len[10]=63;
		len[11]=69;
		len[12]=73;
		len[13]=75;
		len[14]=75;
		len[15]=73;
		len[16]=69;
		len[17]=63;
		len[18]=55;
		len[19]=45;
		len[20]=36;
		len[21]=28;
		len[22]=21;
		len[23]=15;
		len[24]=10;
		len[25]=6;
		len[26]=3;
		len[27]=1;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	
	var three_com_sum_len = function (results)
	{
		var len = [];
		
		len[0]=0;
		len[1]=1;
		len[2]=2;
		len[3]=2;
		len[4]=4;
		len[5]=5;
		len[6]=6;
		len[7]=8;
		len[8]=10;
		len[9]=11;
		len[10]=13;
		len[11]=14;
		len[12]=14;
		len[13]=15;
		len[14]=15;
		len[15]=14;
		len[16]=14;
		len[17]=13;
		len[18]=11;
		len[19]=10;
		len[20]=8;
		len[21]=6;
		len[22]=5;
		len[23]=4;
		len[24]=2;
		len[25]=2;
		len[26]=1;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	
	var three_across_len = function (results)
	{
		var len = [];
		
		len[0]=10;len[1]=54;len[2]=96;len[3]=126;len[4]=144;
		len[5]=150;len[6]=144;len[7]=126;len[8]=96;len[9]=54;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	var two_sum_len = function (results)
	{
		var len = [];
		
		len[0]=1;
		len[1]=2;
		len[2]=3;
		len[3]=4;
		len[4]=5;
		len[5]=6;
		len[6]=7;
		len[7]=8;
		len[8]=9;
		len[9]=10;
		len[10]=9;
		len[11]=8;
		len[12]=7;
		len[13]=6;
		len[14]=5;
		len[15]=4;
		len[16]=3;
		len[17]=2;
		len[18]=1;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	var two_across_len = function (results)
	{
		var len = [];
		
		len[0]=10;
		len[1]=18;
		len[2]=16;
		len[3]=14;
		len[4]=12;
		len[5]=10;
		len[6]=8;
		len[7]=6;
		len[8]=4;
		len[9]=2;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	
	var two_com_sum_len = function (results)
	{
		var len = [];
		
		len[0]=0;
		len[1]=1;
		len[2]=1;
		len[3]=2;
		len[4]=2;
		len[5]=3;
		len[6]=3;
		len[7]=4;
		len[8]=4;
		len[9]=5;
		len[10]=4;
		len[11]=4;
		len[12]=3;
		len[13]=3;
		len[14]=2;
		len[15]=2;
		len[16]=1;
		len[17]=1;
		
		var sum = 0;
		for(var r=0;r<results.length;r++)
		{
			sum += len[results[r]];
		}
		return sum;
	}
	
	//多行複選(不重複號碼)
	//---------------------------------------------------------------------------------------------------------------
	var checkPickSet = function ()
	{
		betObj.rowPick = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			if(sball.length)betObj.rowPick.push(sball);
		});
		if(betObj.rowPick.length==betObj.pickRow)
		{
			perCombSet();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var perCombSet = function ()
	{
		//用以存放結果的陣列
		var resultComb = [];
		var results = [];
		
		var explore = function (arr, idx, prefix, undef) {
			var f = arr[idx++];
			return f==undef?prefix : $.map(f, function(v){
			return explore(arr, idx,prefix+','+v);
			});
		}
		resultComb = explore(betObj.rowPick,0,'');
		
		for (var i in resultComb) {
			var rs = resultComb[i].split(",");
			var flag = true;
			for (var j=0;j<rs.length;j++) {
				for(var k=j+1;k<rs.length;k++)
					if(rs[j]==rs[k])flag = false;
			}
			if(flag)results.push(resultComb[i]);
		}
		betObj.bets = results.length;
		comBetMoney();
	}
	
	//多行複選(可重複號碼)
	//---------------------------------------------------------------------------------------------------------------
	var checkPickRep = function ()
	{
		betObj.rowPick = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			if(sball.length)betObj.rowPick.push(sball);
		});
		if(betObj.rowPick.length==betObj.pickRow)
		{
			perCombRep();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var checkPickBseo = function ()
	{
		betObj.rowPick = [];
		betObj.rowName = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			var sname = [];
			$(this).find("li").each(function( bidx ) {
				if($(this).hasClass("selected"))
				{
					sball.push(bidx+1);
					sname.push($(this).find("b").html());
				}
			});
			if(sball.length)
			{
				betObj.rowPick.push(sball);
				betObj.rowName.push(sname);
			}	
		});
		if(betObj.rowPick.length==betObj.pickRow)
		{
			perCombRep();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var perCombRep = function ()
	{
		//用以存放結果的陣列
		var resultComb = [];
		var results = [];
		
		var explore = function (arr, idx, prefix, undef) {
			var f = arr[idx++];
			return f==undef?prefix : $.map(f, function(v){
			return explore(arr, idx,prefix+','+v);
			});
		}
		resultComb = explore(betObj.rowPick,0,'');
		if(betObj.style=="Com")
		{
			betObj.bets = resultComb.length*betObj.pick;
			comBetMoney();
		}
		else
		{
			betObj.bets = resultComb.length;
			comBetMoney();
		}
	}
	
	//組選(重號)
	//---------------------------------------------------------------------------------------------------------------
	var checkPickDouble = function ()
	{
		betObj.rowPick = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			if(sball.length)betObj.rowPick.push(sball);
		});
		if(betObj.rowPick.length==betObj.pickRow)
		{
			var rowBall1=0,rowBall2=0,double1=1,double2=1;
			switch(betObj.btype)
			{
				case "five_com_60":
					rowBall1 = 1;
					double1=2;
					rowBall2 = 3;
					double2=1;
					break;
				case "five_com_30":
					rowBall1 = 2;
					double1=2;
					rowBall2 = 1;
					double2=1;
					break;
				case "five_com_20":
					rowBall1 = 1;
					double1=3;
					rowBall2 = 2;
					double2=1;
					break;
				case "five_com_10":
					rowBall1 = 1;
					double1=3;
					rowBall2 = 1;
					double2=2;
					break;
				case "five_com_5":
					rowBall1 = 1;
					double1=4;
					rowBall2 = 1;
					double2=1;
					break;
				case "four_com_12":
				case "any4_com_12":
					rowBall1 = 1;
					double1=2;
					rowBall2 = 2;
					double2=1;
					break;
				case "four_com_4":
				case "any4_com_4":
					rowBall1 = 1;
					double1=3;
					rowBall2 = 1;
					double2=1;
					break;	
				default:
					break;
			}
			if(betObj.rowPick[0].length>=rowBall1 && betObj.rowPick[1].length>=rowBall2 && chkPickSet())
			{
				perCombDouble(rowBall1,rowBall2,double1,double2);
				betObj.pickFlag = true;
			}
			else
			{
				betObj.bets = 0;
				comBetMoney();
				betObj.pickFlag = false;
			}	
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	
	var perCombDouble = function (rowBall1,rowBall2,double1,double2)
	{
		//用以存放結果的陣列
		var resultComb = [];
		var rp_1 = betObj.rowPick[0];
		var rp_2 = betObj.rowPick[1];
		
		var comRs_1 = getComFun(rp_1,rowBall1);
		var comRs_2 = getComFun(rp_2,rowBall2);
		
		for(var i=0;i<comRs_1.length;i++)
		{
			for(var j=0;j<comRs_2.length;j++)
			{
				if(comRs_2[j].indexOf(comRs_1[i])>=0 || comRs_1[i].indexOf(comRs_2[j])>=0)continue;
				var tNum = comRs_1[i]+comRs_2[j];
				var tnAry = tNum.split("");
				tnAry.sort();
				var comAry = tNum.split("");;
				comAry.sort();
				for(var t=0;t<tnAry.length;t++)
				{
					for(var r1=0;r1<comRs_1.length;r1++)
					{
						if(tnAry[t]==comRs_1[r1])
						{
							for(var d=1;d<double1;d++)
								comAry.push(tnAry[t]);
						}
					}
					
					for(var r2=0;r2<comRs_2.length;r2++)
					{
						if(tnAry[t]==comRs_2[r1])
						{
							for(var d=1;d<double2;d++)
								comAry.push(tnAry[t]);
						}
					}
				}
				comAry.sort();
				resultComb.push(comAry.join(""));
			}
		}
		switch(betObj.btype)
		{
			case "any4_com_12":
			case "any4_com_4":
				betObj.bets = resultComb.length*betObj.posComs;
				break;
			default:
		betObj.bets = resultComb.length;
				break;	
		}		
		comBetMoney();
	}
	
	//一星(定位膽)
	//---------------------------------------------------------------------------------------------------------------
	var checkPickOne = function ()
	{
		betObj.poset = "";
		betObj.rowPick = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			if(sball.length)
			{
				betObj.rowPick.push(sball);
				var si = lidx+1;
				betObj.poset = betObj.poset+""+si;
			}
		});
		
		if(betObj.rowPick.length>0)
		{
			perCombOne();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var perCombOne = function ()
	{
		//用以存放結果的陣列
		var resultComb = [];
		var results = [];
		
		var rsLength = 0;
		for(var r=0;r<betObj.rowPick.length;r++)
		{
			var row = betObj.rowPick[r];
			for(var i=0;i<row.length;i++)
			{
				rsLength++;
			}
		}
		betObj.bets = rsLength;
		comBetMoney();
	}
	//
	//
	
	var checkPickAnyset = function ()
	{
		betObj.poset = "";
		betObj.rowPick = [];
		betObj.bdiv.find(".numList").each(function( lidx ) {
			var sball = [];
			if($(this).find(".selected").length)
			{
				$(this).find(".selected").each(function( bidx ) {
					sball.push($(this).find("b").html());
				});
			}
			
			if(sball.length)
			{
				betObj.rowPick.push(sball);
				var si = lidx+1;
				betObj.poset = betObj.poset+""+si;
			}
		});
		if(betObj.rowPick.length>=betObj.pick)
		{
			perCombAnyset();
			betObj.pickFlag = true;
		}
		else
		{
			betObj.bets = 0;
			comBetMoney();
			betObj.pickFlag = false;
		}
	}
	var perCombAnyset = function ()
	{
		var explore = function (arr, idx, prefix, undef) {
			var f = arr[idx++];
			return f==undef?prefix : $.map(f, function(v){
			return explore(arr, idx,prefix+','+v);
			});
		}
		
		var prow = [];
		for(var r=0;r<betObj.rowPick.length;r++)
			prow.push(r);
		var rowrs = getComFun(prow,betObj.pick);
		
		var rl = 0;
		for(var i=0;i<rowrs.length;i++)
		{
			var ary = rowrs[i].split("");
			var rowAry = [];
			for(var j=0;j<ary.length;j++)
			{
				rowAry.push(betObj.rowPick[ary[j]]);
			}
			var rc = explore(rowAry,0,'');
			rl += rc.length;
		}
		betObj.bets = rl;
		comBetMoney();
	}
	
	var getComFun = function (resultPick,spick)
	{
		var results = [];
		var len=resultPick.length;
		//从数组myarr(n)中任选m个元素的所有组合(m>=1 && m<=n)。 
		var getComb = function (myarr,n,m,rs)   
		{    
		 if(rs==null)    
		  rs = new Array();    
		 for(var i=n;i>=m;i--)
		 {    
		  rs[m-1]=myarr[i-1];      //取出第n个元素作为组合的第一个元素    
		  if(m>1)    
		   getComb(myarr,i-1,m-1,rs);  //递归，在n-1个元素中取m-1个元素,直到取出最后一个元素    
		  var comb = rs.join("");     //获得一个组合    
			if(!checkExist(results,comb))
			{ 
				results.push(comb);
			}	
		 }    
		}  
		
		//查找某元素是否存在数组中,存在返回true,不存在返回false
		var checkExist = function (myarr,e)    
		{    
		 for(var i=0;i<myarr.length;i++)    
		  if(e==myarr[i]) return true;    
		 return false;    
		}  
		getComb(resultPick,len,spick);
		return results;
		//betObj.cdiv.html("你選擇了"+results.length+"注");
	}
	var setSelFun = function ()//設定選擇方式
	{
		var funCodes = ["fun_all", "fun_big", "fun_small", "fun_odd", "fun_even", "fun_clear"];
		//$(".p-s-num").append("<div class='f-s-sel'></div>");
		var fli = "";
		for(var f=0;f<funCodes.length;f++)
		{
			fli += "<li class='"+funCodes[f]+"'>"+betObj.funNames[f]+"</li>";
		}
		$(".btnList").append(fli);
		
		$(".btnList").find( "li" ).hover(
		  function() {
			if(!$( this ).hasClass("selected"))
			$( this ).addClass("hover");
		  }, function() {
			$( this ).removeClass("hover");
		  }
		);
		
		$(".btnList").find( "li" ).click(function() {
			var fun = $(this);
			var splitClassName = fun.attr('class').split(/\s+/);
			var selFun = splitClassName[0];
			fun.toggleClass("selected");
			var hasOn = fun.hasClass( "selected" );
			var selClass = fun.attr('class');
			fun.parent().find("li").each(function( index ) {
				var className = $(this).attr('class');
				if(className != selClass)
				$( this ).removeClass("selected");
			});
			var liObj = fun.parents(".numbers").find(".numList");
			if(liObj.length)
			{
				liObj.find( "li" ).each(function( index ) {
					$(this).removeClass("selected");
					var num = $(this).find("b").html();
					var flag = checkSelBall(num,selFun);
					if(flag)
					{
						if(hasOn)
						{
							//if(betObj.style == "Double")
							//checkNonRep(num);
							$(this).addClass("selected");
						}
						else
						$(this).removeClass("selected");
					}
				});
			}
			checkPick();
		});
		var checkSelBall = function (num,selFun)//檢查選擇球號
		{
			switch(selFun)
			{
				case "fun_all":
					return true;
					break;
				case "fun_big":
					var mid = betObj.maxBall/2;
					if(parseInt(num)>mid)
						return true;
					else
						return false;
				case "fun_small":
					var mid = betObj.maxBall/2;
					if(parseInt(num)<mid)
						return true;
					else
						return false;
				case "fun_odd":
					if (parseInt(num)%2==1)
						return true;
					else
						return false;
				case "fun_even":
					if (parseInt(num)%2==0)
						return true;
					else
						return false;	
				default:
					return false;
			}
		}
	}
	
	this.randomOne = function(rows,repeat,set)
	{
		betObj.bdiv.find(".numList").each(function( ulidx ) {
			$(this).find( "li" ).each(function( idx ) {
				$(this).removeClass("selected");
			});
		});
		var sets;
		if(typeof set != 'undefined')
		{
			sets=set.split("_");
		}
		var uls = betObj.bdiv.find(".numList").length;
		var rr = [];
		if(uls != rows)
		{
			var i = 0;
			while (i <rows) {
				rn = randomNum(0,uls-1);
				if(typeof rr[rn] == 'undefined')
				{
					rr[rn] = 1;
					i++;
				}
			}
		}
		else 
		{
			for(var rn=0;rn<rows;rn++)
			{
				rr[rn] = 1;
			}
		}
		betObj.bdiv.find(".numList").each(function( ulidx ) {
			if(typeof rr[ulidx] != 'undefined')
			{
				var bl = $(this).find( "li" ).length;
				var b = 0;
				//var rb = [];
				rr[ulidx]=[];
				//while (b <pick) {
				while (b < parseInt(sets[ulidx])) {
					rnb = randomNum(0,bl-1);
					//if(typeof rb[rnb] == 'undefined')
					if(typeof rr[ulidx][rnb] == 'undefined')
					{
						//rb[rnb] = 1;
						if(!repeat)
						{
							var chkr = false;
							for(var l in rr)
							{
								for(var cb in rr[l])
								{
									if(rr[l][cb]==rnb)
										chkr = true;
								}
							}
							if(!chkr)
							{
								rr[ulidx][rnb]=rnb;
								b++;
							}
						}
						else
						{
							rr[ulidx][rnb]=rnb;
							b++;
						}
					}
				}
				$(this).find( "li" ).each(function( idx ) {
					if(typeof rr[ulidx][idx] != 'undefined')
					{
						$(this).addClass("selected");
					}
				});
			}
		});
		checkPick();
	}
	var randomNum = function(min,max)//檢查選擇球號
	{
		return Math.round(Math.random()*(max-min)+min);
	}
	
	var setAnyPick = function ()//任選位子
	{
		var pclass,posComs,posCount;
		switch(betObj.btype)
		{
			case "any2_enter":
			case "any2_sum":
			case "any2_com":
			case "any2_com_enter":
			case "any2_com_sum":
				pclass = "pos2input";
				posComs = "posComs2";
				posCount = "posCount2";
				betObj.pospick = 2;
				break;
				
			case "any3_enter":
			case "any3_sum":
			case "any3_com_3":
			case "any3_com_6":
			case "any3_com_mix":
			case "any3_com_sum":
				pclass = "pos3input";
				posComs = "posComs3";
				posCount = "posCount3";
				betObj.pospick = 3;
				break;
			
			case "any4_enter":
			case "any4_com_24":
			case "any4_com_12":
			case "any4_com_6":
			case "any4_com_4":
				pclass = "pos4input";
				posComs = "posComs4";
				posCount = "posCount4";
				betObj.pospick = 4;
				break;		
			default:
				return;
				break;		
		}
		
		betObj.bdiv.append("<div class=''><span class=''></span><ul class=''>"+betObj.anySetHtml(pclass,posCount,posComs)+"</ul>");
		$(".pos_all").click(function(){
			$("."+pclass).prop('checked', true);
			$("#"+posCount).html($("."+pclass+":checked").length);
			var pos = [];
			$("."+pclass+":checked").each(function( idx ) {
				pos.push($(this).val());
			});
			var rs = getComFun(pos,betObj.pospick);
			$("#"+posComs).html(rs.length);
			betObj.posComs = rs.length;
			betObj.poset = pos.join("");
			checkPick();
		});
		$(".pos_clear").click(function(){
			$("."+pclass).prop('checked', false);
			$("#"+posCount).html(0);
			$("#"+posComs).html(0);
			betObj.posComs = 0;
			betObj.poset = "";
			checkPick();
		});
		$("."+pclass).click(function() {
			$("#"+posCount).html($("."+pclass+":checked").length);
			var pos = [];
			$("."+pclass+":checked").each(function( idx ) {
				pos.push($(this).val());
			});
			if(pos.length >= betObj.pospick)
			{
				var rs = getComFun(pos,betObj.pospick);
				$("#"+posComs).html(rs.length);
				betObj.posComs = rs.length;
				betObj.poset = pos.join("");
			}
			else
			{
				$("#"+posComs).html(0);
				betObj.posComs = 0;
				betObj.poset = "";
			}
			checkPick();
		});
	}
	
	var chkPickSet = function ()
	{
		var pclass;
		switch(betObj.btype)
		{
			case "any2_enter":
			case "any2_sum":
			case "any2_com":
			case "any2_com_enter":
			case "any2_com_sum":
				pclass = "pos2input";
				break;
				
			case "any3_enter":
			case "any3_sum":
			case "any3_com_3":
			case "any3_com_6":
			case "any3_com_mix":
			case "any3_com_sum":
				pclass = "pos3input";
				break;
			
			case "any4_enter":
			case "any4_com_24":
			case "any4_com_12":
			case "any4_com_6":
			case "any4_com_4":
				pclass = "pos4input";
				break;		
			default:
				return true;
				break;		
		}
		if($("."+pclass).length>0)
		{
			if($("."+pclass+":checked").length>=betObj.pospick)
			{
				return true;
			}
			else
				return false
		}
		else
			return true;
	}
	
	var checkNonRep = function (sel_num)//多行號碼不重複
	{
		//p-s-num
		$(".numList").each(function( ulidx ) {
			$(this).find( "li" ).each(function( idx ) {
				var num = $(this).find("b").html();
				if(num == sel_num)
				{
					$(this).removeClass("selected");
				}
			});
		});
	}
	
	var checkSingle = function ()
	{
		$(".numList").each(function( ulidx ) {
			$(this).find( "li" ).each(function( idx ) {
				$(this).removeClass("selected");
			});
		});
	}
}

function ball_play(ptype)
{
	$("#randomOne").hide();
	switch(ptype)
	{
		case "five_set":
				Bbet.set("Rep",5,0,9,ptype);
				break;		
		case "five_coms":
				Bbet.set("Com",5,0,9,ptype);
				break;		
		case "five_com_120":
				Bbet.set("Any",5,0,9,ptype);
				break;
		case "five_com_60":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "five_com_30":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "five_com_20":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "five_com_10":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "five_com_5":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "five_sp_1":
		case "five_sp_2":
		case "five_sp_3":
		case "five_sp_4":
				Bbet.set("Any",1,0,9,ptype);
				break;
				
		case "four":		
		case "four_set":
				Bbet.set("Rep",4,0,9,ptype);
				break;
		case "four_coms":
				Bbet.set("Com",4,0,9,ptype);
				break;
		case "any4_com_24":
		case "four_com_24":
				Bbet.set("Any",4,0,9,ptype);
				break;
		case "any4_com_12":		
		case "four_com_12":
				Bbet.set("Double",2,0,9,ptype);
				break;
		case "any4_com_6":		
		case "four_com_6":
				Bbet.set("Any",2,0,9,ptype);
				break;
		case "any4_com_4":
		case "four_com_4":
				Bbet.set("Double",2,0,9,ptype);
				break;
		
		case "three_front":
		case "three_front_set":
		case "three_mid":
		case "three_mid_set":
		case "three_behind":
		case "three_behind_set":
				Bbet.set("Rep",3,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(3,true,'1_1_1');");
				break;
		case "three_front_coms":
		case "three_mid_coms":
		case "three_behind_coms":
				Bbet.set("Com",3,0,9,ptype);
				Bbet.setAnalye(true);
				break;
		case "three_front_sum":
		case "three_mid_sum":
		case "three_behind_sum":
		case "any3_sum":
				Bbet.set("Any",1,0,27,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;		
		case "three_front_across":
		case "three_mid_across":
		case "three_behind_across":
				Bbet.set("Any",1,0,9,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "any3_com_3":
		case "three_front_com_3":
		case "three_mid_com_3":
		case "three_behind_com_3":
				Bbet.set("Any",2,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'2');");
				break;
		case "any3_com_6":		
		case "three_front_com_6":
		case "three_mid_com_6":
		case "three_behind_com_6":
				Bbet.set("Any",3,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'3');");
				break;		
		case "any3_com_sum":		
		case "three_front_com_sum":
		case "three_mid_com_sum":
		case "three_behind_com_sum":
				Bbet.set("Any",1,1,26,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "three_front_bd":
		case "three_mid_bd":
		case "three_behind_bd":
				Bbet.set("Single",1,0,9,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "three_front_sum_wei":
		case "three_mid_sum_wei":
		case "three_behind_sum_wei":
				Bbet.set("Any",1,0,9,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		
		case "two_front":
		case "two_front_set":
		case "two_behind":
		case "two_behind_set":
				Bbet.set("Rep",2,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(2,true,'1_1');");
				break;
		case "two_front_sum":
		case "two_behind_sum":
		case "any2_sum":
				Bbet.set("Any",1,0,18,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "two_front_across":
		case "two_behind_across":
				Bbet.set("Any",1,0,9,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "two_front_com":
		case "two_behind_com":
		case "any2_com":
				Bbet.set("Any",2,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'2');");
				break;
		case "two_front_com_sum":
		case "two_behind_com_sum":
		case "any2_com_sum":
				Bbet.set("Any",1,1,17,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "two_front_bd":		
		case "two_behind_bd":
				Bbet.set("Single",1,0,9,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
				
		case "one":				
		case "one_set":
				Bbet.set("One",5,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1_1_1_1_1');");
				break;
				
		case "three_front_1":
		case "three_behind_1":
				Bbet.set("Any",1,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'1');");
				break;
		case "three_front_2":
		case "three_behind_2":
				Bbet.set("Any",2,0,9,ptype);
				Bbet.setAnalye(true);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(1,false,'2');");
				break;
		case "four_1":
				Bbet.set("Any",1,0,9,ptype);
				break;
		case "four_2":
				Bbet.set("Any",2,0,9,ptype);		
				break;
		case "five_2":
				Bbet.set("Any",2,0,9,ptype);
				break;
		case "five_3":
				Bbet.set("Any",3,0,9,ptype);
				break;
		case "three_front_bseo":
				Bbet.set("Bseo",3,1,4,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(3,true,'1_1_1');");
				break;
		case "three_behind_bseo":
				Bbet.set("Bseo",3,1,4,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(3,true,'1_1_1');");
				break;
		case "two_front_bseo":
				Bbet.set("Bseo",2,1,4,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(2,true,'1_1');");
				break;
		case "two_behind_bseo":
				Bbet.set("Bseo",2,1,4,ptype);
				Bbet.setAnalye(false);
				$("#randomOne").show();	
				$("#randomOne").attr("onclick","Bbet.randomOne(2,true,'1_1');");
				break;			
		
		case "any2_set":
				Bbet.set("Anyset",2,0,9,ptype);
				break;
				
		case "any3_set":
				Bbet.set("Anyset",3,0,9,ptype);
				break;	
		
		case "any4_set":
				Bbet.set("Anyset",4,0,9,ptype);
				break;	
		default:
				//obj.init();
				showAlert(langcx['wjs.NOT_FINISH']); //尚未完成
				break;
	}
	Bbet.reset();
}
