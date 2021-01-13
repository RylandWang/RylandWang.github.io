const GITHUB_URL = "https://github.com/RylandWang"
const LINKEDIN_URL = "https://www.linkedin.com/in/ryland-w/"
const EMAIL = "ryland.wang@utoronto.ca"
const ABOUT = "Hi, I'm Ryland Wang. I'm a 4th year computer science student at University of Toronto. When I'm not spending quality time with my computer, I like to walk, play chess, guitar, and read science fiction."

const inputHTML = `<div class="row">
    <span class="username">ryland@machine</span><span class="white">:</span><span
        class="directory">~</span><span class="white">$</span> &nbsp;
    <span><input type="email" class="input" id="input" autocorrect="off" autocapitalize="none"></span>
    </div>`

const helpHTML = `<div>
    <div class="white">List of commands:</div>
    <div class="white">ls - Display all files and directories</div>
    <div class="white">cat &lt;file&gt; - Display the contents of the specified file</div>
    <div class="white">help - Display the list of commands</div>
    </div>`

const lsHTML = `<div class="directory">about github linkedin email</div>`

$(document).ready(() => {
    document.getElementById('terminal').append(createElementFromHTML(inputHTML))
    document.getElementById('input').focus()
    // typing anyting on the keyboard triggers event handler which puts focus on input
    window.addEventListener("keypress", inputEventHandler);
});

const inputEventHandler = e => {
    // put focus on input form
    var input = document.getElementById('input')
    const terminal = document.getElementById('terminal')

    input.focus();

    // if user keys enter
    if (e.keyCode == 13) {
        // parse command
        const values = input.value.split(' ')
        const command = values[0]

        if (command == "ls" && values.length == 1) {
            terminal.append(createElementFromHTML(lsHTML))
        }

        else if (command == "help" && values.length == 1) {
            terminal.append(createElementFromHTML(helpHTML))
        }

        else if (command == "cat") {
            if (values.length > 1) {
                const file = values[1]
                if (file == "about") {
                    terminal.append(createElementFromHTML('<div class="white">' + ABOUT + '</div>'))
                }
                else if (file == "github") {
                    terminal.append(createElementFromHTML('<div ><a href="' + GITHUB_URL + '">' + GITHUB_URL + '</a></div>'))
                }
                else if (file == "linkedin") {
                    terminal.append(createElementFromHTML('<div ><a href="' + LINKEDIN_URL + '">' + LINKEDIN_URL + '</a></div>'))
                }
                else if (file == "email") {
                    terminal.append(createElementFromHTML('<div ><a href=mailto:"' + EMAIL + '">' + EMAIL + '</a></div>'))
                }
                // else if (file == "resume") {
                //     terminal.append(createElementFromHTML('<div ><a href="' + RESUME + '">' + RESUME + '</a></div>'))

                // }
            }
            // terminal.append()
        }

        else {
            terminal.append(createElementFromHTML('<div class="white">' + input.value + ': command not found' + '</div>'))
        }


        // new line of input
        terminal.append(createElementFromHTML('<br>'))
        input.setAttribute("id", "oldInput");
        input.blur() // unfocus old input
        // append and focus on new input
        terminal.append(createElementFromHTML(inputHTML))
        document.getElementById('input').focus()

    }
};

const createElementFromHTML = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}