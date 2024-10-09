function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// The possible values of each feature
const colors = ["#72C264", "#FAC44C", "#EF5169"];
const shadings = ["solid", "striped", "open"];
const shapes = ["circle", "tree", "star"];
const numbers = [1, 2, 3];

// Generates a random bauble
const generateBauble = () => ({
    color: pick(colors),
    shading: pick(shadings),
    shape: pick(shapes),
    number: pick(numbers),
    selected: false
});

// Generates a random bauble that's not in the given array
const generateBaubleNotInArray = (array) => {
    const bauble = generateBauble();
    if (!baubleIsInArray(array, bauble)) return bauble;
    return generateBaubleNotInArray(array);
};

// Check is bauble is already in array or not
const baubleIsInArray = (baubles, bauble) =>
    baubles.find(
        (b) =>
            b.color == bauble.color &&
            b.shading == bauble.shading &&
            b.shape == bauble.shape &&
            b.number == bauble.number
    );

const generateBaubles = () => {
    const baubles = [];
    while (baubles.length < 12) {
        const bauble = generateBaubleNotInArray(baubles);
        baubles.push(bauble);
    }
    if (thereIsAtLeastOneSet(baubles)) return baubles;
    return generateBaubles();
};

const replaceSet = (baubles) => {
    const newBaubles = [];
    const remainingBaublesUnordered = baubles.filter((b) => !b.selected);
    baubles.forEach((b) => {
        if (!b.selected) return newBaubles.push(b);

        const newBauble = generateBaubleNotInArray(remainingBaublesUnordered);
        remainingBaublesUnordered.push(newBauble);
        newBaubles.push(newBauble);
    });

    if (thereIsAtLeastOneSet(newBaubles)) return newBaubles;
    return replaceSet(baubles);
};

const selectBauble = (baubles, index) =>
    baubles.map((b, i) => (i == index ? { ...b, selected: !b.selected } : b));

const getSet = (baubles) => {
    for (let i1 = 0; i1 < baubles.length - 2; i1++) {
        for (let i2 = i1 + 1; i2 < baubles.length - 1; i2++) {
            for (let i3 = i2 + 1; i3 < baubles.length; i3++) {
                if (itIsASet(baubles[i1], baubles[i2], baubles[i3])) {
                    console.log("Psst! Here's a solution:", i1 + 1, i2 + 1, i3 + 1);
                    return [i1, i2, i3];
                }
            }
        }
    }

    return undefined;
};

const thereIsAtLeastOneSet = (baubles) => {
    return getSet(baubles) != undefined;
};

const highlightSet = (baubles) => {
    const setIndexes = getSet(baubles);

    const newBaubles = baubles.map((b, i) => {
        if (setIndexes.includes(i))
            return {
                ...b,
                selected: true
            };
        return b;
    });

    return newBaubles;
};

const itIsASet = (bauble1, bauble2, bauble3) => {
    const {
        colorsFitCriteria,
        shadingsFitCriteria,
        shapesFitCriteria,
        numberFitCriteria
    } = getCriteria(bauble1, bauble2, bauble3);

    return (
        colorsFitCriteria &&
        shadingsFitCriteria &&
        shapesFitCriteria &&
        numberFitCriteria
    );
};

const getCriteria = (bauble1, bauble2, bauble3) => {
    const selectedColors = [bauble1.color, bauble2.color, bauble3.color];
    const selectedShadings = [bauble1.shading, bauble2.shading, bauble3.shading];
    const selectedShapes = [bauble1.shape, bauble2.shape, bauble3.shape];
    const selectedNumbers = [bauble1.number, bauble2.number, bauble3.number];

    return {
        colorsFitCriteria:
            allTheSame(selectedColors) || allDifferent(selectedColors),
        shadingsFitCriteria:
            allTheSame(selectedShadings) || allDifferent(selectedShadings),
        shapesFitCriteria:
            allTheSame(selectedShapes) || allDifferent(selectedShapes),
        numberFitCriteria:
            allTheSame(selectedNumbers) || allDifferent(selectedNumbers)
    };
};

const threeBaublesAreSelected = (baubles) =>
    baubles.filter((b) => b.selected).length == 3;

const allTheSame = (values) => values[0] == values[1] && values[0] == values[2];

const allDifferent = (values) =>
    values[0] != values[1] && values[0] != values[2] && values[1] != values[2];

