let pac_man = {
    x: 1,
    y: 19,
};
let ghost1 = {
    x: 9,
    y: 9,
};
let ghost2 = {
    x: 1,
    y: 1,
};
let ghost3 = {
    x: 17,
    y: 2,
};
let ghost4 = {
    x: 17,
    y: 18,
};

let lives = 3;

let counter = 0;
let eaten = false;

const frameRate = 60;
const framePeriod = (1 / frameRate) * 1000; // period in ms
const speed = 5 / frameRate;
let ticks = 0;

// to check the game over
let pacIsDead = false;
pacManRotate = "";

let GameStarted = false;
let GamePaused = false;

const scoreElement = document.getElementById("score");
let score = 0;

// wall map
let maps = [
    [
        [ "1", "-", "-", "-", "-", "-", "-", "-", "-", "7", "-", "-", "-", "-", "-", "-", "-", "-", "2", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "]", "0", "[", "-", "]", "0", "_", "0", "[", "-", "]", "0", "[", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "]", "0", "^", "0", "[", "-", "7", "-", "]", "0", "^", "0", "[", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "|", "0", "0", "0", "|", "0", "0", "0", "|", "0", "0", "0", "0", "|", ],
        [ "|", "0", "0", "^", "0", "9", "-", "]", "0", "_", "0", "[", "-", "8", "0", "^", "0", "0", "|", ],
        [ "|", "0", "[", "8", "0", "|", "0", "0", "0", "0", "0", "0", "0", "|", "0", "9", "]", "0", "|", ],
        [ "|", "0", "0", "_", "0", "_", "0", "b", "0", "0", "0", "b", "0", "_", "0", "_", "0", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "0", "^", "0", "b", "0", "0", "0", "b", "0", "^", "0", "0", "^", "0", "|", ],
        [ "|", "0", "9", "]", "0", "|", "0", "0", "0", "0", "0", "0", "0", "|", "0", "[", "8", "0", "|", ],
        [ "|", "0", "_", "0", "0", "9", "-", "]", "0", "^", "0", "[", "-", "8", "0", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "|", "0", "0", "0", "|", "0", "0", "0", "|", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "]", "0", "_", "0", "[", "-", "5", "-", "]", "0", "_", "0", "[", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "]", "0", "[", "-", "2", "0", "^", "0", "1", "-", "]", "0", "[", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "-", "-", "]", "0", "_", "0", "|", "0", "_", "0", "[", "-", "-", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "4", "-", "-", "-", "-", "-", "-", "-", "-", "5", "-", "-", "-", "-", "-", "-", "-", "-", "3", ],
    ],
    [
        [ "1", "-", "-", "-", "-", "-", "-", "-", "-", "7", "-", "-", "-", "-", "-", "-", "-", "-", "2", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "-", "-", "-", "-", "]", "0", "_", "0", "[", "-", "-", "-", "-", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "^", "0", "[", "-", "-", "-", "-", "-", "]", "0", "^", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "[", "]", "0", "b", "0", "[", "]", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "_", "0", "_", "0", "[", "-", "]", "0", "[", "-", "]", "0", "_", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "^", "0", "[", "-", "]", "0", "[", "-", "]", "0", "^", "0", "^", "0", "|", ],
        [ "|", "0", "_", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "|", "0", "[", "]", "0", "b", "0", "[", "]", "0", "|", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "_", "0", "[", "-", "-", "-", "-", "-", "]", "0", "_", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", ],
        [ "|", "0", "_", "0", "[", "-", "-", "]", "0", "^", "0", "[", "-", "-", "]", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "[", "-", "-", "]", "0", "b", "0", "|", "0", "b", "0", "[", "-", "-", "]", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "4", "-", "-", "-", "-", "-", "-", "-", "-", "5", "-", "-", "-", "-", "-", "-", "-", "-", "3", ],
    ],
    [
        [ "1", "-", "-", "-", "-", "-", "-", "-", "-", "7", "-", "-", "-", "-", "-", "-", "-", "-", "2", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "1", "-", "-", "-", "-", "]", "0", "_", "0", "[", "-", "-", "-", "-", "2", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "1", "-", "-", "-", "]", "0", "[", "-", "-", "-", "2", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "1", "-", "]", "0", "[", "-", "2", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "_", "0", "_", "0", "_", "0", "^", "0", "^", "0", "_", "0", "_", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "^", "0", "[", "-", "8", "0", "9", "-", "]", "0", "^", "0", "^", "0", "|", ],
        [ "|", "0", "_", "0", "|", "0", "0", "0", "|", "0", "|", "0", "0", "0", "|", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "|", "0", "^", "0", "_", "0", "_", "0", "^", "0", "|", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "|", "0", "|", "0", "0", "0", "0", "0", "|", "0", "|", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "4", "-", "]", "0", "[", "-", "3", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "4", "-", "-", "-", "]", "0", "[", "-", "-", "-", "3", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", ],
        [ "|", "0", "4", "-", "-", "-", "-", "]", "0", "^", "0", "[", "-", "-", "-", "-", "3", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "4", "-", "-", "-", "-", "-", "-", "-", "-", "5", "-", "-", "-", "-", "-", "-", "-", "-", "3", ],
    ],
     [
        [ "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "b", "0", "[", "]", "0", "b", "0", "[", "]", "0", "b", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", ],
        [ "|", "0", "_", "0", "[", "-", "]", "0", "[", "-", "-", "]", "0", "[", "]", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "^", "0", "b", "0", "b", "0", "b", "0", "b", "0", "^", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "|", "0", "|", ],
        [ "|", "0", "_", "0", "_", "0", "b", "0", "^", "0", "^", "0", "b", "0", "_", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "_", "0", "_", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "b", "0", "b", "0", "0", "0", "0", "0", "b", "0", "b", "0", "^", "0", "|", ],
        [ "|", "0", "_", "0", "0", "0", "0", "0", "^", "0", "^", "0", "0", "0", "0", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "^", "0", "b", "0", "_", "0", "_", "0", "b", "0", "^", "0", "0", "0", "|", ],
        [ "|", "0", "^", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", "0", "^", "0", "|", ],
        [ "|", "0", "|", "0", "_", "0", "[", "]", "0", "b", "0", "[", "]", "0", "_", "0", "|", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "_", "0", "|", ],
        [ "|", "0", "|", "0", "[", "-", "]", "0", "[", "-", "-", "]", "0", "[", "]", "0", "0", "0", "|", ],
        [ "|", "0", "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "^", "0", "|", ],
        [ "|", "0", "_", "0", "b", "0", "[", "]", "0", "b", "0", "[", "]", "0", "b", "0", "_", "0", "|", ],
        [ "|", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "|", ],
        [ "4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3", ],
    ],
];

var startTime;

function startGame() {
    // Record the start time
    startTime = performance.now();
}

function endGame() {
    // Calculate the elapsed time
    var endTime = performance.now();
    var elapsedTime = endTime - startTime;

    // Convert the elapsed time to the desired format (e.g., minutes and seconds)
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
}

function ChangemapsTo(index) {
    window.location.href = "../templates/index.html?map=" + index;
}

const query = new URL(location.href).searchParams;
const mapsNumber = query.get('map') ?? '0';

let map = maps[mapsNumber];

// to push into the HTML
let completeMap = [];
let food_arr = [];

function openOverlay() {
    document.getElementById("overlay").style.display = "flex";
    GamePaused = true;
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    GamePaused = false;
}

function reternToLevels() {
    window.location.href = "../templates/maps.html";
}

function reternToHome() {
    window.location.href = "../home.html";
}

function goToGraph() {
    window.location.href = "./templates/maps.html";
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (
            map[i][j] == "1" ||
            map[i][j] == "3" ||
            map[i][j] == "4" ||
            map[i][j] == "6" ||
            map[i][j] == "8" ||
            map[i][j] == "9" ||
            map[i][j] == "2" ||
            map[i][j] == "-" ||
            map[i][j] == "|" ||
            map[i][j] == "b" ||
            map[i][j] == "[" ||
            map[i][j] == "]" ||
            map[i][j] == "+" ||
            map[i][j] == "^" ||
            map[i][j] == "_" ||
            map[i][j] == "7" ||
            map[i][j] == "5"
        ) {
            // w is for wall, f is for food
            w = true;
            f = false;
        } else {
            w = false;
            f = true;
        }
        completeMap.push({
            w,
            Type: map[i][j],
            f,
            x: i + 1,
            y: j + 1,
        });
    }
}

completeMap.forEach((e, index) => {
    let wallElement = document.createElement("div");

    if (e.w) {
        // create wall in the HTML
        wallElement.style.left = e.y * 40 + "px";
        wallElement.style.top = e.x * 40 + "px";
        wallElement.style.backgroundImage = ReturnImage(e.Type);
        wallElement.classList.add("wall");
    } else if (e.f) {
        wallElement.style.left = e.y * 40 + 17 + "px";
        wallElement.style.top = e.x * 40 + 15 + "px";
        wallElement.classList.add("food");
        food_arr.push({
            eaten: false,
            element: wallElement,
            x: e.x,
            y: e.y,
        });
    }
    divMap.appendChild(wallElement);
});

function ReturnImage(symbol) {
    switch (symbol) {
        case "1":
            return 'url("../static/images/pipeCorner1.png")';
        case "2":
            return 'url("../static/images/pipeCorner2.png")';
        case "3":
            return 'url("../static/images/pipeCorner3.png")';
        case "4":
            return 'url("../static/images/pipeCorner4.png")';
        case "-":
            return 'url("../static/images/pipeHorizontal.png")';
        case "|":
            return 'url("../static/images/pipeVertical.png")';
        case "b":
            return 'url("../static/images/block.png")';
        case "[":
            return 'url("../static/images/capLeft.png")';
        case "]":
            return 'url("../static/images/capRight.png")';
        case "+":
            return 'url("../static/images/pipeCross.png")';
        case "_":
            return 'url("../static/images/capBottom.png")';
        case "^":
            return 'url("../static/images/capTop.png")';
        case "7":
            return 'url("../static/images/pipeConnectorBottom.png")';
        case "5":
            return 'url("../static/images/pipeConnectorTop.png")';
        case "6":
            return 'url("../static/images/pipeConnectorDownwards.png")';
        case "8":
            return 'url("../static/images/pipeConnectorLeft.png")';
        case "9":
            return 'url("../static/images/pipeConnectorRight.png")';
        default:
            return ""; // Add a default case and specify the return value
    }
}

function restart() {
    location.reload();
    return;
}

/********* Actors Stuff *********/

// the directions ?
const Direction = {
    right: "right",
    left: "left",
    up: "up",
    down: "down",
};

// pacman rotate
const DirectionTransfrom = {
    right: "rotate(-90deg)",
    left: "rotate(90deg)",
    up: "rotate(180deg)",
    down: "rotate(360deg)",
};

// ghosts random direction
const randomDirection = () => {
    return Direction[
        Object.keys(Direction)[Math.floor(Math.random() * Object.keys(Direction).length)]
    ];
};

// crearet each ghost and pacman with it's position
// one function to create the ghostes and pacman and append it in the html
function createActors(dot, type, direction) {
    pacElement = document.createElement("div");
    pacElement.classList.add(type);

    pacElement.style.width = "30px";
    pacElement.style.height = "30px";

     divMap.append(pacElement);

    return {
        element: pacElement,
        direction: direction,
        x: dot.x,
        y: dot.y,
    };
}

// to change the actor direction/ move the actor
function redrawActor(actor) {
    const x = actor.x;
    const y = actor.y;

    const ele = actor.element;

    // change the position of the actor in the html instead of deletting t and recreate it
    ele.style.left = x * 40 + 45 + "px";
    ele.style.top = y * 40 + 45 + "px";

    // to change the rotateion
    if (actor == pac_a) ele.style.transform = DirectionTransfrom[actor.direction];
}

// actors
// create each actorr and append it in the html as a dev
let pac_a = createActors(pac_man, "pac", Direction.right);
let ghost1_a = createActors(ghost1, "ghost1", Direction.down);
let ghost2_a = createActors(ghost2, "ghost2", Direction.down);
let ghost3_a = createActors(ghost3, "ghost3", Direction.down);
let ghost4_a = createActors(ghost4, "ghost4", Direction.down);

// arrays that haveing all the ghostes/actors
let ghosts_arr = [ghost1_a, ghost2_a, ghost3_a, ghost4_a];
let actors = [pac_a, ghost1_a, ghost2_a, ghost3_a, ghost4_a];

/********* Engine Stuff *********/
let pacmanNewDirection = pac_a.direction;

// if the user pressed a key the direction will change depending in what key pressed
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            GamePaused = !GamePaused;
            break;
        case "Enter":
            GameStarted = true;
            startGame();
            break;
        case "ArrowRight":
        case "d":
            pacmanNewDirection = Direction.right;
            break;
        case "ArrowLeft":
        case "a":
            pacmanNewDirection = Direction.left;
            break;
        case "ArrowUp":
        case "w":
            pacmanNewDirection = Direction.up;
            break;
        case "ArrowDown":
        case "s":
            pacmanNewDirection = Direction.down;
            break;
    }
});

