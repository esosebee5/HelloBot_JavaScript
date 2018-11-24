YUI().use("node", function(Y) {

    var name;
    var state = 1;

    var COMMANDS = [
        {
            name: "do_stuff",
            handler: doStuff
        },
        {
            name: "1",
            handler: clock
        },
        {
            name: "2",
            handler: calculateAge
        },

        {
            name: "greet",
            handler: function(args) {
                outputToConsole("Hello " + args[0] + ", welcome to Console.");
            }
        }
    ];

    function startBot() {

        if (name == null) {
            name = getInputLine();
            outputToConsole("Hello, " + name + ".<br><br>");
        } else {
            processCommand();
        }

        // while (state == 1) {
            outputToConsole("Enter '1' for Clock, '2' to Calculate Age, or");
            outputToConsole("enter 'end' to terminate: ");
        //}

    }

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

    function processCommand() {
        var parts = getInputLine();
        var command = parts[0];
        var args = parts.length > 1 ? parts.slice(1, parts.length) : [];

        for (var i = 0; i < COMMANDS.length; i++) {
            if (command === COMMANDS[i].name) {
                COMMANDS[i].handler(args);
                return;
            }
        }

        outputToConsole("Unsupported Command: " + command);
    }

    function doStuff(args) {
        outputToConsole("I'll just echo the args: " + args);
    }

    function clock() {
        outputToConsole("The current time is: ");
    }

    function calculateAge() {
        outputToConsole("You are _ years old.");
    }

    function outputToConsole(text) {
        var p = Y.Node.create("<p>" + text + "</p>");
        Y.one("#out").append(p);
        p.scrollIntoView();
    }

    Y.on("domready", function(e) {
        Y.one("body").setStyle("paddingBottom", Y.one("#in").get("offsetHeight"));
        Y.one("#in").on("keydown", function(e) {
            if (e.charCode === 13) {
                startBot();
                // processCommand();
            }
        });
    });
});