const demoBaubles = [
    {
        color: "#FAC44C",
        shading: "striped",
        shape: "circle",
        number: 2,
        selected: false
    },
    {
        color: "#FAC44C",
        shading: "open",
        shape: "tree",
        number: 2,
        selected: true
    },
    {
        color: "#EF5169",
        shading: "striped",
        shape: "tree",
        number: 3,
        selected: true
    },
    {
        color: "#EF5169",
        shading: "open",
        shape: "tree",
        number: 3,
        selected: false
    },
    {
        color: "#FAC44C",
        shading: "solid",
        shape: "tree",
        number: 1,
        selected: false
    },
    {
        color: "#EF5169",
        shading: "striped",
        shape: "circle",
        number: 1,
        selected: false
    },
    {
        color: "#FAC44C",
        shading: "open",
        shape: "circle",
        number: 2,
        selected: false
    },
    {
        color: "#72C264",
        shading: "striped",
        shape: "star",
        number: 2,
        selected: false
    },
    {
        color: "#EF5169",
        shading: "solid",
        shape: "circle",
        number: 2,
        selected: false
    },
    {
        color: "#72C264",
        shading: "solid",
        shape: "tree",
        number: 2,
        selected: false
    },
    {
        color: "#72C264",
        shading: "solid",
        shape: "tree",
        number: 1,
        selected: true
    },
    {
        color: "#FAC44C",
        shading: "solid",
        shape: "tree",
        number: 3,
        selected: false
    }
];

function App() {
    const [baubles, setBaubles] = React.useState(demoBaubles);
    const [score, setScore] = React.useState(0);
    const [phase, setPhase] = React.useState("demo");

    const select = (index) => {
        if (phase == "demo") return;
        let newBaubles = selectBauble(baubles, index);

        if (threeBaublesAreSelected(newBaubles)) {
            const selectedBaubles = newBaubles.filter((b) => b.selected);

            // If the three selected baubles are a set then replace them
            if (
                itIsASet(selectedBaubles[0], selectedBaubles[1], selectedBaubles[2])
            ) {
                setScore(score + 1);
                newBaubles = replaceSet(newBaubles);
            } else {
                // If the three selected baubles are not a set then the player failed
                setPhase("failed");
            }
        }

        setBaubles(newBaubles);
    };

    const start = () => {
        // Start the game
        setBaubles(generateBaubles());
        setPhase("game");
    };

    const timeUp = () => {
        // Highlight the possible set
        setBaubles(highlightSet(baubles));
        setPhase("time-up");
    };

    return (
        <div className="container">
            <div className={"grid " + phase}>
                {baubles.map(({ color, shading, shape, number, selected }, index) => (
                    <Bauble
                        key={`${index}-${color}-${shading}-${shape}-${number}`}
                        index={index}
                        color={color}
                        shading={shading}
                        shape={shape}
                        number={number}
                        selected={selected}
                        select={select}
                    />
                ))}
            </div>
            {phase == "demo" && (
                <div className="sidebar">
                    <p className="less-important">
                        This game is based on the card game{" "}
                        <b>
                            <a
                                href="https://en.wikipedia.org/wiki/Set_(card_game)"
                                target="_blank"
                            >
                                Set
                            </a>
                        </b>
                        .
                    </p>
                    <p>Pick a set of three baubles where the following is true:</p>
                    <p>
                        For each one of the four categories of features — color, number,
                        shape, and shading — the three baubles must display that feature as
                        a) either all the same, or b) all different.
                    </p>
                    <p>
                        This example is a set, because they all have <b>different colors</b>
                        , they all have <b>different numbers</b>, they all have the{" "}
                        <b>same shape</b> and they all have <b>different shading</b>.
                    </p>
                    <button onClick={start}>Start</button>
                </div>
            )}
            {phase == "game" && (
                <div className="sidebar">
                    <Score score={score} />
                    <Timer key={score} timeUp={timeUp} />

                    <p>
                        For each one of the four categories of features — color, number,
                        shape, and shading — the three baubles must display that feature as
                        a) either all the same, or b) all different.
                    </p>
                </div>
            )}
            {(phase == "time-up" || phase == "failed") && (
                <div className="sidebar">
                    <Score score={score} />
                    {phase == "failed" && <ErrorMessage baubles={baubles} />}
                    {phase == "time-up" && <TimeUpMessage />}

                    <button onClick={start}>Play again</button>
                </div>
            )}
        </div>
    );
}

// Utility hook for requestAnimationFrame
const useAnimationFrame = (callback) => {
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const animate = (time) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
};