// provide new cords and tell you if it's clipping
// will change the directoin according to the key that the player pressed
function newCord(actor, direction) {
    // pacman's current position
    let x = actor.x;
    let y = actor.y;

    // outer bound check
    // to check the borders of the game ,
    // I don't think that we actually need it because the game work just fine without it
    if (x > 17) {
        x = 17;
    } else if (x < 1) {
        x = 1;
    }

    if (y > 19) {
        y = 19;
    } else if (y < 1) {
        y = 1;
    }

    let newPart;
    let didClip = false;

    // will check if there is wall acording to the direction , if there is { "0"  or  " food " }
    // the directions will change ( x or y )
    switch (direction) {
        case Direction.up:
            newPart = Math.floor(y - speed);
            x = Math.round(x);

            if (map[newPart][x] == "0") y = y - speed;
            else {
                y = Math.floor(y);
                didClip = true;
            }

            break;

        case Direction.down:
            newPart = Math.ceil(y + speed);
            x = Math.round(x);

            if (map[newPart][x] == "0") y = y + speed;
            else {
                y = Math.ceil(y);
                didClip = true;
            }

            break;

        case Direction.right:
            newPart = Math.ceil(x + speed);
            y = Math.round(y);

            if (map[y][newPart] == "0") x = x + speed;
            else {
                x = Math.ceil(x);
                didClip = true;
            }

            break;

        case Direction.left:
            newPart = Math.floor(x - speed);
            y = Math.round(y);

            if (map[y][newPart] == "0") x = x - speed;
            else {
                x = Math.floor(x);
                didClip = true;
            }
            break;
    }

    return {
        x: x,
        y: y,
        direction: direction,
        didClip: didClip,
    };
}

