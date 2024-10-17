const Update = (event,name) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Update Notification</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="bg-gray-100">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800">
        Attention!! - Event Updated
      </h1>
      <p class="mt-4 text-gray-600">Dear ${name},</p>

      <p class="mt-2 text-gray-600">
        We wanted to inform you that there have been some updates to the event
        you registered for. Please find the updated details below:
      </p>

      <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 class="text-lg font-semibold text-teal-600">
          Updated Event Details:
        </h2>
        <p class="mt-2 text-gray-700">
          <strong>Event Name:</strong> ${event.name}
        </p>
        <p class="mt-1 text-gray-700"><strong>Date:</strong> ${event.date}</p>
        <p class="mt-1 text-gray-700"><strong>Time:</strong> ${event.time}</p>
        <p class="mt-1 text-gray-700">
          <strong>Venue:</strong> ${event.location}
        </p>
        <p class="mt-1 text-gray-700">
          <strong>Description:</strong> ${event.description}
        </p>
      </div>

      <p class="mt-4 text-gray-600">
        If you have any questions, feel free to contact us.
      </p>

      <a
        href="https://eventifyddu-frontend.vercel.app/"
        class="mt-4 inline-block px-6 py-2 bg-teal-600 text-white font-medium text-center rounded-md shadow-md hover:bg-teal-700"
        >View Event Details</a
      >

      <p class="mt-6 text-sm text-center text-gray-500">
        Thank you for your attention,<br /><b>Eventify</b>
      </p>
    </div>
  </body>
</html>
    `
}

module.exports = Update;