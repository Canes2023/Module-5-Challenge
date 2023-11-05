$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    var key = $(this).parent().attr("id");
    var value = $(this).siblings(".description").val();
    localStorage.setItem(key, value);
    showMessage();
  });

  // Apply the past, present, or future class to each time block
  function updateHourlyStatus() {
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour > currentHour) {
        $(this).removeClass("past present").addClass("future");
      } else {
        $(this).removeClass("past future").addClass("present");
      }
    });
  }
  updateHourlyStatus();

  // Get user input from localStorage and set the values of corresponding textarea elements
  function renderStoredData() {
    $(".time-block").each(function () {
      var key = $(this).attr("id");
      var value = localStorage.getItem(key);
      if (value) {
        $(this).find(".description").val(value);
      }
    });
  }
  renderStoredData();

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Update the hourly status every minute to reflect the current hour
  setInterval(function () {
    updateHourlyStatus();
  }, 60000); // 60000 milliseconds = 1 minute

  // Function to display the message
  function showMessage() {
    var message = $("<div>")
      .text("Appointment added to local storage")
      .addClass("message")
      .append('<i class="fas fa-check-circle" style="color: green; margin-left: 5px;"></i>');
    $("#currentDay").append(message);
    // Remove the message after 10 seconds
    setTimeout(function () {
      $(".message").remove();
    }, 10000);
  }
});