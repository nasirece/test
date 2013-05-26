function ValidateClient(a){this.config={};this.$fb=a;this.maxnumerrors=-1}ValidateClient.prototype.clone=function(c){if(c==null||typeof(c)!="object"){return c}var a={};for(var b in c){a[b]=this.clone(c[b])}return a};ValidateClient.prototype.init_editor=function(){this.$fb("#fb-submit-button").click(function(){return false})};ValidateClient.prototype.init_client=function(a){var b=this;this.$fb("#docContainer input:submit, #docContainer button:submit").click(function(c){b.$fb("#docContainer .placeholder").val("");if(b.$fb("#docContainer").attr("data-form")=="automated"||b.$fb("#docContainer").attr("data-form")=="publish"){if(!b.$fb("#docContainer").valid()){var d=b.$fb("#docContainer").attr("action");var e=b.$fb("#docContainer").validate().numberOfInvalids();d=d.replace(/(?:\.php)|\/$/i,"/fbapp/api/formchangestats.php?error="+e);b.$fb.get(d)}}if(b.$fb("#docContainer").attr("data-form")!="preview"){if(b.$fb(this).attr("data-disabled")){c.preventDefault();c.stopPropagation();return false}if(b.$fb("#docContainer").valid()){b.$fb(this).attr("data-disabled","disabled");if(window.parent&&b.$fb("#docContainer").attr("data-form")=="manual_iframe"){b.$fb("body",window.parent.document).scrollTop(b.$fb("iframe",window.parent.document).position().top)}}}return true});if(a){this.$fb.validator.setDefaults({submitHandler:function(c){if(b.$fb(c).valid()){alert("Submitted!")}}})}this.$fb("#docContainer").validate({errorPlacement:function(d,e){if(b.maxnumerrors!=-1){var c=0;b.$fb.each(b.$fb("#docContainer label.error"),function(g,f){if(b.$fb(f).css("display")!="none"){c++}});if(c>=b.maxnumerrors){return}}offset=e.offset();if(b.$fb(e).attr("type")=="checkbox"||b.$fb(e).attr("type")=="radio"){b.$fb(d).css("width","100%");b.$fb(e).parent().parent().append(b.$fb(d))}else{if(b.$fb(e).attr("id")=="recaptcha_response_field"){b.$fb("#fb-captcha_control").append(b.$fb(d))}else{b.$fb(d).insertAfter(b.$fb(e))}}d.addClass("message")}});this.set_config(JSON.parse(data_validation));this.add_rules()};ValidateClient.prototype.set_config=function(a){this.config=this.clone(a)};ValidateClient.prototype.set_config_json=function(a){if(typeof a=="undefined"||a===null||typeof a!="string"){return false}this.config=JSON.parse(a);return true};ValidateClient.prototype.add_rule_type=function(e,m){if(arguments.length!=2){return false}if(typeof this.config[e]=="undefined"||this.config[e]===null){return false}if(typeof this.config[e][m]=="undefined"||this.config[e][m]===null||this.config[e][m]==""){return false}if(e!="reCaptcha"&&e!="_special"&&!this.$fb("#"+e).length){return false}var p=this;if(m=="date_config"){this.$fb("#"+e).attr("id","").removeClass("hasDatepicker").removeData("datepicker").unbind().attr("id",e).datepicker({onClose:function(){p.$fb("#docContainer").validate().element(this)},showAnim:""});for(var d in this.config[e][m]){if(this.config[e][m].hasOwnProperty(d)){var h={};if(d=="minDate"||d=="maxDate"){if(this.config[e][m][d]!=""){h[d]=new Date(this.config[e][m][d])}}else{h[d]=this.config[e][m][d]}this.$fb("#"+e).datepicker("option",d,h[d])}}}else{if(m=="hover"){var g=document.getElementById("form_init_script").getAttribute("data-name");var k=4;if(navigator.appName=="Microsoft Internet Explorer"){k=5}for(var o in this.config[e][m]){var n=this.$fb("#"+e).css(o);var j=p.config[e][m][o];if((this.$fb("#docContainer").attr("data-form")=="automated"&&this.$fb("#docContainer").attr("action")!="./")||(this.$fb("#docContainer").attr("data-form")=="manual_iframe"&&this.$fb("#docContainer").attr("action")!="../"+g+".php")){j=j!=""?j.substr(0,4)+g+j.substr(4,j.length):j}if(j!="none"&&j!=""){var f=j.substr(j.indexOf("(")+1,j.indexOf(")")-j.indexOf("(")-1);var l=n.substr(n.indexOf("(")+1,n.indexOf(")")-n.indexOf("(")-1);this.$fb("<img/>").attr("src",f);this.$fb("<img/>").attr("src",l)}var p=this;this.$fb("#"+e).hover(function(){if(j!="none"&&j!=""){p.$fb(this).css("background-image",j)}else{if(j=="none"){p.$fb(this).css("background-image",n)}else{p.$fb(this).css("background-image","")}}},function(){p.$fb(this).css("background-image",n)})}}else{if(m=="maxnumerrors"){if(this.config[e][m]!=undefined&&this.config[e][m]!=""){this.maxnumerrors=this.config[e][m]}}else{if(m=="captcha"){if(this.config[e][m]&&this.$fb("#recaptcha_response_field").length){var a={};a.required=true;if(typeof(this.config[e].messages)=="string"){var c={};c.required=this.config[e].messages;a.messages=c}this.$fb("#recaptcha_response_field").rules("add",a)}}else{if(this.$fb("#"+e).length>0){var a={};a[m]=this.config[e][m];if(this.$fb("#"+e).is("input[type='checkbox']")&&m=="minlength"){var b={};b[m]="Please select at least {0} options.";a.messages=b}if(typeof(this.config[e].messages)=="string"){var c={};c[m]=this.config[e].messages;if(m=="range"){c.max=this.config[e].messages;c.min=this.config[e].messages}a.messages=c}if(m=="equalTo"){var i=this.config[e].equalTo.substring(1,this.config[e].equalTo.length);if(typeof(this.config[i].messages)=="string"){var c={};c[m]=this.config[i].messages;a.messages=c}}this.$fb("#"+e).rules("add",a)}}}}}return true};ValidateClient.prototype.add_rule_id=function(b){if(arguments.length!=1){return false}if(typeof this.config[b]=="undefined"||this.config[b]===null){return false}for(var a in this.config[b]){if(this.config[b].hasOwnProperty(a)){this.add_rule_type(b,a)}}return true};ValidateClient.prototype.add_rules=function(){for(var a in this.config){if(this.config.hasOwnProperty(a)){this.add_rule_id(a)}}return true};