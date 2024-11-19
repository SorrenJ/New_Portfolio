document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("startScreen");

    // Check if the URL contains the #project anchor
    if (window.location.hash === "#project") {
        // Hide the start screen and trigger the animation
        startScreen.style.display = "none"; // Hide the start screen immediately
        startGame(); // Trigger the segment animation
    }
});



const segmentsData = {
    segment1: { text: 'UX Design', iconClass:'fa-brands fa-figma', listId: 'list1' },
    segment2: { text: 'AI/ML', iconClass:'fa-robot', listId: 'list2' },
    segment3: { text: 'Sorren', iconClass:'fa-user', listId: 'list3' },
    segment4: { text: 'Full-Stack', iconClass:'fa-laptop-code', listId: 'list4' }
};

// Store selected segment data (text and icon)
let selectedSegmentData = { text: 'Hover', iconClass: null };

// Function to start the game with fade-out and fade-in transitions
function startGame() {
    const startScreen = document.getElementById("startScreen");
    const selectorScreen = document.getElementById("selectorScreen");
    const segments = document.querySelectorAll(".segment");
    const mobileButtonContainer = document.querySelector(".mobile-button-container");
    // Set initial offset positions for segments
    segments[0].style.transform = "translate(-70px,-70px)";
    segments[1].style.transform = "translate(70px, -70px)";
    segments[2].style.transform = "translate(70px, 70px)";
    segments[3].style.transform = "translate(-70px, 70px)";

  
    // Fade out the start screen and show the selector screen
    startScreen.style.opacity = "0";
    setTimeout(() => {
        startScreen.style.display = "none"; // Hide start screen
        selectorScreen.style.display = "block"; // Show selector screen
        selectorScreen.style.display = "block"; // Show selector screen
        selectorScreen.style.opacity = "1"; // Fade in selector screen
        mobileButtonContainer.style.display="flex";
        // Trigger animation for each segment
        setTimeout(() => {
            segments.forEach(segment => {
                segment.style.transform = "translate(0, 0)";
                segment.style.opacity = 1;
                  mobileButtonContainer.style.display="flex";
            });
        }, 100); // Delay to trigger the transform and opacity transition
    }, 1000); // Delay to match the CSS transition duration
}

// Function to update center text with optional Font Awesome icon
function updateCenterText(newText, iconClass) {
    const centerTextOverlay = document.getElementById('centerTextOverlay');
    centerTextOverlay.style.opacity = 0;

    setTimeout(() => {
        if (iconClass) {
            centerTextOverlay.innerHTML = `<i class="fa ${iconClass}"></i>`;
        } else {
            centerTextOverlay.innerHTML = `<p>${newText}</p>`;
        }
        centerTextOverlay.style.opacity = 1;
    }, 500);
}

// Function to reset the center text to the default or selected segment text and icon
function resetCenterText() {
    const { text, iconClass } = selectedSegmentData;
    updateCenterText(text, iconClass);
}

// Function to handle segment selection and display corresponding list
function selectSegment(segmentId) {
    const { text, iconClass, listId } = segmentsData[segmentId];
    document.querySelectorAll('.segment').forEach(segment => segment.classList.remove('selected'));
    document.getElementById(segmentId).classList.add('selected');
    
    // Update selected segment data with both text and icon
    selectedSegmentData = { text, iconClass };
    
    // Update center text with the selected segment's text and icon
    updateCenterText(text, iconClass);

    // Hide all lists, then show the selected one
    document.querySelectorAll('.elements-list').forEach(list => {
        list.classList.remove('active');
        list.style.opacity = 0;
    });

    const selectedList = document.getElementById(listId);
    if (selectedList) {
        selectedList.classList.add('active');
        selectedList.style.opacity = 1;

        const listItems = selectedList.querySelectorAll('.list-item');
        listItems.forEach((item, index) => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    const selectorScreen = document.getElementById('selectorScreen');
    if (selectedList && selectedList.classList.contains('active')) {
        selectorScreen.classList.add('move-side');
    } else {
        selectorScreen.classList.remove('move-side');
    }
}

// Add event listeners to each segment for hover and click actions
Object.keys(segmentsData).forEach(segmentId => {
    const segment = document.getElementById(segmentId);
    const { text, iconClass } = segmentsData[segmentId];

    segment.addEventListener('mouseover', () => updateCenterText(text, iconClass));
    segment.addEventListener('mouseout', resetCenterText);
    segment.addEventListener('click', () => selectSegment(segmentId));
});


// Function to show the mobile list based on button click
function showMobileList(listId) {
    // Hide all mobile lists
    document.querySelectorAll('.mobile-elements-list').forEach(list => {
        list.style.display = 'none';
    });

    // Show the selected mobile list
    const selectedList = document.getElementById(listId);
    if (selectedList) {
        selectedList.style.display = 'block';
    }
}
