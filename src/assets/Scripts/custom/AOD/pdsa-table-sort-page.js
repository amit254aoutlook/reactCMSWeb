$(document).ready(function () {
  // Connect to any elements that have 'data-pdsa-action'
    $("[data-pdsa-action]").on("click", function (e) {
        
    e.preventDefault();
   
    // Fill in hidden fields with action and argument to post back to model
    $("#EventCommand").val($(this).attr("data-pdsa-action"));
    $("#EventArgument").val($(this).attr("data-pdsa-val"));
    
    // Use the switch statement to get and set any special parameters
    switch ($("#EventCommand").val()) {
      case "sort":
        // Store the last sort expression
        $("#LastSortExpression").val($("#SortExpression").val());
        // Get the new sort expression
        $("#SortExpression").val($(this).data("pdsa-val"));
        // Set the new sort direction
        $("#SortDirectionNew").val($(this).data("pdsa-direction"));
        break;
    }

    // Submit form with hidden values filled in
    $("form").submit();
  });
});
