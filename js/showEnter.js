var Ebet;
Ebet = new Ebet();
function Ebet()
{
	var targetDiv;
	var betObj = this;
	betObj.style = "";
	betObj.code;
	betObj.cname = "";
	betObj.pickFlag = false;
	betObj.pick = 0;
	betObj.btype = "";
	betObj.bets = 0;
	betObj.nums = "";
	betObj.money = 0;
	betObj.xmoney = 0;
	betObj.ratio = 0;
	betObj.water = 0;
	betObj.betary = [];
	betObj.repeat = [];
	betObj.posComs = 0;
	betObj.poset;
	betObj.anySetHtml;
	betObj.getPosName;
	this.init = function () 
	{
		betObj.pickFlag = false;
		betObj.bets = 0;
		betObj.money = 0;
		betObj.xmoney = 0;
		betObj.betary = [];
		betObj.repeat = [];
		betObj.ratio = 0;
		betObj.water = 0;
		betObj.posComs = 0;
		betObj.poset;
		$('#lt_sel_money').html("0.00");
		$('#lt_sel_bets').html(0);
		if($("#"+targetDiv).length>0)
		{
			$("#"+targetDiv).html("");
			$("#enterList").remove();
			setAnyPick();
			$("#"+targetDiv).append("<textarea id='enterList' class='enterList'></textarea>");
			$("#"+targetDiv).append("<div><ul class='btnChoose'></ul></div>");
			setEntFun();
			setEnter();
		}
		else
		{
			$(".tab_content").html("");
		}
	}
	
	var setEnter = function ()//設定輸入 
	{
		$( "#enterList" ).bind('input propertychange', function() {
			//var value = $("#enterList").val();
			//value = value.replace(/\D+/g, ',');
			checkEnter();
		});
	}
	this.clearSel = function () 
	{
		if($(".enterList").length>0)
		{
			$(".enterList").val("");
			checkEnter();
		}
	}
	this.setDiv = function (div) 
	{
		targetDiv = div;
	}
	this.set = function (pick,btype)
	{
		betObj.pick = pick;
		betObj.btype = btype;
		//betObj.cname = getCname(btype);
		//betObj.code = getCode(btype);
	}
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
	this.setAnySetFun = function (fun)
	{
		betObj.anySetHtml = fun;
	}
	this.setPosName = function (fun)
	{
		betObj.getPosName = fun;
	}
	this.getRowPick = function ()//
	{
		if(betObj.repeat.length>0)
		{
			showAlert(langcx['wjs.SYS_DEL_REPEAT_NUMBER']+":"+betObj.repeat.join("|")); //系统已过滤重复号码
		}
		var bet = new Object;
		var uname = $('.btnType .selected').attr('id');
		var unit = parseFloat($('.btnType .selected').attr('unit'));
		bet['code']=betObj.code;
		bet['cname']=betObj.cname;
		
		if (typeof betObj.poset != 'undefined')
			bet['pick']=betObj.betary.join("|")+"~"+betObj.poset;
		else
		bet['pick']=betObj.betary.join("|");
		bet['pickName']=betObj.betary.join("|");	
		bet['bets']=betObj.bets;
		bet['money']=betObj.money;
		bet['xmoney']=betObj.xmoney;
		bet['unit']=unit;
		bet['uname']=uname;
		bet['times']=$('#lt_sel_times').val();
		if(betObj.ratio == "0")
			betObj.ratio = parseFloat($("#ratioSel").val());
		bet['ratio']=betObj.ratio;
		if(betObj.water == "0")
			betObj.water = parseFloat($("#ratioSel").find(":selected").attr("water"));
		bet['water']=betObj.water;
		bet['poset']=betObj.getPosName(betObj.poset);
		return bet;
	}
	
	this.reset = function ()//重新設定畫面
	{
		betObj.init();
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
	var setEntFun = function ()//設定功能
	{
		var funNames = ["整理格式","導入文件"]; //整理格式,導入文件
		var funCodes = ["parse","file"];
		var fli = "";
		for(var f=0;f<funCodes.length;f++)
		{
			fli += "<li class='"+funCodes[f]+"'>"+funNames[f]+"</li>";
		}
		$(".btnChoose").append(fli);
		$(".btnChoose").find( "li" ).hover(
		  function() {
			if(!$( this ).hasClass("selected"))
			$( this ).addClass("hover");
		  }, function() {
			$( this ).removeClass("hover");
		  }
		);
		
		$(".btnChoose").find( "li" ).click(function() {
			var fun = $(this);
			var splitClassName = fun.attr('class').split(/\s+/);
			var selFun = splitClassName[0];
			betObj.funActive(selFun);
		});	
	}
	
	this.funActive = function (selFun)
	{
		switch(selFun)
		{
			case "parse":
				var betary = parserData();
				var betStr = betary.join("|");
				betStr = betStr.replace(/\,/g,"").replace(/\|/g," ");
				$("#enterList").val(betStr);
				if(betObj.repeat.length>0)
				{
					showAlert(langcx['wjs.REPEAT_NUMBER']+":"+betObj.repeat.join("|")); //重複號碼
				}
				betObj.repeat = [];	
				checkEnter();
				dialog.dialog("close");
				break;
			case "file":
				dialog.dialog( "open" );
				break;	
		}		
	}
	
	var parserData = function ()
	{
		betObj.repeat = [];
		var s = $("#enterList").val();
		var val = s.replace(/\D+/g, ',');
		var nary = val.split(",");
		var bet = new Object;
		var betary = [];
		for(var i=0;i<nary.length;i++)
		{
			var flag = false;
			if(nary[i].length == betObj.pick)
			{
				if(betObj.btype.indexOf("com")>-1)
				{
					var ny = nary[i].split("");
					ny.sort();
					var sy = ny.join(",");
					var cn = [];
					for(var n=0;n<ny.length;n++)
					{
						cn[ny[n]]=1
					}
					var nl = []
					for(var ck in cn){ 
						nl.push(ck);
					}
					if(betObj.btype.indexOf("com_3")>-1)
					{
						if(nl.length!=0 && nl.length==2)
							flag = true;
					}
					else if(betObj.btype.indexOf("com_6")>-1)
					{
						if(nl.length!=0 && nl.length==3)
							flag = true;
					}
					else if(nl.length!=0 && nl.length>1)
					{
						flag = true;	
					}
					
					if(flag)
					{
						if(bet[sy]==1)
							betObj.repeat.push(nary[i].split("").join(","));
						else
							bet[sy]=1;
					}	
				}
				else
				{
					if(bet[nary[i].split("").join(",")]==1)
						betObj.repeat.push(nary[i].split("").join(","));
					else
						bet[nary[i].split("").join(",")]=1	
				}
			}				
		}
		
		for(var key in bet){ 
			betary.push(key);
		}
		return betary;
	}
	var checkEnter = function ()
	{
		var betary = parserData();
		switch(betObj.btype)
		{
			case "any2_enter": 
			case "any2_com_enter":
			case "any3_com_mix":
			case "any3_enter":
			case "any3_com_3_enter":
			case "any3_com_6_enter":
			case "any4_enter":
				if(betary.length>0 && chkPickSet())
				{
					betObj.pickFlag = true;
					
				betObj.bets = betary.length*betObj.posComs;
				betObj.betary = betary;
				}
				else
				{
					betObj.bets = 0;
					betObj.betary = [];
					betObj.pickFlag = false;
				}
		
				break;
			default:
		if(betary.length>0)
					{
			betObj.pickFlag = true;
					}else{
			betObj.pickFlag= false;
					}
			
		betObj.bets = betary.length;
		betObj.betary = betary;
				break;	
		}
		comBetMoney();
	}
	
	var setAnyPick = function ()//任選位子
	{
		var pclass,posComs,posCount;
		betObj.poset=undefined;
		switch(betObj.btype)
		{
			case "any2_enter":
			case "any2_com_enter":
				pclass = "pos2input";
				posComs = "posComs2";
				posCount = "posCount2";
				betObj.pospick = 2;
				break;
				
			case "any3_com_mix":
			case "any3_enter":
			case "any3_com_3_enter":
			case "any3_com_6_enter":
				pclass = "pos3input";
				posComs = "posComs3";
				posCount = "posCount3";
				betObj.pospick = 3;
				break;
			
			case "any4_enter":
				pclass = "pos4input";
				posComs = "posComs4";
				posCount = "posCount4";
				betObj.pospick = 4;
				break;		
			default:
				return;
				break;		
		}	   
		$("#"+targetDiv).append("<div class=''><span class=''></span><ul class=''>"+betObj.anySetHtml(pclass,posCount,posComs)+"</ul>");		   
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
			var value = $("#enterList").val();
			value = value.replace(/\D+/g, ',');
			checkEnter(value);
		});
		$(".pos_clear").click(function(){
			$("."+pclass).prop('checked', false);
			$("#"+posCount).html(0);
			$("#"+posComs).html(0);
			betObj.posComs = 0;
			betObj.poset = "";
			var value = $("#enterList").val();
			value = value.replace(/\D+/g, ',');
			checkEnter(value);
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
			var value = $("#enterList").val();
			value = value.replace(/\D+/g, ',');
			checkEnter(value);
		});
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
			case "any3_com_3_enter":
			case "any3_com_6_enter":
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
				return;
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
	
}
function enter_play(ptype)
{
	$("#randomOne").hide();
	switch(ptype)
	{
		case "five_enter":
			Ebet.set(5,ptype);
			break;
			
		case "four_enter":
		case "any4_enter":
			Ebet.set(4,ptype);
			break;
		
		case "three_front_enter":
		case "three_front_com_3_enter":
		case "three_front_com_6_enter":
		case "three_front_com_mix":
		
		case "three_mid_enter":
		case "three_mid_com_3_enter":
		case "three_mid_com_6_enter":
		case "three_mid_com_mix":
		
		case "three_behind_enter":
		case "three_behind_com_3_enter":
		case "three_behind_com_6_enter":
		case "three_behind_com_mix":
		case "any3_enter":
		case "any3_com_3_enter":
		case "any3_com_6_enter":
		case "any3_com_mix":
			Ebet.set(3,ptype);
			break;
			
		case "two_front_enter":
		case "two_front_com_enter":
		case "two_behind_enter":
		case "two_behind_com_enter":
		case "any2_enter":
		case "any2_com_enter":
			Ebet.set(2,ptype);
			break;
		default:
			//obj.init();
			showAlert(langcx['wjs.NOT_FINISH']); //尚未完成
			break;		
	}			
	Ebet.reset();
}