// majorTick is when a actor moved 1 seuqre in the game
const majorTick = () => ticks % (1 / speed) == 0;

// to change the ghostes and pacman direction in a time
function updateActors() {
    for (const actor of ghosts_arr) {
        let cord;
        let newDirection = majorTick() ? randomDirection() : actor.direction;

        // keep ghost for switching direction too much
        // to find the cord/new cord for each ghost
        while (cord == undefined || cord.didClip) {
            if (newDirection != actor.direction)
                if (
                    newCord(actor, newDirection).didClip ||
                    (actor.direction == Direction.up && newDirection == Direction.down) ||
                    (actor.direction == Direction.down && newDirection == Direction.up) ||
                    (actor.direction == Direction.right && newDirection == Direction.left) ||
                    (actor.direction == Direction.left && newDirection == Direction.right)
                ) {
                    newDirection = actor.direction;
                }
            // change the direction of the cord , if it's not clippint th ewhile loop will pause and move
            // to the next step wich is redraw thw ghost
            cord = newCord(actor, newDirection);
            newDirection = randomDirection(); // used on repeat cycles
        }
        // changing the ghost postition
        actor.direction = cord.direction;
        actor.x = cord.x;
        actor.y = cord.y;
        // redraw the ghost
        redrawActor(actor);
        isPacmanEaten();
    }

    // changing pacman position and redraw it according the the pressed direction
    let pacDirection = majorTick() ? pacmanNewDirection : pac_a.direction;
    let cord = newCord(pac_a, pacDirection);

    pac_a.direction = cord.direction;
    pac_a.x = cord.x;
    pac_a.y = cord.y;

    redrawActor(pac_a);

    if (eaten) {
        counter++;
        if (counter == 60) {
            counter = 0;
            eaten = false;
        }
    }
}

