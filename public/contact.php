<?php

$human = $_POST['human'];
if(isset($_POST["submit"]) && $human == '15') {
    mail(nickchilders64@gmail.com, "Form to email message", $_POST["user_message"], "From: user_email");
    echo '<p>Your email has been sent.</p>';
}
else if (isset($_POST['submit']) && $human != '15') {
    echo '<p>You answered the anti-spam question incorrectly!</p>';
}
?>