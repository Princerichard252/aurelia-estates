<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect and Sanitize Data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $subject_interest = strip_tags(trim($_POST["subject"]));
    $message_content = strip_tags(trim($_POST["message"]));

    // 2. Configuration
    $recipient = "richardprince252@gmail.com";
    $subject = "Aurelia Estates: New Inquiry - $subject_interest";

    // 3. Email Body Construction
    $email_content = "You have a new high-end inquiry from Aurelia Estates Website.\n\n";
    $email_content .= "Client Name: $name\n";
    $email_content .= "Client Email: $email\n";
    $email_content .= "Client Phone: $phone\n";
    $email_content .= "Interest: $subject_interest\n\n";
    $email_content .= "Message:\n$message_content\n";

    // 4. Email Headers
    $email_headers = "From: Aurelia Estates <no-reply@aureliaestates.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    // 5. Send Email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo json_encode(["status" => "success", "message" => "Inquiry sent."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Mail server failed to send message."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>