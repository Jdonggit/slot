document.ondragstart = function () { return false; };
$(document).ready(function () {
	pub_init();
	$(".numeric").on("paste", function(){
		return false;
    });
	var options = { 
    beforeSend: function() 
    {
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
    },
    success: function() 
    {
    },
	complete: function(response) 
	{
		$("#enterList").val(response.responseText);
		Ebet.funActive("parse");
	},
	error: function()
	{
		$("#message").html("<font color='red'>"+langcx['wjs.UNABLE_UPFILE']+"</font>");

	}};
	//$("#myForm").ajaxForm(options);	
});
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCoin() {
    var coin=getCookie("coin");
    if (coin != "" && coin != "li") {
		$(".btnType li").removeClass("selected");
		$('#'+coin).addClass("selected");
		$('#'+coin+' input').attr("checked",true);
    }
	else{
		$('#yuan').addClass("selected");
		$('#yuan input').attr("checked",true);
    }
}
function checkGaem(gid)
	{
	
	}
function pub_init()
	{
	top.gg=this;
	}
function game_init(data)
{
	/*$("#cgameid").html(data[1]);
	var num=data[2];
	var nums = num.split(',');*/
	slotRs(data);
}
function accAdd(arg1, arg2) {
         var r1, r2, m, c;
         try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
         try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
         c = Math.abs(r1 - r2);
         m = Math.pow(10, Math.max(r1, r2))
         if (c > 0) {
             var cm = Math.pow(10, c);
             if (r1 > r2) {
                 arg1 = Number(arg1.toString().replace(".", ""));
                 arg2 = Number(arg2.toString().replace(".", "")) * cm;
             }
             else {
                 arg1 = Number(arg1.toString().replace(".", "")) * cm;
                 arg2 = Number(arg2.toString().replace(".", ""));
             }
         }
         else {
             arg1 = Number(arg1.toString().replace(".", ""));
             arg2 = Number(arg2.toString().replace(".", ""));
         }
         return (arg1 + arg2) / m
     }
function accMul(arg1, arg2) {
         var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
         try { m += s1.split(".")[1].length } catch (e) { }
         try { m += s2.split(".")[1].length } catch (e) { }
         return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
     }	