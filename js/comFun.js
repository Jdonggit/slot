var BetType = "";
var bseoAry = ["","大","小","單","雙"]; //大,小,单,双
var funNames = ["全","大","小","奇","偶","清"]; //全,大,小,奇,偶,清
var posetName = function (poset)
{
	if(!poset)return '';
	var pary = poset.split("");
	var pname = [];
	for(var i=0;i<pary.length;i++)
	{
		if(pary[i]=="1")
		{pname.push("万");} //万
		if(pary[i]=="2")
		{pname.push("仟");} //仟
		if(pary[i]=="3")
		{pname.push("百");} //百
		if(pary[i]=="4")
		{pname.push("十");} //十
		if(pary[i]=="5")
		{pname.push("个");} //个
	}
	return pname.join("");
}
var getBallTitle = function (type)//设定选择方式
{
		var bTitles = [];
		switch(type)
		{
			/*
			case "five_set":
			case "five_coms":


			case "five_com_120":	bTitles = ["组选120"];	break;
			case "four_com_12":
			case "five_com_30":
			case "five_com_60":		bTitles = ["二重号", "单号"];	break;
			case "four_com_4":
			case "five_com_20":		bTitles = ["三重号", "单号"];	break;
			case "five_com_10":		bTitles = ["三重号", "二重号"];	break;
			case "five_com_5":		bTitles = ["四重号", "单号"];	break;
			case "five_sp_1":		bTitles = ["一帆风顺"];	break;
			case "five_sp_2":		bTitles = ["好事成双"];	break;
			case "five_sp_3":		bTitles = ["三星报喜"];	break;
			case "five_sp_4":		bTitles = ["四季发财"];	break;

			case "four_set":
			case "four_coms":		bTitles = ["仟位", "百位", "十位", "个位"];	break;
			case "four_com_24":		bTitles = ["组选24"];	break;
			case "four_com_6":		bTitles = ["二重号"];	break;
			*/
			case "one_set":					bTitles = ['万位','仟位','百位','十位','个位'];	break; //万位,仟位,百位,十位,个位

			case "three_front_set":
			case "three_front_coms":		bTitles = ['万位','仟位','百位'];	break; //万位,仟位,百位

			case "three_mid_set":
			case "three_mid_coms":			bTitles = [langcx['wjs.POSITION2'],langcx['wjs.POSITION3'],langcx['wjs.POSITION4']];	break; //仟位,百位,十位

			case "three_behind_set":
			case "three_behind_coms":		bTitles = ['百位','十位','个位'];	break; //百位,十位,个位

			case "three_front_com_sum":
			case "three_front_sum":
			case "three_mid_com_sum":
			case "three_mid_sum":
			case "three_behind_com_sum":
			case "three_behind_sum":
			case "two_front_sum":
			case "two_behind_sum":
			case "two_front_com_sum":
			case "two_behind_com_sum":
											bTitles = ['和值'];	break; //和值

			case "three_front_across":
			case "three_mid_across":
			case "three_behind_across":
			case "two_front_across":
			case "two_behind_across":
											bTitles = [langcx['wjs.ACROSS']];	break; //跨度

			case "three_front_com_3":
			case "three_mid_com_3":
			case "three_behind_com_3":		bTitles = "组三";	break; //组三

			case "three_front_com_6":
			case "three_mid_com_6":
			case "three_behind_com_6":		bTitles = "组六";	break; //组六

			case "three_front_bd":
			case "three_mid_bd":
			case "three_behind_bd":
			case "two_front_bd":
			case "two_behind_bd":			bTitles = ['包胆'];	break; //包胆

			case "three_front_sum_wei":
			case "three_mid_sum_wei":
			case "three_behind_sum_wei":	bTitles = [langcx['wjs.SUM_TAIL']];	break; //和值尾数

			case "two_front_set":			bTitles = ["万位","仟位"];	break; //万位,仟位
			case "two_behind_set":			bTitles = ["十位","个位"];	break; //十位,个位
			case "two_front_com":
			case "two_behind_com":			bTitles = ["组选"];	break; //组选

			case "three_front_1":
			case "three_behind_1":
			case "three_front_2":
			case "three_behind_2":
			case "four_1":
			case "four_2":
			case "five_2":
			case "five_3":					bTitles = ['不定位'];	break; //不定位

			case "two_front_bseo":			bTitles = [langcx['wjs.POSITION1'],langcx['wjs.POSITION2']];	break; //万位,仟位
			case "two_behind_bseo":			bTitles = [langcx['wjs.POSITION4'],langcx['wjs.POSITION5']];	break; //十位,个位
			default:
					break;
		}
		return bTitles;
}
function mapping_type(ptype)
{
	getDesc(ptype);
	getEx(ptype);
	getHelp(ptype);
	switch(ptype)
	{
		case "five_set":
		case "five_coms":
		case "five_com_120":
		case "five_com_60":
		case "five_com_30":
		case "five_com_20":
		case "five_com_10":
		case "five_com_5":
		case "five_sp_1":
		case "five_sp_2":
		case "five_sp_3":
		case "five_sp_4":

		case "four_set":
		case "four_coms":
		case "four_com_24":
		case "four_com_12":
		case "four_com_6":
		case "four_com_4":

		case "three_front_set":
		case "three_mid_set":
		case "three_behind_set":
		case "three_front_coms":
		case "three_mid_coms":
		case "three_behind_coms":
		case "three_front_sum":
		case "three_mid_sum":
		case "three_behind_sum":
		case "three_front_across":
		case "three_mid_across":
		case "three_behind_across":
		case "three_front_com_3":
		case "three_mid_com_3":
		case "three_behind_com_3":
		case "three_front_com_6":
		case "three_mid_com_6":
		case "three_behind_com_6":
		case "three_front_com_sum":
		case "three_mid_com_sum":
		case "three_behind_com_sum":
		case "three_front_bd":
		case "three_mid_bd":
		case "three_behind_bd":
		case "three_front_sum_wei":
		case "three_mid_sum_wei":
		case "three_behind_sum_wei":

		case "two_front_set":
		case "two_behind_set":
		case "two_front_sum":
		case "two_behind_sum":
		case "two_front_across":
		case "two_behind_across":
		case "two_front_com":
		case "two_behind_com":
		case "two_front_com_sum":
		case "two_behind_com_sum":
		case "two_front_bd":
		case "two_behind_bd":

		case "one_set":

		case "three_front_1":
		case "three_behind_1":
		case "three_front_2":
		case "three_behind_2":
		case "four_1":
		case "four_2":
		case "five_2":
		case "five_3":

		case "two_front_bseo":
		case "two_behind_bseo":
			BetType = "ball";
			var code = getCode(ptype);
			Bbet.setCode(code);
			var cname = getCname(ptype);
			Bbet.setCname(cname);
			Bbet.setBseoAry(bseoAry);
			Bbet.setFunNames(funNames);
			Bbet.setBallTitle(getBallTitle);
			Bbet.setPosName(posetName);
			ball_play(ptype);
			setAnalye();
				break;

		case "five_enter":
		case "four_enter":

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

		case "two_front_enter":
		case "two_front_com_enter":
		case "two_behind_enter":
		case "two_behind_com_enter":

			BetType = "enter";
			var code = getCode(ptype);
			Ebet.setCode(code);
			var cname = getCname(ptype);
			Ebet.setCname(cname);
			Ebet.setPosName(posetName);
			enter_play(ptype);
				break;
		default:
				//showAlert("尚未完成"); //尚未完成
				break;
	}
	//top.mm.resize($(document).height(),$("#mainPage").width());
}

