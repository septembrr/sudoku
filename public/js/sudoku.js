/**
 * Javascript Input Actions
 */

// Check puzzle after it has been filled in
$("#puzzleForm").submit(function(e){
    e.preventDefault();

    // Get entry values
    let tempFields = [];
    for (let field of $(".sudoku-field")) {
        tempFields.push($(field).val());
    }

    let fields = [];
    while (tempFields.length) {
        fields.push(tempFields.splice(0,9));
    }

    // Send request to /check to validate entry
    $.ajax({
        url: "/check",
        method: "POST",
        data: {"sudoku": fields},
        success: function(res) {
            let result = Boolean(res);

            $("#result").show();
            $("#result").removeClass("invalid").removeClass("valid");

            if (result) {
                $("#result").text("Puzzle is valid!");
                $("#result").addClass("valid");
            } else {
                $("#result").text("Puzzle is not valid or has invalid characters.");
                $("#result").addClass("invalid");
            }
        }
    });
});

// Fill puzzle with solution
$("#fillPuzzle").click(function(e){
    e.preventDefault();

    let solved = [
        4, 3, 5, 2, 6, 9, 7, 8, 1,
        6, 8, 2, 5, 7, 1, 4, 9, 3,
        1, 9, 7, 8, 3, 4, 5, 6, 2,
        8, 2, 6, 1, 9, 5, 3, 4, 7,
        3, 7, 4, 6, 8, 2, 9, 1, 5,
        9, 5, 1, 7, 4, 3, 6, 2, 8,
        5, 1, 9, 3, 2, 6, 8, 7, 4,
        2, 4, 8, 9, 5, 7, 1, 3, 6,
        7, 6, 3, 4, 1, 8, 2, 5, 9
    ];

    let i = 0;
    for (let field of $(".sudoku-field")) {
        $(field).val(solved[i]);
        i++;
    }

    $("#result").hide();
});

// Reset puzzle to original state
$("#resetPuzzle").click(function(e){
    e.preventDefault();

    let original = [
        "", "", "", 2, 6, "", 7, "", 1,
        6, 8, "", "", 7, "", "", 9, "",
        1, 9, "", "", "", 4, 5, "", "",
        8, 2, "", 1, "", "", "", 4, "",
        "", "", 4, 6, "", 2, 9, "", "",
        "", 5, "", "", "", 3, "", 2, 8,
        "", "", 9, 3, "", "", "", 7, 4,
        "", 4, "", "", 5, "", "", 3, 6,
        7, "", 3, "", 1, 8, "", "", ""
    ];

    let i = 0;
    for (let field of $(".sudoku-field")) {
        $(field).val(original[i]);
        i++;
    }

    $("#result").hide();
});

// Remove results display when input changes
$(".sudoku-field").change(function(e) {
    $("#result").hide();
});