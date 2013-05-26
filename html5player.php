<?php

if(!function_exists(jwplayer5))
  {
  function jwplayer5($data)
  {
  $vdata = $data['vdetails'];
  global $swfobj;
  $vid_file = get_video_file($vdata,$no_video,false);
  if($vid_file)
  {
  $hd = $data['hq'];
  $swfobj->width = $data['width'];
  $swfobj->height = $data['height'];
  $swfobj->playerFile = PLAYER_URL.'/jwplayer5/player.swf';
  $swfobj->DivId = $data['player_div'] ? $data['player_div'] : config('player_div_id');
  $swfobj->FlashObj();
  //Writing Param
  $swfobj->addParam('allowfullscreen','true');
  $swfobj->addParam('allowscriptaccess','always');
  $swfobj->addParam('wmode','opaque');
  $swfobj->addVar('image',getthumb($vdata,'big'));
  $swfobj->addVar('logo', '/logo_test.png');
  $swfobj->addVar('autostart','false');
  if($hd=='yes') $file = get_hq_video_file($vdata); else $file = get_video_file($vdata,true,true);
  $swfobj->addVar('file',$file);
  $swfobj->CreatePlayer();
  return $swfobj->code;
  }else
  return false;
  }
  add_js(array('swfobject.obj.js'=>'global'));
  register_actions_play_video('jwplayer5');
  }
?>