function Timer({ timeUp }) {
    const time = 60;
    const [timeLeft, setTimeLeft] = React.useState(time * 1000);

    useAnimationFrame((deltaTime) => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setTimeLeft((prevTime) => prevTime - deltaTime);
    });

    if (timeLeft < 0) timeUp();

    const timeLeftInSeconds = Math.floor(timeLeft / 1000);
    const radius = 70;
    const circumference = 2 * radius * Math.PI;

    return (
        <svg width="250" height="200" viewBox="-100 -100 200 200">
            <path
                d={`M -1 -${radius} A ${radius} ${radius} 0 1 0 0 -${radius}`}
                stroke="white"
                stroke-width="20"
                fill="none"
                stroke-dasharray={`${(circumference / (time * 1000)) * timeLeft} 1000`}
            />
            <text
                text-anchor="middle"
                dominant-baseline="central"
                font-size="2.5em"
                font-weight="bold"
                fill="white"
            >
                {timeLeftInSeconds}
            </text>
        </svg>
    );
}

function Score({ score }) {
    return (
        <div className="score">
            <h3>Score</h3>
            <h1>{score}</h1>
        </div>
    );
}

function TimeUpMessage() {
    return <p className="result">Time's up!</p>;
}

function ErrorMessage({ baubles }) {
    const selectedBaubles = baubles.filter((b) => b.selected);

    const {
        colorsFitCriteria,
        shadingsFitCriteria,
        shapesFitCriteria,
        numberFitCriteria
    } = getCriteria(selectedBaubles[0], selectedBaubles[1], selectedBaubles[2]);

    return (
        <div>
            <p>You picked a wrong combination</p>
            {!colorsFitCriteria && (
                <p>
                    Colors don't fit the criteria. They should be either all the same or
                    all different
                </p>
            )}
            {!shadingsFitCriteria && (
                <p>
                    Shadings don't fit the criteria. They should be either all the same or
                    all different
                </p>
            )}
            {!shapesFitCriteria && (
                <p>
                    Shapes don't fit the criteria. They should be either all the same or
                    all different
                </p>
            )}
            {!numberFitCriteria && (
                <p>
                    Number of shapes don't fit the criteria. They should be either all the
                    same or all different
                </p>
            )}
        </div>
    );
}

function Bauble({ index, color, shading, shape, number, selected, select }) {
    const motifFill = {
        solid: "#5f4c6c",
        striped: "url(#stripe)",
        open: "transparent"
    }[shading];

    return (
        <svg
            viewBox="-100 -100 200 200"
            onClick={() => select(index)}
            className={"bauble " + (selected && "selected")}
        >
            <defs>
                <radialGradient id="shine" cx="0.25" cy="0.25" r="0.35">
                    <stop offset="0%" stop-color="white" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="white" stop-opacity="0" />
                </radialGradient>

                <pattern
                    id="stripe"
                    patternUnits="userSpaceOnUse"
                    width="10"
                    height="6"
                >
                    <rect x="0" y="2.5" width="10" height="3" fill="#5f4c6c" />
                </pattern>
            </defs>

            <circle cx="0" cy="20" r="65" fill={color} />

            <g
                transform="translate(0, 20)"
                fill={motifFill}
                stroke="#5f4c6c"
                stroke-width="3"
            >
                <Motif shape={shape} number={number} />
            </g>

            <circle cx="0" cy="20" r="65" fill="url(#shine)" />

            <circle
                cx="0"
                cy="-70"
                r="12"
                fill="none"
                stroke="#F79257"
                stroke-width="2"
            />
            <rect x="-17.5" y="-60" width="34" height="20" fill="#F79257" />
        </svg>
    );
}

function Motif({ shape, number }) {
    const Shape = {
        tree: Tree,
        circle: Circle,
        star: Star
    }[shape];

    if (number == 1) {
        return <Shape />;
    }

    if (number == 2) {
        return (
            <g>
                <Shape transform="translate(-30, 0)" />
                <Shape transform="translate(30, 0)" />
            </g>
        );
    }

    return (
        <g>
            <Shape />
            <Shape transform="translate(-40, 0)" />
            <Shape transform="translate(40, 0)" />
        </g>
    );
}

function Circle({ transform }) {
    return <circle r="15" transform={transform} />;
}

function Star({ transform }) {
    return (
        <polygon
            points="0,-20 6,-8 19,-6 10,3 12,16 0,10 -12,16 -10,3 -19,-6 -6,-8"
            transform={transform}
        />
    );
}

function Tree({ transform }) {
    return (
        <polygon
            points="
          0,-24 8,-8 6,-8 12,4 10,4 16,16 4,16 4,22
          -4,22 -4,16 -16,16 -10,4 -12,4 -6,-8 -8,-8"
            transform={transform}
        />
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