function getCode(type)
{
	var codes = [];
	codes['three_front_set']="5002";				codes['three_front_enter']="5001";				codes['three_front_sum']="5003";
	codes['three_front_com_3']="5005";				codes['three_front_com_3_enter']="5004";		codes['three_front_com_6']="5007";
	codes['three_front_com_6_enter']="5006";		codes['three_front_com_mix']="5008";			codes['three_front_com_sum']="5009";

	codes['two_front_set']="5011";			codes['two_front_enter']="5010";
	codes['two_front_com']="5015";			codes['two_front_com_enter']="5014";

	codes['two_behind_set']="5013";			codes['two_behind_enter']="5012";
	codes['two_behind_com']="5017";			codes['two_behind_com_enter']="5016";

	codes['one_set']="5018";

	codes['three_front_1']="5019";			codes['three_front_2']="5020";

	codes['two_front_bseo']="5021";			codes['two_behind_bseo']="5022";
	return	codes[type];
}

function getCname(type){
	var names = [];

	names['three_front_set']="三星直选_复式";						names['three_front_enter']="三星直选_单式";	names['two_front_set']="前二直选_复式";  names['two_front_enter']="前二直选_单式"; 				names['three_front_sum']="三星直选_和值";	
	names['three_front_com_3']="三星组选_组三复式";		names['three_front_com_3_enter']="三星组选_组三单式";		names['three_front_com_6']="三星组选_组六复式";	
	names['three_front_com_6_enter']="三星组选_组六单式";		names['three_front_com_mix']="三星组选_混合组选";			names['three_front_com_sum']="三星组选_和值";	

	names['two_front_set']="前二直选_复式";			names['two_front_enter']="前二直选_单式";	
	names['two_front_com']="前二组选_复式";				names['two_front_com_enter']="前二组选_单式";

	names['two_behind_set']="后二"+"直选"+"_"+"复式";		names['two_behind_enter']="后二直选_单式";	
	names['two_behind_com']="后二"+"组选"+"_"+"复式";			names['two_behind_com_enter']="后二"+"组选"+"_"+"单式";	
	
	names['one_set']="一星_定位胆";
	return	names[type];
}

