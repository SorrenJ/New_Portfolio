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
    const infoBoxContainer = document.querySelector(".info-box");
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
        infoBoxContainer.style.display= "block";
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
document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll(".list-item");
    const infoBox = document.getElementById("infoBox");
    const infoBoxText = document.getElementById("infoBoxText");

    const infoBoxContent = {
        "Travel App Figma Prototype": `
            <h3>Travel App Figma Prototype</h3>
            <img src="path/to/travel-app.jpg" alt="Travel App" style="width:100%; border-radius:8px;">
            <p>A prototype design for a travel app using Figma. This project focuses on user-friendly navigation and modern UI elements.</p>
        `,
        "Bakery Website Redesign": `
            <h3>Bakery Website Redesign</h3>
            <img src="path/to/bakery-website.jpg" alt="Bakery Website" style="width:100%; border-radius:8px;">
            <p>Redesigned a bakery website for improved user experience, focusing on aesthetics and accessibility.</p>
        `,
        "Smart Drive Website": `
            <h3>Smart Drive Website</h3>
            <img src="path/to/smart-drive.jpg" alt="Smart Drive" style="width:100%; border-radius:8px;">
            <p>A smart website for driving education and resources. It provides tools for students preparing for driving tests.</p>
       <div class="tag"> Joomla!</div> 
           <div class="tag"> Joomla!</div>
    <div class="tag"> CSS</div>
    <div class="tag"> HTML</div>
    <div class="tag"> Hikashop</div>`,
    
        "Sleep Wellness Chatbot": `
            <h3>Sleep Wellness Chatbot</h3>
            <img src="path/to/sleep-chatbot.jpg" alt="Sleep Chatbot" style="width:100%; border-radius:8px;">
            <p>An AI chatbot that promotes better sleep habits through personalized recommendations and engaging conversations.</p>
        `,
        "Facemask Detection App": `
            <h3>Facemask Detection App</h3>
            <img src="path/to/facemask-detection.jpg" alt="Facemask Detection" style="width:100%; border-radius:8px;">
            <p>An AI app for detecting facemask compliance in real-time using advanced image recognition technologies.</p>
        `,
        "Wildlife and Pest Animal Detection": `
            <h3>Wildlife and Pest Animal Detection</h3>
            <img src="path/to/wildlife-detection.jpg" alt="Wildlife Detection" style="width:100%; border-radius:8px;">
            <p>AI-powered app to identify wildlife and pest animals, aiding conservation and pest control efforts.</p>
        `,
        "Github": `
            <h3>Github</h3>
            <a href="https://github.com/SorrenJao" target="_blank">
                <img src="path/to/github-logo.jpg" alt="Github Logo" style="width:50%; display:block; margin:auto;">
            </a>
            <p>Visit Sorren's GitHub profile to view all repositories and projects.</p>
        `,
        "Virtual Pet Web Application": `
            <h3>Virtual Pet Web Application</h3>
            <img src="path/to/virtual-pet.jpg" alt="Virtual Pet" style="width:100%; border-radius:8px;">
            <p>A fun virtual pet app built with modern web technologies. Manage pet stats, mood, and activities!</p>
        `,
        "Map Listing Web Application": `
            <h3>Map Listing Web Application</h3>
            <img src="path/to/map-listing.jpg" alt="Map Listing" style="width:100%; border-radius:8px;">
            <p>A map-based app for listing and finding locations with advanced search capabilities.</p>
        `,
        "SFU Student Webpage Creator": `
            <h3>SFU Student Webpage Creator</h3>
            <img src="path/to/sfu-webpage.jpg" alt="SFU Student Webpage" style="width:100%; border-radius:8px;">
            <p>A web page generator for SFU students, allowing quick and easy personal webpage creation.</p>
        `,
    };
    

    listItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            const text = item.textContent.trim();
            if (infoBoxContent[text]) {
                infoBoxText.innerHTML = infoBoxContent[text]; // Use innerHTML to render HTML content
                infoBox.style.opacity = 1;
                infoBox.style.visibility = "visible";
            }
        });

        item.addEventListener("mouseout", () => {
            infoBox.style.opacity = 0;
            infoBox.style.visibility = "hidden";
        });
    });
});

