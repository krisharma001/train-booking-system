// Global variables
let currentDate = new Date(); // Set to today's date (February 26, 2025)
let selectedDate = new Date(); // Set to today's date (February 26, 2025)

// Show/hide calendar popup
document.getElementById('selected-date').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent immediate closure
    const popup = document.getElementById('calendar-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    if (popup.style.display === 'block') {
        positionCalendarPopup();
    }
});

// Position the calendar popup relative to the date input and center it
function positionCalendarPopup() {
    const dateInput = document.querySelector('.date-input-container');
    const popup = document.getElementById('calendar-popup');
    const rect = dateInput.getBoundingClientRect();
    popup.style.left = (rect.left + (rect.width / 2)) + 'px'; // Center horizontally
    popup.style.top = (rect.bottom + window.scrollY) + 'px';
}

// Close calendar only when clicking outside, but allow month navigation
document.addEventListener('click', function(event) {
    const popup = document.getElementById('calendar-popup');
    const dateInput = document.querySelector('.date-input-container');
    const calendarHeaderButtons = document.querySelectorAll('.calendar-header button');

    if (!dateInput.contains(event.target) && !popup.contains(event.target) && !Array.from(calendarHeaderButtons).some(button => button.contains(event.target))) {
        popup.style.display = 'none';
    }
});

// Generate calendar
function generateCalendar(date) {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    const monthYear = document.getElementById('calendar-month-year');
    monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Add day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day', 'day-name');
        calendarGrid.appendChild(dayElement);
    });

    // Add padding days
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');

        const current = new Date(date.getFullYear(), date.getMonth(), day);
        dayElement.dataset.date = current.toISOString().split('T')[0];

        // Add availability status (simulated data - replace with real API data)
        const status = getAvailabilityStatus(current);
        if (status) dayElement.classList.add(status);
        if (current.toDateString() === selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }
        if (isTatkalOpen(current)) dayElement.classList.add('tatkal-open');

        dayElement.addEventListener('click', () => selectCalendarDate(current));
        calendarGrid.appendChild(dayElement);
    }
}

// Simulate availability status (replace with real data from an API)
function getAvailabilityStatus(date) {
    const day = date.getDate();
    const month = date.getMonth(); // 0-based (February = 1, March = 2, etc.)
    if (month === 1 && day === 26) return 'available'; // Feb 26, 2025 as available (today)
    if (month === 1 && day === 27) return 'filling-fast';
    if (month === 1 && day === 28) return 'few-seats';
    return null;
}

// Simulate Tatkal Open status (replace with real data)
function isTatkalOpen(date) {
    const day = date.getDate();
    const month = date.getMonth(); // 0-based
    return month === 1 && (day === 26 || day === 27); // Feb 26 and 27, 2025 as Tatkal Open
}

// Select date from calendar
function selectCalendarDate(date) {
    selectedDate = date;
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    document.getElementById('selected-date').textContent = date.toLocaleDateString('en-US', options);
    document.getElementById('calendar-popup').style.display = 'none';

    // Update the hidden date input for form submission
    document.getElementById('date-picker').value = date.toISOString().split('T')[0];
}

// Change month (prevent popup from closing and reposition, stop default behavior)
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar(currentDate);
    positionCalendarPopup(); // Ensure the popup stays positioned correctly
    event.preventDefault(); // Prevent any default form submission or page reload
}

// Function to swap stations
function swapStations() {
    const fromStation = document.getElementById('from-station').value;
    const toStation = document.getElementById('to-station').value;
    
    document.getElementById('from-station').value = toStation;
    document.getElementById('to-station').value = fromStation;
}

// Initial calendar generation
generateCalendar(currentDate);

// Ensure buttons don’t trigger form submission
document.querySelectorAll('.calendar-header button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button behavior (e.g., form submission)
    });
});

// Existing date option functions remain the same
function selectDateOption(option) {
    const today = new Date();
    let selectedDate;
    
    if (option === 'tomorrow') {
        selectedDate = new Date(today);
        selectedDate.setDate(today.getDate() + 1);
    } else if (option === 'dayAfter') {
        selectedDate = new Date(today);
        selectedDate.setDate(today.getDate() + 2);
    }
    
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    document.getElementById('selected-date').textContent = selectedDate.toLocaleDateString('en-US', options);
    document.getElementById('date-picker').value = selectedDate.toISOString().split('T')[0];
    document.getElementById('calendar-popup').style.display = 'none';
}