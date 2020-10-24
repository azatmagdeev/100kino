<?php

print_r($_POST);

$str = '';
foreach($_POST as $key=>$value)
{
    $str .= $key . ' => ' . $value . '<br>';
}

mail ( 'azatmagdeev@ya.ru' , 'FeedBack' , $str, 'Content-Type: text/html');