
        // Function to show/hide dropdowns
        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('show');
        }
        
        // Function to select a station from the dropdown
        function selectStation(inputId, stationValue) {
            document.getElementById(inputId).value = stationValue;
            
            // Hide all dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
        
        // Function to swap stations
        function swapStations() {
            const fromStation = document.getElementById('from-station').value;
            const toStation = document.getElementById('to-station').value;
            
            document.getElementById('from-station').value = toStation;
            document.getElementById('to-station').value = fromStation;
        }
        
        // Function to toggle checkbox
        function toggleCheckbox() {
            const checkbox = document.getElementById('refund-checkbox');
            checkbox.classList.toggle('checked');
        }
        
        // Function to toggle calendar popup
        function toggleCalendar() {
            const calendarPopup = document.getElementById('calendar-popup');
            calendarPopup.classList.toggle('show');
            
            // Generate calendar if it's being shown
            if (calendarPopup.classList.contains('show')) {
                generateCalendar();
            }
        }
        
        // Function to generate calendar
        function generateCalendar() {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            // Generate first month (current month)
            generateMonthCalendar(currentMonth, currentYear, 'month1-header', 'month1-days');
            
            // Generate second month (next month)
            let nextMonth = currentMonth + 1;
            let nextMonthYear = currentYear;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextMonthYear++;
            }
            generateMonthCalendar(nextMonth, nextMonthYear, 'month2-header', 'month2-days');
            
            // Add event listeners for month navigation
            document.getElementById('prev-month').addEventListener('click', navigateToPrevMonth);
            document.getElementById('next-month').addEventListener('click', navigateToNextMonth);
        }
        
        // Current displayed months (global variables to track state)
        let currentDisplayedMonth1 = new Date().getMonth();
        let currentDisplayedYear1 = new Date().getFullYear();
        
        // Function to navigate to previous month
        function navigateToPrevMonth() {
            currentDisplayedMonth1--;
            if (currentDisplayedMonth1 < 0) {
                currentDisplayedMonth1 = 11;
                currentDisplayedYear1--;
            }
            
            // Update first month
            generateMonthCalendar(currentDisplayedMonth1, currentDisplayedYear1, 'month1-header', 'month1-days');
            
            // Update second month
            let month2 = currentDisplayedMonth1 + 1;
            let year2 = currentDisplayedYear1;
            if (month2 > 11) {
                month2 = 0;
                year2++;
            }
            generateMonthCalendar(month2, year2, 'month2-header', 'month2-days');
        }
        
        // Function to navigate to next month
        function navigateToNextMonth() {
            currentDisplayedMonth1++;
            if (currentDisplayedMonth1 > 11) {
                currentDisplayedMonth1 = 0;
                currentDisplayedYear1++;
            }
            
            // Update first month
            generateMonthCalendar(currentDisplayedMonth1, currentDisplayedYear1, 'month1-header', 'month1-days');
            
            // Update second month
            let month2 = currentDisplayedMonth1 + 1;
            let year2 = currentDisplayedYear1;
            if (month2 > 11) {
                month2 = 0;
                year2++;
            }
            generateMonthCalendar(month2, year2, 'month2-header', 'month2-days');
        }
        
        // Function to generate month calendar
        function generateMonthCalendar(month, year, headerElementId, daysElementId) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const headerElement = document.getElementById(headerElementId);
            const daysElement = document.getElementById(daysElementId);
            
            // Set month header
            headerElement.textContent = `${monthNames[month]} ${year}`;
            
            // Clear previous days
            daysElement.innerHTML = '';
            
            // Get first day of month and number of days in month
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                daysElement.appendChild(emptyDay);
            }
            
            // Add days of the month
            const today = new Date();
            const currentDate = today.getDate();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                // Check if this is today
                if (day === currentDate && month === currentMonth && year === currentYear) {
                    dayElement.classList.add('current');
                }
                
                // Check if this date is in the past
                const checkDate = new Date(year, month, day);
                if (checkDate < new Date(currentYear, currentMonth, currentDate)) {
                    dayElement.classList.add('disabled');
                } else {
                    // Add seat availability indicators (randomly for demonstration)
                    const statusDot = document.createElement('div');
                    statusDot.className = 'status-dot';
                    
                    // Randomly assign availability status
                    const random = Math.random();
                    if (random < 0.6) {
                        statusDot.classList.add('available');
                    } else if (random < 0.8) {
                        statusDot.classList.add('filling');
                    } else {
                        statusDot.classList.add('few');
                    }
                    
                    dayElement.appendChild(statusDot);
                    
                    // Add click event to select date
                    dayElement.addEventListener('click', function() {
                        selectDate(day, month, year);
                    });
                }
                
                // Check if this is the currently selected date
                const selectedDate = document.getElementById('selected-date').textContent;
                const dateObj = parseSelectedDate(selectedDate);
                if (dateObj && dateObj.day === day && dateObj.month === month && dateObj.year === year) {
                    dayElement.classList.add('selected');
                }
                
                daysElement.appendChild(dayElement);
            }
        }
        
        // Function to parse the selected date text
        function parseSelectedDate(dateText) {
            // Expected format: "Tue, 25 Feb"
            const parts = dateText.split(', ');
            if (parts.length !== 2) return null;
            
            const dateParts = parts[1].split(' ');
            if (dateParts.length !== 2) return null;
            
            const day = parseInt(dateParts[0]);
            const monthStr = dateParts[1];
            
            // Convert month name to month number
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = monthNames.indexOf(monthStr);
            
            // If month not found, return null
            if (month === -1) return null;
            
            // For year, assume current year
            const year = new Date().getFullYear();
            
            return { day, month, year };
        }
        
        // Function to select a date
        function selectDate(day, month, year) {
            // Format the date
            const date = new Date(year, month, day);
            const options = { weekday: 'short', day: 'numeric', month: 'short' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            // Update the display
            document.getElementById('selected-date').textContent = formattedDate;
            
            // Remove 'selected' class from all days
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            
            // Close the calendar popup
            document.getElementById('calendar-popup').classList.remove('show');
            
            // Regenerate the calendar (to update the selected day)
            generateCalendar();
        }
        
        // Function to update date
        function updateDate(value) {
            const date = new Date(value);
            const options = { weekday: 'short', day: 'numeric', month: 'short' };
            document.getElementById('selected-date').textContent = date.toLocaleDateString('en-US', options);
        }
        
        // Function to handle date option selection
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
            
            // Close the calendar popup if it's open
            document.getElementById('calendar-popup').classList.remove('show');
        }
        
        // Add event listeners when the DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Add click event listeners to show dropdowns
            document.getElementById('from-station').addEventListener('click', function() {
                toggleDropdown('from-dropdown');
            });
        
            document.getElementById('to-station').addEventListener('click', function() {
                toggleDropdown('to-dropdown');
            });
        
            // Close dropdown and calendar when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.search-input') && !event.target.closest('.calendar-popup')) {
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('show');
                    });
                    
                    if (!event.target.closest('.search-input[onclick="toggleCalendar()"]')) {
                        document.getElementById('calendar-popup').classList.remove('show');
                    }
                }
            });
            
            // Initialize the calendar
            generateCalendar();
        });