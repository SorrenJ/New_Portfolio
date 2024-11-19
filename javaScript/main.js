document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("startScreen");



    
    // Check if the URL contains the #project anchor
    if (window.location.hash === "#project") {
        // Hide the start screen and trigger the animation
        startScreen.style.display = "none"; // Hide the start screen immediately
        startGame(); // Trigger the segment animation
    }


        const specialInfoBoxes = {
            segment1: document.getElementById("specialInfoBox1"),
            segment2: document.getElementById("specialInfoBox2"),
            segment3: document.getElementById("specialInfoBox3"),
            segment4: document.getElementById("specialInfoBox4"),
        };
    
        const listItems = document.querySelectorAll(".list-item");
    
        // Function to show the special info box for the selected segment
        function showSpecialInfoBox(segmentId) {
            Object.values(specialInfoBoxes).forEach(box => box.classList.remove("active")); // Hide all boxes
            if (specialInfoBoxes[segmentId] && window.innerWidth >= 1080) {
                specialInfoBoxes[segmentId].classList.add("active"); // Show the active box
            }
        }
    
        // Function to hide the special info box
        function hideSpecialInfoBoxes() {
            Object.values(specialInfoBoxes).forEach(box => box.classList.remove("active")); // Hide all boxes
        }
    
        // Add click event for segment selection
        document.querySelectorAll(".segment").forEach(segment => {
            segment.addEventListener("click", () => {
                const segmentId = segment.id;
                showSpecialInfoBox(segmentId); // Show the relevant info box
            });
        });
    
        // Hide the special info box when hovering over a list-item
        listItems.forEach(item => {
            item.addEventListener("mouseover", hideSpecialInfoBoxes); // Hide all info boxes
    
            // Restore the special info box when unhovering
            item.addEventListener("mouseout", () => {
                const selectedSegment = document.querySelector(".segment.selected");
                if (selectedSegment) {
                    showSpecialInfoBox(selectedSegment.id); // Re-show the box for the selected segment
                }
            });
        });
   
    



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
    const specialInfoBox = document.getElementById("specialInfoBox");
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

    if (segmentId === "segment3" && window.innerWidth >= 1080) {
        specialInfoBox.classList.add("active");
    } else {
        specialInfoBox.classList.remove("active");
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
            <div style="font-size:6em; text-align:center"><i class="fa-solid fa-plane fa-bounce"></i></div>
            <p>A prototype design for a travel app using Figma. This project focuses on user-friendly navigation and modern UI elements.</p>
                 <div class="tag">Figma</div>
    <div class="tag">Adobe Illustrator</div>
            `,
        "Bakery Website Redesign": `
            <div style="font-size:6em; text-align:center"><i class="fa-solid fa-cake-candles fa-bounce"></i></div>
            <p>Redesigned a bakery website for improved user experience, focusing on aesthetics and accessibility.</p>
          <div class="tag">CSS3</div>
    <div class="tag">HTML</div>
    <div class="tag">CSS3</div>
     <div class="tag">SASS/SCSS</div>
<div class="tag">JavaScript</div>
<div class="tag">Figma</div>
            `,
        "Smart Drive Website": `
          
    <div style="font-size:6em; text-align:center"><i class="fa-solid fa-car-side fa-bounce"></i></div>
            <p>A smart website for driving education and resources. It provides tools for students preparing for driving tests.</p>
       <div class="tag"> Joomla!</div> 
           <div class="tag"> Joomla!</div>
    <div class="tag"> CSS3</div>
    <div class="tag"> HTML</div>
    <div class="tag"> Hikashop</div>`,

        "Sleep Wellness Chatbot": `
           
            <div style="font-size:6em; text-align:center"><i class="fa-solid fa-bed fa-fade"></i></div>
            <p>An AI chatbot that promotes better sleep habits through personalized recommendations and engaging conversations.</p>
        <div class="tag">Llama-2-13B-Chat</div>
<div class="tag">LangChain</div>
<div class="tag">ChromaDB</div>
<div class="tag">Gradio</div>
<div class="tag">Python</div>
            `,
        "Facemask Detection App": `
           <div style="font-size:6em; text-align:center"><i class="fa-solid fa-mask-face fa-bounce"></i></div>
            <p>An AI app for detecting facemask compliance in real-time using advanced image recognition technologies.</p>
       <div class="tag">Java</div>
<div class="tag">Android Studios</div>
<div class="tag">TensorFlow</div>
<div class="tag">YOLOv2</div>
            `,
        "Wildlife and Pest Animal Detection": `
            <div style="font-size:6em; text-align:center"><i class="fa-solid fa-crow fa-bounce"></i></div>
            <p>AI-powered app to identify wildlife and pest animals, aiding conservation and pest control efforts.</p>
        <div class="tag">YOLOv8</div>
<div class="tag">TensorFlow</div>
<div class="tag">Python</div>
<div class="tag">Matplotlib Pyplot</div>
<div class="tag">Pandas</div>
<div class="tag">Numpy</div>

            `,
        "Github": `
            <h3>Github</h3>
            <a href="https://github.com/SorrenJao" target="_blank">
                <img src="path/to/github-logo.jpg" alt="Github Logo" style="width:50%; display:block; margin:auto;">
            </a>
            <p>Visit Sorren's GitHub profile to view all repositories and projects.</p>
        `,
        "Virtual Pet Web Application": ` 
          <div style="font-size:6em; text-align:center"><i class="fa-solid fa-cat fa-bounce"></i></div>
            <p>A fun virtual pet app built with modern web technologies. Manage pet stats, mood, and activities!</p>
        <div class="tag">React</div>
<div class="tag">JavaScript</div>
<div class="tag">Express</div>
<div class="tag">EJS</div>
<div class="tag">SQL</div>
<div class="tag">vaderSentiment</div>
<div class="tag">Sentiment</div>
<div class="tag">Cloudinary</div>
<div class="tag">Git</div>
<div class="tag">Node.js</div>
<div class="tag">AWS RDS</div>
            `,
        "Map Listing Web Application": `
        <div style="font-size:6em; text-align:center"><i class="fa-regular fa-compass fa-bounce"></i></div>
            <p>A map-based app for listing and finding locations with advanced search capabilities.</p>
        <div class="tag">Node.js</div>
<div class="tag">jQuery</div>
<div class="tag">Leaflet</div>
<div class="tag">SQL</div>
<div class="tag">PostgreSQL</div>
<div class="tag">SASS</div>
<div class="tag">Express</div>
<div class="tag">EJS</div>
<div class="tag">Git</div>
            `,
        "SFU Student Webpage Creator": `
            
          <div style="font-size:6em; text-align:center"><i class="fa-solid fa-user-graduate fa-bounce"></i></div>
            <p>A web page generator for SFU students, allowing quick and easy personal webpage creation.</p>
       <div class="tag">HTML</div>
<div class="tag">CSS</div>
<div class="tag">JavaScript</div>
<div class="tag">jQuery</div>
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

