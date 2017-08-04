<?php
$headers = 'From: ' . $_POST['email'];

if(isset($_POST['name']) && $_POST['name']!='' && isset($_POST['email']) && $_POST['email']!='' && isset($_POST['comment']) && $_POST['comment']!=''){
    if(preg_match("/^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/",$_POST['email'])){
        $to = "roleg.corporation@gmail.com";
        $subject = "Feedback";
        $message = wordwrap(("Вам пишет: " . $_POST['name'] . "\n" . $_POST['comment']), 70, "\n");
        
        mail($to, $subject, $message, $headers);
        echo "Ваше письмо отправлено!";
    } else {
        echo "Не верный e-mail!";
    }
    
} else{
    echo "Ваше письмо не отправлено!";
}

?>