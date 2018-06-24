/*
//=============================================================================================================
//
//		Name		: 	RKM Protocol
//		Author		: 	Anvay Rane, Joe K. Kim (J.K.K.), Shinsuke Matsumoto
//		Site		:	recoverkey.io
//		Version     : 	1.0.0
//		
//		!!! Proprietary !!!
//
//		© 2018 Potion, all rights reserved.
//		Unauthorized copying of this file, via any medium is strictly prohibited.
//		Written by Joe K. Kim <jkk@xgovern.com> and Anvay Rane <anvay.rane@gmail.com>
//
//=============================================================================================================
*/

var is_nodeJS_master, is_nodeJS, is_worker, is_xgov_webnode, beta_mode;
is_nodeJS = (new Function("try{return this===global;}catch(e){return false;}"))();
if(is_nodeJS){try{is_worker=require?false:true;}catch(e){is_worker = true;}}
else{is_worker = (new Function("try{document}catch(e){return true;}"))();}
is_nodeJS_master = (is_nodeJS && !is_worker);
if(is_worker && !is_nodeJS){
	importScripts("https://xgovern.com/nacl-fast.min.js");
	importScripts("https://xgovern.com/pako.min.js");
}

var time = function(){return Math.floor((new Date).getTime()/1000);}
var mtime = function(){return (new Date).getTime();}
var portable_error = function(e){if(typeof e === 'string') e = new Error(e); if(!e) e = new Error; return {mesasge:e.message, stack:e.stack, name:e.name};}
var sort_object_keys = function(obj){
	return Object.keys(obj).sort().reduce(function(result,key){result[key] = obj[key]; return result;}, {});
}

var rkm = (function(){

	
	var xgov_lib = is_nodeJS_master ? require('xgov') : xgov;
	var rkm_multicore_enabled = false;
	var rkm = {};

	rkm. digest = function(param,options){
		return xgov_lib.rkm_digest(param,options);
	}
	rkm. recover = function(param,options){
		return xgov_lib.rkm_recover(param,options);
	}

	try{if(is_nodeJS_master && module) module.exports = rkm;}catch(e){}

	Object.freeze(rkm);
	return rkm;

})();






















