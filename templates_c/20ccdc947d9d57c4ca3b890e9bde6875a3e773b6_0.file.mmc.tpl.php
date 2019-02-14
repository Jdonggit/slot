<?php
/* Smarty version 3.1.30, created on 2019-01-29 09:36:26
  from "C:\xampp\htdocs\mmc\templates\mmc.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5c4fae1ac33b77_66998527',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '20ccdc947d9d57c4ca3b890e9bde6875a3e773b6' => 
    array (
      0 => 'C:\\xampp\\htdocs\\mmc\\templates\\mmc.tpl',
      1 => 1548725786,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c4fae1ac33b77_66998527 (Smarty_Internal_Template $_smarty_tpl) {
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>mmc</title>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="mmc_style.css" rel="stylesheet" type="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link href="style.css" rel="stylesheet" type="text/css" />

<?php echo '<script'; ?>
 src="//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/javascript" src="/mmc/js/audiojs/audio.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>

  src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"
  integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30="
  crossorigin="anonymous"><?php echo '</script'; ?>
>
<!-- <link href="../rs/js/jquery-ui.min.css" rel="Stylesheet" type="text/css"> -->


</head>

<body>

<div class= "can1">
	<canvas id="canvas"></canvas>
	<canvas id="canvas2"></canvas>
</div>

<div class="pop-modal">
	<canvas id="firework"  ></canvas>
  <div class="pop-overlay" id="hide-box">&nbsp;</div>
	
	<div class="congrats">
		<img class="bouns"src="./images/000_03.png" alt="">
		<div class="moneydiv">
		<h2>贏得獎金$12.3!</h2>
		</div>
	  </div>
</div>

<div class="mmc_wrapper">

		<div  class="bitcoin">  
		  <div id="gold" class="coin">    
			<div class="front"><i></i></div>
			<div class="back"><i></i></div>
			<div class="side">
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			</div>
		  </div>
		</div>

	<canvas id="firework"  style="display:none"></canvas>
<!--mmc-->
    <div class="mmc">
		
		<canvas id="ball"></canvas>
		
    <!--開講頭-->
      <div class="header">
			
      		<div class="mmc_pond">
			<div id="myTargetElement" ></div>
</div>
			<div class="opof">
            <label class="switch" style="float:left;margin-left: 30px;"><!--音樂開關-->
                <input id="soundck" type="checkbox" class="switch-input" checked>
                <span class="switch-label" data-off="Off" data-on="On" ></span>
                <span class="switch-handle"></span>
            </label>
			
			 <label class="switch" style="float:left;margin-left: 30px; -ms-grid-row:2; "><!--特效開關-->
                <input id="light" type="checkbox" class="switch-inputlight" checked>
                <span class="switch-labellight" data-off="Off" data-on="On" ></span>
                <span class="switch-handlelight"></span>
            </label>
			</div>
			<!--獎池-->
			<div id="lott_bar" style="display:none ;margin-left:333px;margin-top: 23px;">
				<div id="box"></div>
				<div id="slotTmp"  style="display:none">
					<ul class="inbox">
							<li><img src="./images/mmc_9.png"></li>	
							<li><img src="./images/mmc_8.png"></li>
							<li><img src="./images/mmc_7.png"></li>	
							<li><img src="./images/mmc_6.png"></li>
							<li><img src="./images/mmc_5.png"></li>	
							<li><img src="./images/mmc_4.png"></li>
							<li><img src="./images/mmc_3.png"></li>	
							<li><img src="./images/mmc_2.png"></li>
							<li><img src="./images/mmc_1.png"></li>	
							<li><img src="./images/mmc_0.png"></li>	
					</ul>
				</div>
			</div>
			<div id="lott_rs" style="margin-left:333px;margin-top: 23px;" >
				<div class="box">		
					<ul class="inbox">
						<li><img src="./images/mmc_9.png"></li>	
					</ul>
					<ul class="inbox">
						<li><img src="./images/mmc_9.png"></li>	
					</ul>
					<ul class="inbox">
						<li><img src="./images/mmc_9.png"></li>	
					</ul>
					<ul class="inbox">
						<li><img src="./images/mmc_9.png"></li>	
					</ul>
					<ul class="inbox">
						<li><img src="./images/mmc_9.png"></li>	
					</ul>
				</div>
			</div>
			
			<div class="oivi">
				<font style="color:white;" id="combocount"></font>
				<a href="javascript:void(0);"  id="mc_countcombo" onclick="stopCombo();" class = "mcc_countcombo" ></a>
            </div>
			
        </div>
        <!--開講頭end-->
		
       <div class="mmc_tab"><!--選號區-->
		     
		<!-- 	<div class="tabs_container">
                <a class="pre"> </a>
				<ul class="tabs" style="width:900px;">
					<li><a id="three_front" href="#three_front_play">三星</a></li>
					<li><a id="two_front" href="#two_front_play">前二</a></li>
					<li><a id="two_behind" href="#two_behind_play">后二</a></li>
					<li><a id="one" href="#one_play">一星</a></li>
					<li><a id="noset" href="#noset_play">不定位</a></li>
					<li><a id="bseo" href="#bseo_play">大小单双</a></li>
				</ul>
				<a class="next"> </a>
            </div> -->
            <!--玩法-->
        <div class="keno_R" style="height: 500px">
			 <!--<div class="tab_container">
					
				<div id="three_front_play" class="tab_content">
					<div class="bg_red">
					<p class="method">
						<img id="three_front_help" src="./images/qa.png"/ class="left" title="">
						<span id="three_front_example" class="ex" title="">示例</span>
						<font id="three_front_desc"></font>
					</p>
					<p class="method">
						<span>  三星直选 </span>
						<input type="radio" class="smalllabel" id="three_front_set" name="three_front_ball" ><label for="three_front_set">直选复式</label>
						<input type="radio" class="smalllabel" id="three_front_enter" name="three_front_ball"><label for="three_front_enter">直选单式</label>
						<input type="radio" class="smalllabel" id="three_front_sum" name="three_front_ball"><label for="three_front_sum">直选和值</label>
					</p>
					<p class="method">
						<span> 三星组选</span>
						<input type="radio" class="smalllabel" id="three_front_com_3" name="three_front_ball"><label for="three_front_com_3">组三复式</label>
						<input type="radio" class="smalllabel" id="three_front_com_3_enter" name="three_front_ball"><label for="three_front_com_3_enter">组三单式</label>
						<input type="radio" class="smalllabel" id="three_front_com_6" name="three_front_ball"><label for="three_front_com_6">组六复式</label>
						<input type="radio" class="smalllabel" id="three_front_com_6_enter" name="three_front_ball"><label for="three_front_com_6_enter">组六单式</label>
						<input type="radio" class="smalllabel" id="three_front_com_mix" name="three_front_ball"><label for="three_front_com_mix">混合组选</label>
						<input type="radio" class="smalllabel" id="three_front_com_sum" name="three_front_ball"><label for="three_front_com_sum">组选和值</label>
					</p>
					</div>
					<div class="bg_red">
					<div id="three_front_play_ball"></div>
					</div>
				</div>

				<div id="two_front_play" class="tab_content">
				<div class="bg_red">
					<p class="method">
						<img id="two_front_help" src="./images/qa.png"/ class="left" title="">
						<span id="two_front_example" class="ex" title="">示例</span>
						<font id="two_front_desc"></font>
					</p>
					<p class="method">
						<span>  前二直选 </span>
						<input type="radio" class="smalllabel" id="two_front_set" name="two_front_ball" ><label for="two_front_set">直选复式</label>
						<input type="radio" class="smalllabel" id="two_front_enter" name="two_front_ball"><label for="two_front_enter">直选单式</label>
					</p>
					<p class="method">
						<span> 前二组选</span>
						<input type="radio" class="smalllabel" id="two_front_com" name="two_front_ball"><label for="two_front_com">组选复式</label>
						<input type="radio" class="smalllabel" id="two_front_com_enter" name="two_front_ball"><label for="two_front_com_enter">组选单式</label>
					</p>
					<div class="line"></div>
					</div>
					<div class="bg_red">
					<div id="two_front_play_ball"></div>
					</div>
				</div>

				<div id="two_behind_play" class="tab_content">
					<p class="method">
						<img id="two_behind_help" src="./images/qa.png"/ class="left" title="">
						<span id="two_behind_example" class="ex" title="">示例</span>
						<font id="two_behind_desc"></font>
					</p>
					<p class="method">
						<span>  后二直选 </span>
						<input type="radio" class="smalllabel" id="two_behind_set" name="two_behind_ball" ><label for="two_behind_set">直选复式</label>
						<input type="radio" class="smalllabel" id="two_behind_enter" name="two_behind_ball"><label for="two_behind_enter">直选单式</label>
					</p>
					<p class="method">
						<span> 后二组选</span>
						<input type="radio" class="smalllabel" id="two_behind_com" name="two_behind_ball"><label for="two_behind_com">组选复式</label>
						<input type="radio" class="smalllabel" id="two_behind_com_enter" name="two_behind_ball"><label for="two_behind_com_enter">组选单式</label>
					</p>
					<div class="line"></div>
					<div id="two_behind_play_ball"></div>
				</div>

				<div id="one_play" class="tab_content">
					<p class="method">
						<img id="one_help" src="./images/qa.png"/ class="left" title="">
						<span id="one_example" class="ex" title="">示例</span>
						<font id="one_desc"></font>
					</p>
					<p class="method">
						<span>  定位胆 </span>
						<input type="radio" class="smalllabel" id="one_set" name="one_ball" ><label for="one_set">定位胆</label>
					</p>
					<div class="line"></div>
					<div id="one_play_ball"></div>
				</div>

				<div id="noset_play" class="tab_content">
					<p class="method">
						<img id="noset_help" src="./images/qa.png"/ class="left" title="">
						<span id="noset_example" class="ex" title="">示例</span>
						<font id="noset_desc"></font>
					</p>
					<p class="method">
						<span>  不定位 </span>
						<input type="radio" class="smalllabel" id="three_front_1" name="noset_ball" ><label for="three_front_1">一码不定位</label>
						<input type="radio" class="smalllabel" id="three_front_2" name="noset_ball" ><label for="three_front_2">二码不定位</label>
					</p>
					<div class="line"></div>
					<div id="noset_play_ball"></div>
				</div>

				<div id="bseo_play" class="tab_content">
					<p class="method">
						<img id="bseo_help" src="./images/qa.png"/ class="left" title="">
						<span id="bseo_example" class="ex" title="">示例</span>
						<font id="bseo_desc"></font>
					</p>
					<p class="method">
						<span>  大小单双 </span>
						<input type="radio" class="smalllabel" id="two_front_bseo" name="bseo_ball" ><label for="two_front_bseo">前二大小单双</label>
						<input type="radio" class="smalllabel" id="two_behind_bseo" name="bseo_ball" ><label for="two_behind_bseo">后二大小单双</label>
					</p>
					<div class="line"></div>
					<div id="bseo_play_ball"></div>
				</div> -->
			   
			</div>

			<!-- <div class="tab_content">
				<table width="100%" class="option" border="0" cellpadding="1" cellspacing="0">
					<tbody><tr>
						
						<td>奖金/返点：<select id="ratioSel" class="radius"><option value="170000" water="4.5">170000/4.5%</option><option value="179000" water="0">179000/0%</option></select>  </td>
						<td>当前模式
						<ul class="btnType">
						<li id="yuan" unit="2" class="selected">元</li>
						<li id="jiao" unit="0.2">角</li>
						<li id="fen" unit="0.02">分</li>
						</ul>  </td>	
						<td width="90" style="vertical-align:top;">
							<a href="javascript:void(0);" onclick="Bbet.clearSel();Ebet.clearSel();" class="btn_s rechoose"> 重选号码 </a>

						</td>	
						<td width="90" style="vertical-align:top;">
							
							<a id="randomOne" href="javascript:void(0);" class="btn_s rechoose" onclick="Bbet.randomOne(5,true,'1_1_1_1_1');" style="display: block;"> 随机一注 </a>
						</td>	
						
					</tr>
					<tr>
						<td>您选择了<span id="lt_sel_bets" class="w3">0</span> 注</td>
						
						<td width="200">
						
						</td>
						<td>共 <span id="lt_sel_money" class="w3">0.000</span>元 </td>
						
					</tr>
				</tbody></table>
			</div> -->
            
		</div><!--玩法END-->
      </div><!--選號區END-->
      <div class="mmc_btnbox"><!--按鈕-->
            	<!--<div class="mmc_go"></div>
                <div class="mmc_add"></div>-->
				<a href="javascript:void(0);" onclick="closeChase();sendBet();" class="mmc_go"></a>
				<a href="javascript:void(0);" onclick="showSelBet();beginTimes();" class="mmc_add"></a>
      </div><!--按鈕END-->

      <div class="mmc_list"><!--下注清單-->
				<div class="mmc_listbox">
                    <div class="scrollbar" id="style-2">
      					<div class="force-overflow">
                     <table id="lt_bt_content" width="100%" border="0" cellpadding="5" cellspacing="0" class="center">
					</table>
                    </div>
                    </div>
                    <p class="right">  总金额 <span class="w3" id="lt_cf_money">0.00</span> 元  </p>
                   <p>总注数 <font id="lt_cf_bets">0</font> 注 </p> 
                </div>
        		<div class="mmc_check">
                  <div class="mmc_start"><a id ="goon" href="javascript:void(0);" onclick="go_bonus(); "></a></div>
                  <div class="mmc_again"><a href="javascript:void(0);" onclick="sendBet();" style="height: 111px; width: 286px; display: block; float: left;"></a></div>
				  
                </div>
      </div><!--下注清單 END-->
    </div><!--mmc end-->
</div>



<div style='width:1px;height:1px;margin:-9999px'>
	<audio src="./rs/sound/Cartoon.mp3" preload="auto" ></audio>
	<audio src="./rs/sound/firework.mp3" preload="auto" loop="loop"></audio>
</div>
<?php echo '<script'; ?>
 type="text/javascript" src="./js/jquery.jSlots.js"><?php echo '</script'; ?>
>
<!-- <?php echo '<script'; ?>
 type="text/javascript" src="/rs/js/jquery.form.js"><?php echo '</script'; ?>
> -->
<!--Special effects-->
<?php echo '<script'; ?>
 language="javascript" src="./js/firework.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/bubble.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/light_ball.js"><?php echo '</script'; ?>
>
<!-- <?php echo '<script'; ?>
 language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js"><?php echo '</script'; ?>
> -->
<!------------------->
<?php echo '<script'; ?>
 language="javascript" src="./js/countUp.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/bouns.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/pub.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/com_v1.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/jquery.easing.1.3.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/comFun.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/showBall.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/showEnter.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/showList.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 language="javascript" src="./js/showChase.js"><?php echo '</script'; ?>
>
<!-- START Animation code -->

<?php echo '<script'; ?>
 type="text/javascript">

$("#light").change(function() {
	if(this.checked) {
		document.getElementById("gold").style.WebkitAnimationPlayState = "running";
		document.getElementById("firework").style.display = "";
		document.getElementById("ball").style.display = "";
		document.getElementById("canvas").style.display = "";
		document.getElementById("canvas2").style.display = "";
	}
	else
	{
		document.getElementById("gold").style.WebkitAnimationPlayState = "paused";
		document.getElementById("firework").style.display = "none";
		document.getElementById("ball").style.display = "none";
		document.getElementById("canvas").style.display = "none";
		document.getElementById("canvas2").style.display = "none";
			
	}
});

function stopCombo(){
    $("#comboval").val("1");
	var combos = $("#comboval").val();
	$("#combocount").text('剩餘：0 次');

}
var theme = "v1";
var sel_play = "";
var Casino = "12";
var Ctype = "DD3";
var Code;
var Ratio = 0;
var Tab = "";
var Analye;
var BaseRatio=new Array();
var dialog;
var slotAudio;
var timerAudio;
var readyAudio;
	var Ratio=new Array();
			Ratio[5001] = 1700;
			Ratio[5002] = 1700;
			Ratio[5003] = 1700;
			Ratio[5004] = 566.667;
			Ratio[5005] = 566.667;
			Ratio[5006] = 283.34;
			Ratio[5007] = 283.34;
			Ratio[5008] = 566.667;
			Ratio[5009] = 569.5;
			Ratio[5010] = 170;
			Ratio[5011] = 170;
			Ratio[5012] = 170;
			Ratio[5013] = 170;
			Ratio[5014] = 85;
			Ratio[5015] = 85;
			Ratio[5016] = 85;
			Ratio[5017] = 85;
			Ratio[5018] = 17;
			Ratio[5019] = 6.42;
			Ratio[5020] = 30.9778;
			Ratio[5021] = 6.8;
			Ratio[5022] = 6.8;
		BaseRatio.push(Ratio);

var BaseWater=new Array();
	var Water=new Array();
			Water[5001] = 11;
			Water[5002] = 11;
			Water[5003] = 11;
			Water[5004] = 11;
			Water[5005] = 11;
			Water[5006] = 11;
			Water[5007] = 11;
			Water[5008] = 11;
			Water[5009] = 11;
			Water[5010] = 11;
			Water[5011] = 11;
			Water[5012] = 11;
			Water[5013] = 11;
			Water[5014] = 11;
			Water[5015] = 11;
			Water[5016] = 11;
			Water[5017] = 11;
			Water[5018] = 11;
			Water[5019] = 11;
			Water[5020] = 11;
			Water[5021] = 11;
			Water[5022] = 11;
		BaseWater.push(Water);
var nowSn = "2016562";
var rsSn = "2016450";

$(document).ready(function(){
	//document.getElementById("firework").style.display = "block";
	//$(".pop-modal").css('display', 'block');
	
	var ct = 8468;
	if(ct==0) dd();
	else{
		var ts = (new Date()).getTime() + ct*1000;
		countdown(ts);
	}
	setCoin(2);
	$(".btnType li").click(function(){
		$(".btnType li").removeClass("selected");
		$(this).addClass("selected");
		var coin = $(this).attr('id');
		setCookie("coin", coin, 30);
		comBetMoney();
	});
	$(".switch_atype span").click(function(){
		$(".switch_atype span").removeClass("selected");
		$(this).addClass("selected");
	});

});  

var maxNum = 100;  

var options = {
			useEasing: true, 
			useGrouping: true, 
			separator: ',', 
			decimal: '.', 
		};
/*參數為 開始數值 , 結束數值 , 小數點位數 , 數值動畫速度 (秒數)*/
var demo = new CountUp('myTargetElement', 0, maxNum, 0, 2, options);
	if (!demo.error) {
		demo.start();
	}else{
	console.error(demo.error);
}	


setInterval( function(){	
		maxNum = maxNum+80;
		demo.update(maxNum);	
} , 3000);

// setTimeout(slotRs(''), 1000);
<?php echo '</script'; ?>
>
</body>
</html>
<?php }
}
