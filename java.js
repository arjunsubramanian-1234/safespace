// These are variables to remember things
    var victimName="";
    var bullyName="";
    var fullStory="";//We will save all text here
    var step= 0;//Which question are we on?
    var score = 0;//Is the report genuine?

    // 1. THIS HAPPENS WHEN YOU CLICK 'NEXT' IN PART 1
    function gotoPart2(){
        // Get the name from the box
        victimName = documents.getElementById("myInputName").value;

        if (victimName == "") {
                alert("Please type your name first!");
            } else {
                // Hide Part 1, Show Part 2
                document.getElementById("part1").style.display = "none";
                document.getElementById("part2").style.display = "block";
               
                // Start the story file
                fullStory = "REPORT BY: " + victimName + "\n----------------\n";
            }
    }

