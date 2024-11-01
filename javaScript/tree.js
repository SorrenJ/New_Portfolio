// Select the canvas and get the drawing context
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

// Tree parameters
let levelsMin = 2;
let levelsMax = 4;
let initialLength = 100;
let angleMin = Math.PI / 17;
let angleMax = Math.PI / 10;

// Draw the tree with recursive branches
// Draw the tree with recursive branches
// Draw the tree with recursive branches
function tree(levels, length, angle) {
    if (levels > 0) {
        ctx.save();
        
        // Set branch color, glow, and flicker
        ctx.strokeStyle = '#FFF'; // White color for branches
        ctx.shadowColor = '#FFF'; // White glow
        ctx.shadowBlur = Math.random() * 20 + 10; // Flicker effect with random blur

        ctx.rotate(angle / 2.5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();

        ctx.translate(0, -length);
        ctx.scale(0.95, 0.95);
        ctx.lineWidth = levels;

        tree(levels - 1, length, angle);

        ctx.restore();

        ctx.save();
        
        // Set branch color, glow, and flicker for the second branch
        ctx.strokeStyle = '#FFF';
        ctx.shadowColor = '#FFF';
        ctx.shadowBlur = Math.random() * 20 + 10;

        ctx.rotate(-angle / 2.5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();

        ctx.translate(0, -length);
        ctx.scale(0.95, 0.95);
        ctx.lineWidth = levels;

        tree(levels - 1, length, angle);
        ctx.restore();
    } else {
        drawFlowers();
    }
}

// Draw flowers on branches
function drawFlowers() {
    // Main flower
    ctx.save();
    ctx.fillStyle = '#db4cb3'; // Main flower color
    ctx.shadowColor = '#db4cb3'; // Glow color matches the flower
    ctx.shadowBlur = Math.random() * 15 + 10; // Random blur for flicker
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Surrounding petals
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.fillStyle = '#FFB6C1'; // Light pink petal color
        ctx.shadowColor = '#FFB6C1'; // Glow color matches petal
        ctx.shadowBlur = Math.random() * 15 + 10; // Random blur for flicker
        ctx.beginPath();
        ctx.arc(0, -15, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Rotate context for next petal
        ctx.rotate(Math.PI * 2 / 5);
    }
}

// Draw function to handle mouse-based interactions
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    let currentAngle = map(mouseX * 10, 0, canvas.width, angleMin, angleMax);
    let currentLevels = Math.floor(map(mouseY, canvas.height, 0, levelsMin, levelsMax));

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.lineWidth = 10;
    tree(currentLevels, initialLength, currentAngle);
    ctx.restore();
}

// Mapping function to map mouse position to tree properties
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Event listeners to track mouse movement
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    draw();
});

// Initial draw call
draw();