function comBetMoney(){
	if(BetType == "ball") Bbet.comBetMoney();
	else if(BetType == "enter") Ebet.comBetMoney();
}
function isInteger( str ){
	var regu = /^[-]{0,1}[0-9]{1,}$/;
	return regu.test(str);
}
function showSelBet(){
	var bet;
	var times = $("#lt_sel_times").val();
	if(times==0 || times=="" || isNaN(parseInt(times)) || !isInteger(times))
	{
		showAlert(langcx['wjs.ERROR_TIMES']);
		return;
	}
	var unit = $('.btnType .selected').attr('unit');
	if(unit == "" || unit == 0){
		showAlert(langcx['wjs.ERROR_UNIT']);
		return;
	}
	if(Blist.list.length>=20)
	{
		showAlert(langcx['wjs.ERROR_MAX_PERIOD']);
		return;
	}
	if(BetType == "ball" && Bbet.pickFlag)
	{
		bet = Bbet.getRowPick();
		if(bet['ratio']==0 || bet['ratio']==null)
		{
			showAlert(langcx['wjs.ERROR_RATIO']);
			return;
		}
		Blist.add(Bbet.getRowPick());
		Bbet.clearSel();
		//getAnalye();
	}
	else if(BetType == "ball" && !Bbet.pickFlag)
	{
		showAlert(langcx['wjs.ERROR_SELNUM']);
	}
	else if(BetType == "enter" && Ebet.pickFlag)
	{
		bet = Ebet.getRowPick();
		if(bet['ratio']==0 || bet['ratio']==null)
		{
			showAlert(langcx['wjs.ERROR_RATIO']);
			return;
		}
		Blist.add(Ebet.getRowPick());
		Ebet.reset();
	}
	else if(BetType == "enter" && !Ebet.pickFlag)
	{
		showAlert(langcx['wjs.ERROR_ENTNUM']);
	}
}
function showFastBet()
{
	if(Blist.list.length>0)
	{
		$( "#dialog_fastbet" ).dialog( "open" );
	}
	else
	{
		doFastBet();
	}
}
function doFastBet()
{
	$( "#dialog_fastbet" ).dialog( "close" );
	Blist.init();
	showSelBet();
	beginTimes();
	sendBet();
}
function setCoin(val)
{
	var yuan = parseFloat($("#yuan").attr("unit"));
	$("#yuan").attr("unit",yuan*val);
	var jiao = parseFloat($("#jiao").attr("unit"));
	$("#jiao").attr("unit",jiao*val);
	var fen = parseFloat($("#fen").attr("unit"));
	$("#fen").attr("unit",fen*val);
}
function getDesc(ptype)
{
	var desc;
	switch(ptype)
	{
		case "three_front_enter":
			desc = "手動輸入號碼，至少輸入1個三位數號碼組成一註。";
			break;
		case "three_front_sum":
			desc ="從0-27中任意選擇1個或1個以上號碼。";
			break;
		case "three_front_com_3":
			desc = "123";
			break;
		case "three_front_com_3_enter":
			desc = "手动输入号码，至少输入1个三位数号码（三个数字中必须有二个数字相同）。";
			break;
		case "three_front_com_6":
			desc = "从0-9中任意选择3个或3个以上号码。"
			break;
		case "three_front_com_6_enter":
			desc = "手动输入号码，至少输入1个三位数号码（三个数字完全不相同）。"
			break;
		case "three_front_com_mix":
			desc = "手动输入号码，至少输入1个三位数号码。"
			break;
		case "three_front_com_sum":
			desc = "从1-26中任意选择1个或1个以上号码。"
			break;

		case "three_front_set":
			desc ="從萬丶千丶百位各選一個號碼組成一註。";
			break;

		case "two_front_set":
			desc = "从万丶千位各选一个号码组成一注。";
			break;
		case "two_front_enter":
		case "two_front_com_enter":
		case "two_behind_enter":
		case "two_behind_com_enter":
			desc = "手动输入号码，至少输入1个两位数号码。";
			break;
		case "two_front_sum":
		case "two_behind_sum":
			desc = "从0-18中任意选择1个或1个以上的和值号码。"
			break;
		case "two_behind_set":
			desc = '從十丶個位各選一個號碼組成一註。';
			break;
		case "two_front_com":
		case "two_behind_com":
			desc = '從0-9中任意選擇2個或2個以上號碼。';
			break;

		case "one_set":
			desc = "在万位，千位，百位，十位，个位任意位置上任意选择1个或1个以上号码。"
			break;

		case "three_front_2":
			desc = langcx['wjs.DESC_SSC_43'];
			break;
		case "three_front_1":
			desc = langcx['wjs.DESC_SSC_44'];
			break;

		case "two_front_bseo":
			desc = langcx['wjs.DESC_SSC_47'];
			break;
		case "two_behind_bseo":
			desc = langcx['wjs.DESC_SSC_48'];
			break;
		default:
			break;
	}
	$("#"+Tab+"_desc").html(desc);
}

