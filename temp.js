// Global variables
let currentDate = new Date();
let selectedDate = new Date();
let stations = []; // Array to store station data

// Load station dataset
fetch('stations.csv') // Replace with the actual path to your CSV file
  .then(response => response.text())
  .then(data => {
    Papa.parse(data, {
      header: true, // Assumes CSV has headers like 'name' and 'code'
      complete: function(results) {
        stations = results.data;
        setupAutocomplete();
      }
    });
  })
  .catch(error => console.error('Error loading station data:', error));

// Setup autocomplete for "From" and "To" fields
function setupAutocomplete() {
  const fromInput = document.getElementById('from-station');
  const toInput = document.getElementById('to-station');

  createAutocomplete(fromInput, 'from-dropdown');
  createAutocomplete(toInput, 'to-dropdown');
}

function createAutocomplete(input, dropdownId) {
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener('input', debounce(function() {
    const value = this.value.toLowerCase();
    dropdown.innerHTML = '';
    if (value.length < 2) return; // Minimum 2 characters to trigger suggestions

    const filteredStations = stations.filter(station =>
      station.name.toLowerCase().includes(value) || station.code.toLowerCase().includes(value)
    ).sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(value);
      const bStartsWith = b.name.toLowerCase().startsWith(value);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return 0;
    }).slice(0, 20); // Limit to 20 suggestions

    filteredStations.forEach(station => {
      const item = document.createElement('div');
      item.classList.add('dropdown-item');
      item.innerHTML = `<div class="station-details">
                          <span class="station-full-name">${station.name}</span>
                          <span class="station-code">${station.code}</span>
                        </div>`;
      item.addEventListener('click', function() {
        input.value = station.name;
        dropdown.innerHTML = '';
        dropdown.classList.remove('show');
      });
      dropdown.appendChild(item);
    });

    if (filteredStations.length > 0) {
      dropdown.classList.add('show');
    } else {
      dropdown.classList.remove('show');
    }
  }, 300));

  // Show dropdown on focus
  input.addEventListener('focus', function() {
    if (this.value.length >= 2) {
      this.dispatchEvent(new Event('input'));
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.innerHTML = '';
      dropdown.classList.remove('show');
    }
  });
}

// Debounce function to limit input event frequency
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Function to swap stations
function swapStations() {
  const fromStation = document.getElementById('from-station').value;
  const toStation = document.getElementById('to-station').value;
  
  document.getElementById('from-station').value = toStation;
  document.getElementById('to-station').value = fromStation;
}

// Show/hide calendar popup
document.getElementById('selected-date').addEventListener('click', function(event) {
  event.stopPropagation();
  const popup = document.getElementById('calendar-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  if (popup.style.display === 'block') {
    positionCalendarPopup();
  }
});

// Position the calendar popup
function positionCalendarPopup() {
  const dateInput = document.querySelector('.date-input-container');
  const popup = document.getElementById('calendar-popup');
  const rect = dateInput.getBoundingClientRect();
  popup.style.left = (rect.left + (rect.width / 2)) + 'px';
  popup.style.top = (rect.bottom + window.scrollY) + 'px';
}

// Close calendar when clicking outside
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

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    dayElement.classList.add('calendar-day', 'day-name');
    calendarGrid.appendChild(dayElement);
  });

  for (let i = 0; i < startDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('calendar-day');
    calendarGrid.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    dayElement.classList.add('calendar-day');

    const current = new Date(date.getFullYear(), date.getMonth(), day);
    dayElement.dataset.date = current.toISOString().split('T')[0];

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

// Simulate availability status
function getAvailabilityStatus(date) {
  const day = date.getDate();
  const month = date.getMonth();
  if (month === 1 && day === 26) return 'available';
  if (month === 1 && day === 27) return 'filling-fast';
  if (month === 1 && day === 28) return 'few-seats';
  return null;
}

// Simulate Tatkal Open status
function isTatkalOpen(date) {
  const day = date.getDate();
  const month = date.getMonth();
  return month === 1 && (day === 26 || day === 27);
}

// Select date from calendar
function selectCalendarDate(date) {
  selectedDate = date;
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  document.getElementById('selected-date').textContent = date.toLocaleDateString('en-US', options);
  document.getElementById('calendar-popup').style.display = 'none';
  document.getElementById('date-picker').value = date.toISOString().split('T')[0];
}

// Change month
function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  generateCalendar(currentDate);
  positionCalendarPopup();
  event.preventDefault();
}

// Select date option
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

// Initial calendar generation
generateCalendar(currentDate);

// Prevent form submission on button clicks
document.querySelectorAll('.calendar-header button').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
  });
});