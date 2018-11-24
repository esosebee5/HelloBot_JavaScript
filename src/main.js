// full functionality only works properly in the Microsoft Edge browser

YUI().use("node", function(Y) {

    var name;

    var COMMANDS = [
        {
            name: "1",
            handler: clock
        },
        {
            name: "2",
            handler: calculateAge
        },
        {
            name: "end",
            handler: function(e) {
                outputToConsole("User ended process.");
                window.close();
            }
        }
    ];

    function getInputLine() {
        // get
        var inField = Y.one("#in");
        var input = inField.get("value");
        var parts = input.replace(/\s+/g, " ").split(" ");

        // cleanup
        inField.set("value", "");

        // return
        return parts;
    }

    function processInput() {

        var parts = getInputLine();

        if (parts.length == 1) {
            var arg = parts[0];

            for (var i = 0; i < COMMANDS.length; i++) {
                if (arg === COMMANDS[i].name) {
                    COMMANDS[i].handler(arg);
                    return;
                }
            }
        }
    }

    function clock() {
        startApp();

        var dateTime = new Date();
        var time = dateTime.getHours() + ":" + dateTime.getMinutes() 
            + ":" + dateTime.getSeconds();
        outputToConsole("The current time is: " + time.toString());
        
        endApp();
    }

    function calculateAge() {
        startApp();

        // current date
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();

        var birthMonth = getBirthMonth();
        //outputToConsole("birth month number: " + birthMonth);
        
        var birthDay = getBirthDay(birthMonth);
        //outputToConsole("birth day: " + birthDay);

        var birthYear = getBirthYear(currentYear);
        //outputToConsole("birth year: " + birthYear);

        var age = 0;
        if (birthMonth < currentMonth || (birthMonth == currentMonth && birthDay <= currentDay)) {
            age = currentYear - birthYear;
        } else {
            age = currentYear - birthYear - 1;
        }

        outputToConsole("You are " + age + " years old.");
        
        endApp();
    }

    function getBirthMonth() {
        var month = 0;

        while (month == 0) {
            var monthStr = prompt("Enter your birth month: ");
            monthStr = monthStr.toLowerCase();
            month = monthStringToNumber(monthStr);
        }

        return month;
    }

    function getBirthDay(month) {
        var day = 0;
        var maxDays = 31;

        if (month == 2) {
            maxDays = 28;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            maxDays = 30;
        }

        while (day == 0) {
            day = prompt("Enter the day of the month: ");

            if (day < 1 || day > maxDays) {
                day = 0;
            }
        }

        return day;
    }

    function getBirthYear(currentYear) {
        var year = 0;

        while (year == 0) {
            year = prompt("Enter your birth year: ");

            if (year < 1 || year > currentYear) {
                year = 0;
            }
        }

        return year;
    }

    function monthStringToNumber(input) {
        var string = input.toLowerCase();
        var shortMonths = ["jan", "feb", "mar", "apr", "may", "jun", 
                        "jul", "aug", "sep", "oct", "nov", "dec"];
        var fullMonths = ["january", "february", "march", "april", "may", 
                        "june", "july", "august", "september", "october", 
                        "november", "december"];
        
        for (var i = 0; i < 12; i++) {
            if (string === shortMonths[i].toString() || string === fullMonths[i].toString()) {
                return i + 1;
            }
        }
        return 0;
    }

    function startApp() {
        outputToConsole("--------------------------------<br>")
    }

    function endApp() {
        outputToConsole("--------------------------------<br><br>")
    }

    function outputToConsole(text) {
        var p = Y.Node.create("<p>" + text + "</p>");
        Y.one("#out").append(p);
        p.scrollIntoView();
    }

    Y.on("domready", function(e) {
        Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));

        // greeting
        var p = Y.Node.create("<p>Welcome to the JavaScipt HelloBot Project!</p><br>");
        Y.one("#out").append(p);
        
        // get name
        name = prompt("Enter name:");
        outputToConsole("Hello, " + name + ".<br><br>");

        // loop through programs
        outputToConsole("Enter '1' for Clock, '2' to Calculate Age, or");
        outputToConsole("enter 'end' to terminate: <br><br>");
        Y.one("#in").on("keydown", function(e) {
            if (e.charCode === 13) {
                processInput();

                // set up next loop
                outputToConsole("Enter '1' for Clock, '2' to Calculate Age, or");
                outputToConsole("enter 'end' to terminate: <br><br>");
            }
        });
    });
});
