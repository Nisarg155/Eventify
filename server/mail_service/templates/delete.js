const Delete = (username,eventname) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Cancellation Notification</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="bg-gray-100">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800">
        Event <span class="text-red-600">Cancellation</span> Notice
      </h1>
      <p class="mt-4 text-gray-600">Dear ${username},</p>

      <p class="mt-2 text-gray-600">
        We regret to inform you that the event you registered for,
        <strong>${eventname}</strong>, has been canceled due to unforeseen
        circumstances. We sincerely apologize for any inconvenience this may
        cause.
      </p>

 

      <p class="mt-6 text-sm text-center text-gray-500">
        We appreciate your understanding,<br /><b>Eventify</b>
      </p>
    </div>
  </body>
</html>`;
}

module.exports = Delete;