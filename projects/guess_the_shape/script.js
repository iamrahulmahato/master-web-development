const shapes = [
    { name: 'circle', clue: 'I am perfectly round', style: 'border-radius: 50%; background-color: blue;' },
    { name: 'square', clue: 'I have 4 equal sides', style: 'background-color: red;' },
    { name: 'triangle', clue: 'I have 3 sides', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid green;' },
    { name: 'rectangle', clue: 'I have 4 sides, but not all are equal', style: 'width: 150px; height: 100px; background-color: orange;' },
    { name: 'pentagon', clue: 'I have 5 sides', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid purple; clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);' },
    { name: 'hexagon', clue: 'I have 6 sides', style: 'width: 100px; height: 100px; background-color: yellow; clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);' },
    { name: 'heptagon', clue: 'I have 7 sides', style: 'width: 100px; height: 100px; background-color: pink; clip-path: polygon(50% 0%, 93% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 7% 25%);' },
    { name: 'octagon', clue: 'I have 8 sides', style: 'width: 100px; height: 100px; background-color: cyan; clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);' },
    { name: 'nonagon', clue: 'I have 9 sides', style: 'width: 100px; height: 100px; background-color: lime; clip-path: polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%, 50% 0%);' },
    { name: 'decagon', clue: 'I have 10 sides', style: 'width: 100px; height: 100px; background-color: magenta; clip-path: polygon(50% 0%, 80% 10%, 100% 40%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 0% 40%, 20% 10%);' },
    { name: 'dodecagon', clue: 'I have 12 sides', style: 'width: 100px; height: 100px; background-color: brown; clip-path: polygon(50% 0%, 75% 5%, 90% 25%, 100% 50%, 90% 75%, 75% 95%, 50% 100%, 25% 95%, 10% 75%, 0% 50%, 10% 25%, 25% 5%);' },
    { name: 'ellipse', clue: 'I am an elongated circle', style: 'width: 150px; height: 100px; background-color: teal; border-radius: 50%;' },
    { name: 'oval', clue: 'I am similar to an ellipse', style: 'width: 120px; height: 80px; background-color: violet; border-radius: 50%;' },
    { name: 'parallelogram', clue: 'I have opposite sides parallel', style: 'width: 150px; height: 100px; background-color: olive; transform: skew(20deg);' },
    { name: 'rhombus', clue: 'I am a diamond shape', style: 'width: 100px; height: 100px; background-color: navy; transform: rotate(45deg);' },
    { name: 'trapezoid', clue: 'I have one pair of parallel sides', style: 'width: 100px; height: 100px; background-color: maroon; clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);' },
    { name: 'kite', clue: 'I have two pairs of equal adjacent sides', style: 'width: 100px; height: 100px; background-color: coral; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);' },
    { name: 'scalene triangle', clue: 'I have 3 unequal sides', style: 'width: 0; height: 0; border-left: 40px solid transparent; border-right: 60px solid transparent; border-bottom: 100px solid darkgreen;' },
    { name: 'isosceles triangle', clue: 'I have 2 equal sides', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid darkred;' },
    { name: 'equilateral triangle', clue: 'I have 3 equal sides', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 87px solid darkblue;' },
    { name: 'right triangle', clue: 'I have a 90-degree angle', style: 'width: 0; height: 0; border-top: 100px solid darkorange; border-right: 100px solid transparent;' },
    { name: 'acute triangle', clue: 'All my angles are less than 90 degrees', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid darkviolet;' },
    { name: 'obtuse triangle', clue: 'I have one angle greater than 90 degrees', style: 'width: 0; height: 0; border-left: 60px solid transparent; border-right: 40px solid transparent; border-bottom: 100px solid darkcyan;' },
    { name: 'star', clue: 'I have points', style: 'width: 100px; height: 100px; background-color: gold; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);' },
    { name: 'crescent', clue: 'I look like a moon', style: 'width: 100px; height: 100px; background-color: lightblue; border-radius: 50%; box-shadow: -20px 0 0 0 white;' },
    { name: 'heart', clue: 'I am a symbol of love', style: 'width: 100px; height: 100px; background-color: pink; clip-path: polygon(50% 0%, 100% 35%, 75% 100%, 50% 75%, 25% 100%, 0% 35%);' },
    { name: 'cross', clue: 'I have intersecting lines', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);' },
    { name: 'arrow', clue: 'I point in a direction', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%);' },
    { name: 'cube', clue: 'I am a 3D square', style: 'width: 100px; height: 100px; background-color: lightgray; transform: rotateX(45deg) rotateY(45deg);' },
    { name: 'sphere', clue: 'I am a 3D circle', style: 'width: 100px; height: 100px; background-color: lightblue; border-radius: 50%; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);' },
    { name: 'cylinder', clue: 'I have circular ends', style: 'width: 100px; height: 100px; background-color: lightyellow; border-radius: 50% / 20%;' },
    { name: 'cone', clue: 'I have a circular base and a point', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid lightpink;' },
    { name: 'pyramid', clue: 'I have a triangular base', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid lightgoldenrodyellow;' },
    { name: 'tetrahedron', clue: 'I am a 3D triangle', style: 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid lightseagreen;' },
    { name: 'dodecahedron', clue: 'I have 12 faces', style: 'width: 100px; height: 100px; background-color: lightsteelblue; clip-path: polygon(50% 0%, 75% 5%, 90% 25%, 100% 50%, 90% 75%, 75% 95%, 50% 100%, 25% 95%, 10% 75%, 0% 50%, 10% 25%, 25% 5%);' },
    { name: 'icosahedron', clue: 'I have 20 faces', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(50% 0%, 80% 10%, 100% 40%, 100% 70%, 80% 100%, 50% 100%, 20% 100%, 0% 70%, 0% 40%, 20% 10%);' },
    { name: 'torus', clue: 'I am a doughnut shape', style: 'width: 100px; height: 100px; background-color: lightcyan; border-radius: 50%; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);' },
    { name: 'rectangular prism', clue: 'I am a 3D rectangle', style: 'width: 100px; height: 100px; background-color: lightgoldenrodyellow; transform: rotateX(45deg) rotateY(45deg);' },
    { name: 'triangular prism', clue: 'I have triangular ends', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%);' },
    { name: 'pentagon prism', clue: 'I have pentagonal ends', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);' },
    { name: 'hexagonal prism', clue: 'I have hexagonal ends', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);' },
    { name: 'star pentagon', clue: 'I am a star with 5 points', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);' },
    { name: 'star hexagon', clue: 'I am a star with 6 points', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);' },
    { name: 'star of david', clue: 'I am a star with 6 points', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);' },
    { name: 'crescent moon', clue: 'I look like a moon', style: 'width: 100px; height: 100px; background-color: lightblue; border-radius: 50%; box-shadow: -20px 0 0 0 white;' },
    { name: 'ovaloid', clue: 'I am similar to an oval', style: 'width: 120px; height: 80px; background-color: violet; border-radius: 50%;' },
    { name: 'capsule', clue: 'I am a pill shape', style: 'width: 150px; height: 50px; background-color: lightgreen; border-radius: 25px;' },
    { name: 'parabola', clue: 'I am a U-shaped curve', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);' },
    { name: 'hyperbola', clue: 'I am a curve with two branches', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);' },
    { name: 'annulus', clue: 'I am a ring shape', style: 'width: 100px; height: 100px; background-color: lightcyan; border-radius: 50%; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);' },
    { name: 'quadrilateral', clue: 'I have 4 sides', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'scalene quadrilateral', clue: 'I have 4 unequal sides', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'irregular quadrilateral', clue: 'I have 4 sides of different lengths', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'polyhedron', clue: 'I am a 3D shape with flat faces', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'spherical polygon', clue: 'I am a polygon on a sphere', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'spheroid', clue: 'I am an elongated sphere', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'oblate spheroid', clue: 'I am a flattened sphere', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'prolate spheroid', clue: 'I am an elongated sphere', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'star octagon', clue: 'I am a star with 8 points', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'lune', clue: 'I am a crescent shape', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'möbius strip', clue: 'I am a twisted loop', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'trefoil knot', clue: 'I am a knot with three loops', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'deltoid', clue: 'I am a kite shape', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'superellipse', clue: 'I am a rounded rectangle', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'hypocycloid', clue: 'I am a curve traced by a point on a circle', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'epicycloid', clue: 'I am a curve traced by a point on a circle', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'astroid', clue: 'I am a star-shaped curve', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'lemniscate', clue: 'I am a figure-eight curve', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'spiral', clue: 'I am a curve that winds around a point', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'archimedean spiral', clue: 'I am a spiral with equal spacing', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'logarithmic spiral', clue: 'I am a spiral with increasing spacing', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'helix', clue: 'I am a 3D spiral', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'peano curve', clue: 'I am a space-filling curve', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'lissajous curve', clue: 'I am a complex curve', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'rose curve', clue: 'I am a petal-shaped curve', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'triskelion', clue: 'I am a three-legged symbol', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'vesica piscis', clue: 'I am an almond shape', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'reuleaux triangle', clue: 'I am a curved triangle', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'cardioid', clue: 'I am a heart-shaped curve', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'deltoid', clue: 'I am a kite shape', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'nephroid', clue: 'I am a kidney-shaped curve', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'elliptic paraboloid', clue: 'I am a 3D parabola', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'hyperbolic paraboloid', clue: 'I am a saddle shape', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'bipyramid', clue: 'I am a double pyramid', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'antiprism', clue: 'I am a twisted prism', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'wedge', clue: 'I am a triangular prism', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'arrowhead', clue: 'I am a pointed shape', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'shield', clue: 'I am a protective shape', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'snowflake', clue: 'I am a winter symbol', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'yin-yang', clue: 'I am a symbol of balance', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'zigzag', clue: 'I am a jagged line', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'pentagon star', clue: 'I am a star with 5 points', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'hexagram', clue: 'I am a star with 6 points', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'decagram', clue: 'I am a star with 10 points', style: 'width: 100px; height: 100px; background-color: lightcoral; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'heptagram', clue: 'I am a star with 7 points', style: 'width: 100px; height: 100px; background-color: lightgreen; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'tetragram', clue: 'I am a star with 4 points', style: 'width: 100px; height: 100px; background-color: lightblue; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'trapezium', clue: 'I have one pair of parallel sides', style: 'width: 100px; height: 100px; background-color: lightpink; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'elliptical torus', clue: 'I am a doughnut shape', style: 'width: 100px; height: 100px; background-color: lightyellow; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'arrowhead triangle', clue: 'I am a pointed triangle', style: 'width: 100px; height: 100px; background-color: lightcyan; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' },
    { name: 'parabolic arc', clue: 'I am a U-shaped curve', style: 'width: 100px; height: 100px; background-color: lightgray; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);' }
];


let currentShapeIndex = 0;
let score = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function displayShape() {
    currentShapeIndex = getRandomInt(shapes.length);
    const shape = shapes[currentShapeIndex];
    const shapeDisplay = document.getElementById('shape-display');
    shapeDisplay.style = shape.style;
    document.getElementById('clue').textContent = shape.clue;

    // Generate options
    const options = generateOptions(currentShapeIndex);
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkGuess(option);
        optionsContainer.appendChild(button);
    });
}

function generateOptions(correctIndex) {
    const options = new Set();
    options.add(shapes[correctIndex].name);
    while (options.size < 3) {
        const randomIndex = getRandomInt(shapes.length);
        options.add(shapes[randomIndex].name);
    }
    return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle options
}


function checkGuess(userGuess) {
    const message = document.getElementById('message');
    if (userGuess === shapes[currentShapeIndex].name) {
        score++;
        document.getElementById('score').textContent = score;
        message.textContent = 'Correct!';
        displayShape();
    } else {
        message.textContent = 'Try Again!';
    }
}

window.onload = displayShape;