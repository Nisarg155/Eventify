const registratationTemplate = (name) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="bg-gray-100">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800">
        Welcome to <span class="text-teal-600">Eventify</span>, ${name}!
      </h1>
      <p class="mt-4 text-gray-600">
        We're thrilled to have you on board! With
        <span class="text-teal-600">Eventify</span>, you can easily discover and
        register for the best events tailored just for you. Here are some quick
        steps to get you started.
      </p>

      <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 class="text-lg font-semibold text-teal-600">Getting Started:</h2>
        <ul class="list-disc list-inside text-gray-700 mt-2">
          <li>Browse through upcoming events and check out their details.</li>
          <li>Choose events based on your interests or location.</li>
          <li>Register for the events you like with a single click.</li>
          <li>
            Keep track of your registered events in your personal dashboard.
          </li>
        </ul>
      </div>

      <p class="mt-4 text-gray-600">
        If you have any questions or need support, we're here to help you every
        step of the way. Feel free to reach out to us.
      </p>

      <a
        href="https://eventifyddu-frontend.vercel.app/"
        class="mt-4 inline-block px-6 py-2 bg-teal-600 text-white font-medium text-center rounded-md shadow-md hover:bg-teal-700"
        >Go to Dashboard</a
      >

      <p class="mt-6 text-sm text-center text-gray-500">
        Welcome once again,<br />
        <span class="text-teal-600">Eventify</span>
      </p>
    </div>
  </body>
</html>`

}

module.exports = {registratationTemplate}