function isPacmanEaten() {
    /* const width = 30
    const height = 30

    // 2D collision detection
    // https://devdoc.net/web/developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection.html

    for (const ghost of ghosts_arr) {
        let px = pac_a.x
        let py = pac_a.y

        let gx = ghost.x
        let gy = ghost.y

        if (px < gx + width &&
            px + width > gx.x &&
            py < gy + height &&
            height + py > gy) {
            alert("game over")
            location.reload()
        }
    } */
    // TODO make detection easier
    // if the ghost pos == pacman pos then >> game over
    for (const ghost of ghosts_arr) {
        let px = Math.round(pac_a.x);
        let py = Math.round(pac_a.y);

        let gx = Math.round(ghost.x);
        let gy = Math.round(ghost.y);

        if (px == gx && py == gy && counter == 0 && !eaten) {
            eaten = true;
            if (lives > 1) {
                lives--;
                var livesElement = document.getElementById("lives");
                livesElement.innerHTML = 3 - lives;
                counter++;
                return;
            } else {
                endGame();
                document.getElementById("overlayFail").style.display = "flex";
                GamePaused = true;
                return;
            }
        }
    }
}

function EnterYourName() {
    document.getElementById("overlayWin").style.display = "none";
    document.getElementById("overlayFail").style.display = "none";
    document.getElementById("enterUrName").style.display = "block";
}

