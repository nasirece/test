<?php
   $link = mysql_connect("localhost", "root", "");
   mysql_select_db("sms_db");
   $query = "SELECT * FROM smsin";
   $result = mysql_query($query);
   while ($line = mysql_fetch_array($result))
   {
      foreach ($line as $value)
		{
         print "$value\n";
		}
   }
    mysql_close($link);
?>