function getEx(ptype)
{
	var ex;
	switch(ptype)
	{
		case "three_front_set":
		case "three_front_enter":
			ex = "從“三重號”選擇一個號碼，“單號”中選擇一個號碼組成一註。";
			break;
		case "three_front_sum":
			ex = "投注方案：和值 1开奖号码：前三位 001丶010丶100，即中前三直选和值。";
			break;
		case "three_front_com_3":
		case "three_front_com_3_enter":
			ex = "投注方案：5,8,8；开奖号码前三位：1个5，2个8 (顺序不限)，即中前三组选三。";
			break;
		case "three_front_com_6":
		case "three_front_com_6_enter":
			ex = "投注方案：2,5,8；开奖号码前三位：1个2丶1个5丶1个8 (顺序不限)，即中前三组选六。";
			break;
		case "three_front_com_mix":
			ex = "投注方案：001 和 123开奖号码：前三位 010（顺序不限）即中前三组选三，或者前三位 312（顺序不限）即中前三组选六。";
			break;
		case "three_front_com_sum":
			ex = "投注方案：和值3开奖号码：前三位 003（顺序不限）即中前三组选三，或者前三位 012（顺序不限）即中前三组选六和值。";
			break;

		case "two_front_set":
		case "two_front_enter":
			ex = "投注方案：58；开奖号码前二位：58，即中前二直选。";
			break;
		case "two_front_sum":
			ex = "";
			break;
		case "two_front_com":
		case "two_front_com_enter":
			ex = "投注方案：5,8；开奖号码前二位：85 或58(顺序不限，不含对子号)，即中前二组选。";
			break;

		case "two_behind_set":
		case "two_behind_enter":
			ex = "投註方案：58；開獎號碼後二位：58，即中後二直選。";
			break;
		case "two_behind_sum":
			ex = "";
			break;
		case "two_behind_com":
		case "two_behind_com_enter":
			ex = "456789";
			break;

		case "one_set":
			ex = "投注方案：万位 1；开奖号码万位：1，即中定位胆万位。";
			break;

		case "three_front_2":
			ex = langcx['wjs.EX_SSC_66'];
			break;
		case "three_front_1":
			ex = langcx['wjs.EX_SSC_67'];
			break;

		case "two_front_bseo":
			ex = langcx['wjs.EX_SSC_72'];
			break;
		case "two_behind_bseo":
			ex = langcx['wjs.EX_SSC_73'];
			break;
		default:
			break;
	}
	$("#"+Tab+"_example").attr('title',ex);
}