function didPacmanEat() {
    // will check if pacman Eaten at major ticks
    // will stop after finding one eaten item
    if (!majorTick()) return;

    for (let i = 0; i < food_arr.length; i++) {
        const food = food_arr[i];

        const px = Math.round(pac_a.x);
        const py = Math.round(pac_a.y);

        const fx = Math.round(food.x) - 1;
        const fy = Math.round(food.y) - 1;

        // the x& y are filped
        if (px == fy && py == fx && food.eaten == false) {
            score += 10;
            food.element.remove();
            food_arr.splice(i, 1);
            scoreElement.innerHTML = score;
            break; // only one food item is eaten
        }
    }
}

const InnerTime = document.getElementById("time");

let formattedTime;

function UpdateTime() {
    // Calculate the elapsed time
    var endTime = performance.now();
    var elapsedTime = endTime - startTime;

    // Convert the elapsed time to the desired format (e.g., minutes and seconds)
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var date = new Date();
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    formattedTime = date.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
    InnerTime.innerHTML = (formattedTime);

}

actors.map((a) => redrawActor(a));
function Engine() {
    if (!GameStarted || GamePaused) return;

    // console.log(pac_a.x, pac_a.y, map[0].length, map.length)
    isPacmanEaten();
    didPacmanEat(); // :)
    updateActors();
    UpdateTime();

    if (food_arr.length == 0) {
        endGame();
        document.getElementById("overlayWin").style.display = "flex";
        GameStarted = false;
        GamePaused = true;
    }

    ticks++;
}


// // Populate the hidden input fields with the score and time values
// document.getElementById("scoreInput").value = score;
// document.getElementById("timeInput").value = time;

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let previousTimeStamp = 0;

const margin = 1; // a one ms marin for the frame
const frameWindow = framePeriod - margin;

