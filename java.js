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
    // 2. THIS HAPPENS WHEN YOU CLICK A NAME
        function startChat(name) {
            bullyName = name;
            fullStory = fullStory + "ACCUSED: " + bullyName + "\n\n";

            // Hide Part 2, Show Part 3
            document.getElementById("part2").style.display = "none";
            document.getElementById("part3").style.display = "block";

            // AI says hello
            addAiMessage("Hello. You selected " + bullyName + ". Please describe what happened.");
            step = 1;
        }

        // 3. THIS HAPPENS WHEN YOU CLICK 'SEND'
        function sendMessage() {
            // Get what the user typed
            var input = document.getElementById("userMessage");
            var text = input.value;
           
            if (text == "") return; // Stop if empty

            // Add user text to screen and story
            var chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += "<p style='color:blue'><b>You:</b> " + text + "</p>";
            fullStory += "You: " + text + "\n";
            input.value = ""; // Clear box

            // SCORING: If they type a long answer, it's more likely true (+10 points)
            if (text.length > 5) {
                score = score + 10;
            }

            // AI LOGIC (The Robot Brain)
            var aiText = "";
            var finished = false;

            if (step == 1) {
                aiText = "What date and time did this happen?";
                step = 2;
            }
            else if (step == 2) {
                // Check if they used numbers (like 2pm or 12th)
                if (text.match(/\d+/)) {
                    score = score + 10; // Extra points for details
                }
                aiText = "Did anyone else see this happen? (Yes/No)";
                step = 3;
            }
            else if (step == 3) {
                if (text.includes("Yes") || text.includes("yes")) {
                    aiText = "Please tell me the name of the witness.";
                } else {
                    aiText = "Okay. Describe exactly what they did.";
                }
                step = 4;
            }
            else {
                aiText = "Thank you. I am checking the details now...";
                finished = true;
            }

            // Wait 1 second (1000ms) then show AI reply
            setTimeout(function() {
                addAiMessage(aiText);
               
                if (finished == true) {
                    showResult(); // Go to the end
                }
            }, 1000);
        }

        // Helper function to add AI text to screen
        function addAiMessage(message) {
            var chatBox = document.getElementById("chatBox");
            chatBox.innerHTML += "<p><b>AI:</b> " + message + "</p>";
            fullStory += "AI: " + message + "\n";
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll down
        }

        // 4. SHOW RESULT AND DOWNLOAD FILE
        function showResult() {
            document.getElementById("part3").style.display = "none";
            document.getElementById("part4").style.display = "block";

            var opinionText = "";
            var box = document.getElementById("opinionBox");

            // Check the score
            if (score >= 20) {
                opinionText = "AI OPINION: This report looks GENUINE (Good Details).";
                box.style.backgroundColor = "lightgreen";
            } else {
                opinionText = "AI OPINION: Not enough details. Please meet a teacher.";
                box.style.backgroundColor = "pink";
            }
           
            box.innerHTML = opinionText;
            fullStory += "\n" + opinionText;

            // Run the download code
            downloadMyFile();
        }

        // 5. THE MAGIC CODE TO DOWNLOAD FILE
        function downloadMyFile() {
            var blob = new Blob([fullStory], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = victimName + "_Report.txt"; // Name the file
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

    