function getHelp(ptype)
{
	var help;
	switch(ptype)
	{
		case "three_front_set":
			help = "從萬位丶千位丶百位中選擇一個3位數號碼組成一註，所選號碼與開獎號碼前3位相同，且順序一致，即為中獎。";
			break;
		case "three_front_enter":
			help = "手动输入一个3位数号码组成一注，所选号码与开奖号码的万位丶千位丶百位相同，且顺序一致，即为中奖。";
			break;
		case "three_front_sum":
			help = "所选数值等於开奖号码的万位丶千位丶百位三个数字相加之和，即为中奖。";
			break;
		case "three_front_com_3":
			help = "从0-9中选择2个数字组成两注，所选号码与开奖号码的万位丶千位丶百位相同，且顺序不限，即为中奖。";
			break;
		case "three_front_com_3_enter":
			help = "手动输入一个3位数号码组成一注，三个数字当中必须有二个数字相同，所选号码与开奖号码的万位丶千位丶百位相同，顺序不限，即为中奖。";
			break;
		case "three_front_com_6":
			help =  "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位丶千位丶百位相同，顺序不限，即为中奖。";
			break;
		case "three_front_com_6_enter":
			help = "手动输入一个3位数号码组成一注，所选号码与开奖号码的万位丶千位丶百位相同，顺序不限，即为中奖。";
			break;
		case "three_front_com_mix":
			help = "手动输入一个3位数号码组成一注（不含豹子号），开奖号码的万位丶千位丶百位符合前三组三或组六均为中奖。";
			break;
		case "three_front_com_sum":
			help = "所选数值等於开奖号码万位丶千位丶百位三个数字相加之和(非豹子号)，即为中奖。";
			break;

		case "two_front_set":
			help = "从万位丶千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。";
			break;
		case "two_front_enter":
			help = "手动输入一个2位数号码组成一注，输入号码的万位丶千位与开奖号码相同，且顺序一致，即为中奖。";
			break;
		case "two_front_sum":
			help = "";
			break;
		case "two_front_com":
			help = "从0-9中选2个号码组成一注，所选号码与开奖号码的万位丶千位相同，顺序不限，即中奖。";
			break;
		case "two_front_com_enter":
			help = "手动输入一个2位数号码组成一注，输入号码的万位丶千位与开奖号码相同，顺序不限，即为中奖。";
			break;

		case "two_behind_set":
			help ='從十位丶個位中選擇一個2位數號碼組成一註，所選號碼與開獎號碼的後2位相同，且順序一致，即為中獎。';
			break;
		case "two_behind_enter":
			help = langcx['wjs.HELP_SSC_069'];
			break;
		case "two_behind_sum":
			help = "";
			break;
		case "two_behind_com":
			help = langcx['wjs.HELP_SSC_071'];
			break;
		case "two_behind_com_enter":
			help = langcx['wjs.HELP_SSC_072'];
			break;

		case "one_set":
			help = "从万位丶千位丶百位丶十位丶个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。";
			break;

		case "three_front_2":
			help = langcx['wjs.HELP_SSC_081'];
			break;
		case "three_front_1":
			help = langcx['wjs.HELP_SSC_082'];
			break;

		case "two_front_bseo":
			help = langcx['wjs.HELP_SSC_087'];
			break;
		case "two_behind_bseo":
			help = langcx['wjs.HELP_SSC_088'];
			break;
		default:
			break;
	}
	$("#"+Tab+"_help").attr('title',help);
}