function step(timeStamp) {
    // the use of timeStamp to ensure a fixed frameRate
    const elapsed = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;

    if (elapsed >= frameWindow) Engine();

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

let pageSize = 5; 
let ScoreData;
let totalData;
let totalPages;
let currentPage = 1; // Initialize the current page index


function submitForm(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the form values
    var userName = document.getElementById('userNameInput').value;

    var formData = new FormData();
    formData.append('userName', userName);
    formData.append('score', score);
    formData.append('time', formattedTime);

    // Display the result div
    document.getElementById('enterUrName').style.display = 'none';
    document.getElementById('ScoreList').style.display = 'block';

    // Send the form data to the Go server
    fetch('http://localhost:8080/formSubmit', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            ScoreData = data;
            totalData = Object.keys(ScoreData).length; // Get the total number of data
            totalPages = Math.ceil(totalData / pageSize); // Calculate the total number of pages

            displayScores(data, 1, pageSize); // Pass the response data to the displayScores function
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayScores(data, page, pageSize) {
    // console.log('Received data:', data); // Log the received data to check its structure
  
    const scoreBody = document.getElementById('score-body'); // Get the <tbody> element
  
    scoreBody.innerHTML = ''; // Clear the existing contents of the <tbody>
  
    // Calculate the starting and ending index based on the page and pageSize
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;


    // Update the page numbers in the HTML
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = page + '/' + totalPages;

    const nextButtonElement = document.getElementById('next');
    const previousButtonElement = document.getElementById('previous');

    if (page === 1) {
        previousButtonElement.style.color = 'gray';
        previousButtonElement.style.pointerEvents = 'none';
        previousButtonElement.style.cursor = 'default';
        previousButtonElement.style.textDecoration = 'none';
        previousButtonElement.style.transform = 'none';
        previousButtonElement.style.textShadow = 'none';
    } else {
        previousButtonElement.style.color = ''; // Reset to default color
        previousButtonElement.style.pointerEvents = '';
        previousButtonElement.style.cursor = '';
        previousButtonElement.style.textDecoration = '';
        previousButtonElement.style.transform = '';
        previousButtonElement.style.textShadow = '';
    }

    if (page === totalPages) {
        nextButtonElement.style.color = 'gray';
        nextButtonElement.style.pointerEvents = 'none';
        nextButtonElement.style.cursor = 'default';
        nextButtonElement.style.textDecoration = 'none';
        nextButtonElement.style.transform = 'none';
        nextButtonElement.style.textShadow = 'none';
    } else {
        nextButtonElement.style.color = ''; // Reset to default color
        nextButtonElement.style.pointerEvents = '';
        nextButtonElement.style.cursor = '';
        nextButtonElement.style.textDecoration = '';
        nextButtonElement.style.transform = '';
        nextButtonElement.style.textShadow = '';
    }
  
    // Generate list items and append them to the tbody element
    if (typeof data === 'object') {
      let rank = startIndex + 1;
      let count = 0; // Track the number of rows generated
  
      for (const key in data) {
        if (count >= startIndex && count < endIndex) {
          const row = document.createElement('tr');
          const keyCell = document.createElement('td');
          const valueCell = document.createElement('td');
          const valueCell2 = document.createElement('td');
          const valueCell3 = document.createElement('td');
  
          keyCell.textContent = rank++;
          valueCell.textContent = getValueAsString(data[key]).name;
          valueCell2.textContent = getValueAsString(data[key]).score;
          valueCell3.textContent = getValueAsString(data[key]).time;
  
          row.appendChild(keyCell);
          row.appendChild(valueCell);
          row.appendChild(valueCell2);
          row.appendChild(valueCell3);
  
          scoreBody.appendChild(row);
        }
  
        count++; // Increment the count of generated rows
  
        if (count >= endIndex) {
          break; // Stop generating rows if we reach the end index
        }
      }
    } else {
      console.error('Invalid data format. Expected an array or an object.');
    }
}

function getValueAsString(value) {
    if (typeof value === 'object' && value !== null) {
        // Handle nested objects
        return JSON.parse(JSON.stringify(value));
    } else {
        return String(value);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
      currentPage++; // Increment the current page index
      displayScores(ScoreData, currentPage, pageSize);
    }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--; // Decrement the current page index
    displayScores(ScoreData, currentPage, pageSize);
  }
}
