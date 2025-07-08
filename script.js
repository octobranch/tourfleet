// Data storage using localStorage
function getVehicles() {
    const vehicles = localStorage.getItem('vehicles');
    return vehicles ? JSON.parse(vehicles) : [
        { id: 1, brand: 'Mercedes', model: 'Sprinter', plate: 'ABC-123', capacity: 20, year: 2020, status: 'disponible' },
        { id: 2, brand: 'Toyota', model: 'Hiace', plate: 'DEF-456', capacity: 15, year: 2019, status: 'ocupado' },
        { id: 3, brand: 'Ford', model: 'Transit', plate: 'GHI-789', capacity: 12, year: 2021, status: 'disponible' },
        { id: 4, brand: 'Volkswagen', model: 'Crafter', plate: 'JKL-012', capacity: 18, year: 2020, status: 'mantenimiento' }
    ];
}

function saveVehicles(vehicles) {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

function getClients() {
    const clients = localStorage.getItem('clients');
    return clients ? JSON.parse(clients) : [
        { id: 1, name: 'Juan Pérez', email: 'juan@email.com', phone: '555-0101', address: '', bookings: 5 },
        { id: 2, name: 'María García', email: 'maria@email.com', phone: '555-0102', address: '', bookings: 3 },
        { id: 3, name: 'Carlos López', email: 'carlos@email.com', phone: '555-0103', address: '', bookings: 8 }
    ];
}

function saveClients(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function getDrivers() {
    const drivers = localStorage.getItem('drivers');
    return drivers ? JSON.parse(drivers) : [
        { id: 1, name: 'Roberto Sánchez', license: 'LIC-001', phone: '555-0201', experience: 5, status: 'disponible', vehicle: 'ABC-123' },
        { id: 2, name: 'Ana Martínez', license: 'LIC-002', phone: '555-0202', experience: 3, status: 'ocupado', vehicle: 'DEF-456' },
        { id: 3, name: 'Diego Hernández', license: 'LIC-003', phone: '555-0203', experience: 7, status: 'disponible', vehicle: 'GHI-789' }
    ];
}

function saveDrivers(drivers) {
    localStorage.setItem('drivers', JSON.stringify(drivers));
}

function getRoutes() {
    const routes = localStorage.getItem('routes');
    return routes ? JSON.parse(routes) : [
        { id: 1, name: 'Aeropuerto - Hotel Zone', origin: 'Aeropuerto Internacional', destination: 'Zona Hotelera', duration: 1, price: 25.00, description: '' },
        { id: 2, name: 'City Tour', origin: 'Centro Histórico', destination: 'Museos y Plazas', duration: 3, price: 45.00, description: '' },
        { id: 3, name: 'Playa Excursion', origin: 'Hoteles', destination: 'Playa Paraíso', duration: 4, price: 60.00, description: '' }
    ];
}

function saveRoutes(routes) {
    localStorage.setItem('routes', JSON.stringify(routes));
}

function getBookings() {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [
        { id: 1, client: 'Juan Pérez', date: '2025-07-15', time: '09:00', route: 'Aeropuerto - Hotel Zone', vehicle: 'ABC-123', passengers: 4, status: 'confirmado' },
        { id: 2, client: 'María García', date: '2025-07-16', time: '14:00', route: 'City Tour', vehicle: 'DEF-456', passengers: 8, status: 'confirmado' },
        { id: 3, client: 'Carlos López', date: '2025-07-17', time: '10:30', route: 'Playa Excursion', vehicle: 'GHI-789', passengers: 12, status: 'pendiente' },
        { id: 4, client: 'Ana Martínez', date: '2025-07-15', time: '11:30', route: 'Tour Montaña', vehicle: 'JKL-012', passengers: 15, status: 'confirmado' },
        { id: 5, client: 'Luis Rodríguez', date: '2025-07-20', time: '08:45', route: 'Aeropuerto - Hotel Zone', vehicle: 'ABC-123', passengers: 6, status: 'confirmado' },
        { id: 6, client: 'Sofía Hernández', date: '2025-07-22', time: '15:30', route: 'City Tour', vehicle: 'DEF-456', passengers: 10, status: 'pendiente' },
        { id: 7, client: 'Miguel Torres', date: '2025-07-25', time: '13:00', route: 'Playa Excursion', vehicle: 'GHI-789', passengers: 8, status: 'confirmado' },
        { id: 8, client: 'Elena Vargas', date: '2025-07-28', time: '09:30', route: 'Tour Montaña', vehicle: 'JKL-012', passengers: 14, status: 'cancelado' }
    ];
}

function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Helper functions
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Variables globales para el calendario
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active tab
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Load section data
    switch(sectionId) {
        case 'fleet':
            loadFleet();
            break;
        case 'bookings':
            loadCalendar();
            // Seleccionar hoy por defecto
            const today = new Date();
            const todayStr = today.getFullYear() + '-' + 
                           String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                           String(today.getDate()).padStart(2, '0');
            selectDate(todayStr);
            break;
        case 'clients':
            loadClients();
            break;
        case 'drivers':
            loadDrivers();
            break;
        case 'routes':
            loadRoutes();
            break;
    }
}

// Calendar functions
function loadCalendar() {
    const bookings = getBookings();
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    
    // Remove existing day elements (keep headers)
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const dayString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        dayElement.className = 'calendar-day';
        
        // Check if day is weekend
        const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayElement.classList.add('weekend');
        }
        
        // Check if today
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('current-day');
        }
        
        // Check if selected
        if (selectedDate === dayString) {
            dayElement.classList.add('selected');
        }
        
        // Check for bookings
        const dayBookings = bookings.filter(b => b.date === dayString);
        if (dayBookings.length > 0) {
            dayElement.classList.add('has-events');
        }
        
        dayElement.innerHTML = `
            <div class="calendar-day-number">${day}</div>
            <div class="calendar-day-events">
                ${dayBookings.map(booking => 
                    `<div class="calendar-event-dot ${booking.status}"></div>`
                ).join('')}
            </div>
        `;
        
        dayElement.onclick = () => selectDate(dayString);
        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(date) {
    selectedDate = date;
    loadCalendar();
    showDayBookings(date);
}

function showDayBookings(date) {
    const bookings = getBookings();
    const dayBookingsList = document.getElementById('dayBookingsList');
    const selectedDateElement = document.getElementById('selectedDate');
    
    // Format the date for display
    const dateObj = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    selectedDateElement.textContent = dateObj.toLocaleDateString('es-ES', options);
    
    const dayBookings = bookings.filter(b => b.date === date);
    
    if (dayBookings.length > 0) {
        dayBookingsList.innerHTML = '';
        
        // Sort bookings by time
        dayBookings.sort((a, b) => {
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
        });
        
        dayBookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.className = 'booking-item';
            bookingItem.innerHTML = `
                <div class="booking-time">${booking.time}</div>
                <div class="booking-info">
                    <div><strong>${booking.client}</strong> - ${booking.route}</div>
                    <div>${booking.vehicle} - ${booking.passengers} pasajeros</div>
                </div>
                <div class="booking-status">
                    <span class="status ${booking.status}">${booking.status}</span>
                </div>
                <div class="booking-actions">
                    <button class="btn btn-success" style="padding: 5px 10px; font-size: 14px;" onclick="editBooking(${booking.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" style="padding: 5px 10px; font-size: 14px;" onclick="deleteBooking(${booking.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            dayBookingsList.appendChild(bookingItem);
        });
    } else {
        dayBookingsList.innerHTML = '<p class="no-bookings">No hay reservas para este día</p>';
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    loadCalendar();
}

function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    loadCalendar();
    
    const todayStr = today.getFullYear() + '-' + 
                   String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                   String(today.getDate()).padStart(2, '0');
    selectDate(todayStr);
}

// Vehicle management
function loadFleet() {
    const vehicles = getVehicles();
    const fleetGrid = document.getElementById('fleetGrid');
    fleetGrid.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <h4>${vehicle.brand} ${vehicle.model}</h4>
            <div class="vehicle-info">
                <span><i class="fas fa-id-badge"></i> ${vehicle.plate}</span>
                <span class="status ${vehicle.status}">${vehicle.status}</span>
            </div>
            <div class="vehicle-info">
                <span><i class="fas fa-users"></i> ${vehicle.capacity} pasajeros</span>
                <span><i class="fas fa-calendar"></i> ${vehicle.year}</span>
            </div>
            <div style="margin-top: 15px;">
                <button class="btn btn-success" onclick="editVehicle(${vehicle.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" onclick="deleteVehicle(${vehicle.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        fleetGrid.appendChild(vehicleCard);
    });
}

function searchVehicles() {
    const searchTerm = document.getElementById('vehicleSearch').value.toLowerCase();
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showAddVehicleModal() {
    document.getElementById('vehicleModalTitle').textContent = 'Agregar Vehículo';
    document.getElementById('vehicleId').value = '';
    document.getElementById('vehicleForm').reset();
    document.getElementById('addVehicleModal').style.display = 'block';
}

function editVehicle(id) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id == id);
    
    if (vehicle) {
        document.getElementById('vehicleModalTitle').textContent = 'Editar Vehículo';
        document.getElementById('vehicleId').value = vehicle.id;
        document.getElementById('vehicleBrand').value = vehicle.brand;
        document.getElementById('vehicleModel').value = vehicle.model;
        document.getElementById('vehiclePlate').value = vehicle.plate;
        document.getElementById('vehicleCapacity').value = vehicle.capacity;
        document.getElementById('vehicleYear').value = vehicle.year;
        document.getElementById('vehicleStatus').value = vehicle.status;
        
        document.getElementById('addVehicleModal').style.display = 'block';
    }
}

function deleteVehicle(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
        let vehicles = getVehicles();
        vehicles = vehicles.filter(v => v.id !== id);
        saveVehicles(vehicles);
        loadFleet();
        updateDashboard();
        showNotification('Vehículo eliminado exitosamente', 'success');
    }
}

// Booking management
function showAddBookingModal() {
    document.getElementById('bookingModalTitle').textContent = 'Nueva Reserva';
    document.getElementById('bookingId').value = '';
    document.getElementById('bookingForm').reset();
    
    // Set default date to selected date or today
    const dateToUse = selectedDate || new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').value = dateToUse;
    
    // Set default time to current time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('bookingTime').value = `${hours}:${minutes}`;
    
    // Populate client dropdown
    const clients = getClients();
    const clientSelect = document.getElementById('bookingClient');
    clientSelect.innerHTML = '<option value="">Seleccionar cliente</option>';
    clients.forEach(client => {
        clientSelect.innerHTML += `<option value="${client.name}">${client.name}</option>`;
    });
    
    // Populate route dropdown
    const routes = getRoutes();
    const routeSelect = document.getElementById('bookingRoute');
    routeSelect.innerHTML = '<option value="">Seleccionar ruta</option>';
    routes.forEach(route => {
        routeSelect.innerHTML += `<option value="${route.name}">${route.name}</option>`;
    });
    
    // Populate vehicle dropdown
    const vehicles = getVehicles();
    const vehicleSelect = document.getElementById('bookingVehicle');
    vehicleSelect.innerHTML = '<option value="">Seleccionar vehículo</option>';
    vehicles.forEach(vehicle => {
        vehicleSelect.innerHTML += `<option value="${vehicle.plate}">${vehicle.brand} ${vehicle.model} (${vehicle.plate})</option>`;
    });
    
    document.getElementById('addBookingModal').style.display = 'block';
}

function editBooking(id) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id == id);
    
    if (booking) {
        document.getElementById('bookingModalTitle').textContent = 'Editar Reserva';
        document.getElementById('bookingId').value = booking.id;
        document.getElementById('bookingClient').value = booking.client;
        document.getElementById('bookingDate').value = booking.date;
        document.getElementById('bookingTime').value = booking.time;
        document.getElementById('bookingRoute').value = booking.route;
        document.getElementById('bookingVehicle').value = booking.vehicle;
        document.getElementById('bookingPassengers').value = booking.passengers;
        document.getElementById('bookingStatus').value = booking.status;
        
        // Populate client dropdown
        const clients = getClients();
        const clientSelect = document.getElementById('bookingClient');
        clientSelect.innerHTML = '<option value="">Seleccionar cliente</option>';
        clients.forEach(client => {
            clientSelect.innerHTML += `<option value="${client.name}" ${client.name === booking.client ? 'selected' : ''}>${client.name}</option>`;
        });
        
        // Populate route dropdown
        const routes = getRoutes();
        const routeSelect = document.getElementById('bookingRoute');
        routeSelect.innerHTML = '<option value="">Seleccionar ruta</option>';
        routes.forEach(route => {
            routeSelect.innerHTML += `<option value="${route.name}" ${route.name === booking.route ? 'selected' : ''}>${route.name}</option>`;
        });
        
        // Populate vehicle dropdown
        const vehicles = getVehicles();
        const vehicleSelect = document.getElementById('bookingVehicle');
        vehicleSelect.innerHTML = '<option value="">Seleccionar vehículo</option>';
        vehicles.forEach(vehicle => {
            vehicleSelect.innerHTML += `<option value="${vehicle.plate}" ${vehicle.plate === booking.vehicle ? 'selected' : ''}>${vehicle.brand} ${vehicle.model} (${vehicle.plate})</option>`;
        });
        
        document.getElementById('addBookingModal').style.display = 'block';
    }
}

function deleteBooking(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
        let bookings = getBookings();
        bookings = bookings.filter(b => b.id !== id);
        saveBookings(bookings);
        loadCalendar();
        showDayBookings(selectedDate);
        updateDashboard();
        showNotification('Reserva eliminada exitosamente', 'success');
    }
}

// Client management
function loadClients() {
    const clients = getClients();
    const clientsTable = document.getElementById('clientsTable');
    clientsTable.innerHTML = '';
    
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.bookings}</td>
            <td>
                <button class="btn btn-success" onclick="editClient(${client.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteClient(${client.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        clientsTable.appendChild(row);
    });
}

function searchClients() {
    const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#clientsTable tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showAddClientModal() {
    document.getElementById('clientModalTitle').textContent = 'Agregar Cliente';
    document.getElementById('clientId').value = '';
    document.getElementById('clientForm').reset();
    document.getElementById('addClientModal').style.display = 'block';
}

function editClient(id) {
    const clients = getClients();
    const client = clients.find(c => c.id == id);
    
    if (client) {
        document.getElementById('clientModalTitle').textContent = 'Editar Cliente';
        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientPhone').value = client.phone;
        document.getElementById('clientAddress').value = client.address || '';
        
        document.getElementById('addClientModal').style.display = 'block';
    }
}

function deleteClient(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        let clients = getClients();
        clients = clients.filter(c => c.id !== id);
        saveClients(clients);
        loadClients();
        showNotification('Cliente eliminado exitosamente', 'success');
    }
}

// Driver management
function loadDrivers() {
    const drivers = getDrivers();
    const driversTable = document.getElementById('driversTable');
    driversTable.innerHTML = '';
    
    drivers.forEach(driver => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${driver.id}</td>
            <td>${driver.name}</td>
            <td>${driver.license}</td>
            <td>${driver.phone}</td>
            <td><span class="status ${driver.status}">${driver.status}</span></td>
            <td>${driver.vehicle}</td>
            <td>
                <button class="btn btn-success" onclick="editDriver(${driver.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteDriver(${driver.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        driversTable.appendChild(row);
    });
}

function searchDrivers() {
    const searchTerm = document.getElementById('driverSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#driversTable tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showAddDriverModal() {
    document.getElementById('driverModalTitle').textContent = 'Agregar Conductor';
    document.getElementById('driverId').value = '';
    document.getElementById('driverForm').reset();
    document.getElementById('addDriverModal').style.display = 'block';
}

function editDriver(id) {
    const drivers = getDrivers();
    const driver = drivers.find(d => d.id == id);
    
    if (driver) {
        document.getElementById('driverModalTitle').textContent = 'Editar Conductor';
        document.getElementById('driverId').value = driver.id;
        document.getElementById('driverName').value = driver.name;
        document.getElementById('driverLicense').value = driver.license;
        document.getElementById('driverPhone').value = driver.phone;
        document.getElementById('driverExperience').value = driver.experience;
        document.getElementById('driverStatus').value = driver.status;
        
        document.getElementById('addDriverModal').style.display = 'block';
    }
}

function deleteDriver(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este conductor?')) {
        let drivers = getDrivers();
        drivers = drivers.filter(d => d.id !== id);
        saveDrivers(drivers);
        loadDrivers();
        updateDashboard();
        showNotification('Conductor eliminado exitosamente', 'success');
    }
}

// Route management
function loadRoutes() {
    const routes = getRoutes();
    const routesTable = document.getElementById('routesTable');
    routesTable.innerHTML = '';
    
    routes.forEach(route => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${route.id}</td>
            <td>${route.name}</td>
            <td>${route.origin}</td>
            <td>${route.destination}</td>
            <td>${route.duration}h</td>
            <td>$${route.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-success" onclick="editRoute(${route.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteRoute(${route.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        routesTable.appendChild(row);
    });
}

function searchRoutes() {
    const searchTerm = document.getElementById('routeSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#routesTable tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showAddRouteModal() {
    document.getElementById('routeModalTitle').textContent = 'Agregar Ruta';
    document.getElementById('routeId').value = '';
    document.getElementById('routeForm').reset();
    document.getElementById('addRouteModal').style.display = 'block';
}

function editRoute(id) {
    const routes = getRoutes();
    const route = routes.find(r => r.id == id);
    
    if (route) {
        document.getElementById('routeModalTitle').textContent = 'Editar Ruta';
        document.getElementById('routeId').value = route.id;
        document.getElementById('routeName').value = route.name;
        document.getElementById('routeOrigin').value = route.origin;
        document.getElementById('routeDestination').value = route.destination;
        document.getElementById('routeDuration').value = route.duration;
        document.getElementById('routePrice').value = route.price;
        document.getElementById('routeDescription').value = route.description || '';
        
        document.getElementById('addRouteModal').style.display = 'block';
    }
}

function deleteRoute(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta ruta?')) {
        let routes = getRoutes();
        routes = routes.filter(r => r.id !== id);
        saveRoutes(routes);
        loadRoutes();
        showNotification('Ruta eliminada exitosamente', 'success');
    }
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form handlers
document.getElementById('vehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const vehicles = getVehicles();
    const id = document.getElementById('vehicleId').value;
    const brand = document.getElementById('vehicleBrand').value;
    const model = document.getElementById('vehicleModel').value;
    const plate = document.getElementById('vehiclePlate').value;
    const capacity = parseInt(document.getElementById('vehicleCapacity').value);
    const year = parseInt(document.getElementById('vehicleYear').value);
    const status = document.getElementById('vehicleStatus').value;
    
    if (id) {
        // Edit existing vehicle
        const index = vehicles.findIndex(v => v.id == id);
        if (index !== -1) {
            vehicles[index] = {id: parseInt(id), brand, model, plate, capacity, year, status};
            showNotification('Vehículo actualizado exitosamente', 'success');
        }
    } else {
        // Add new vehicle
        const newId = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
        vehicles.push({id: newId, brand, model, plate, capacity, year, status});
        showNotification('Vehículo agregado exitosamente', 'success');
    }
    
    saveVehicles(vehicles);
    loadFleet();
    closeModal('addVehicleModal');
    this.reset();
    updateDashboard();
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar número de pasajeros
    const passengers = parseInt(document.getElementById('bookingPassengers').value);
    if (passengers < 1 || passengers > 50) {
        showNotification('El número de pasajeros debe estar entre 1 y 50', 'error');
        return;
    }
    
    // Obtener fecha y hora seleccionadas
    const bookingDateStr = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    
    // Crear objeto Date con la fecha y hora seleccionadas
    const [year, month, day] = bookingDateStr.split('-').map(Number);
    const [hours, minutes] = bookingTime.split(':').map(Number);
    const bookingDate = new Date(year, month - 1, day, hours, minutes);
    
    // Comparar con la fecha y hora actuales
    const now = new Date();
    
    // Si la fecha de reserva es pasada, mostrar alerta de confirmación
    if (bookingDate < now) {
        if (!confirm('La fecha y hora seleccionadas ya han pasado. ¿Desea crear la reserva de todas formas?')) {
            return; // El usuario canceló
        }
    }
    
    const bookings = getBookings();
    const id = document.getElementById('bookingId').value;
    const client = document.getElementById('bookingClient').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const route = document.getElementById('bookingRoute').value;
    const vehicle = document.getElementById('bookingVehicle').value;
    const status = document.getElementById('bookingStatus').value;
    
    if (id) {
        // Edit existing booking
        const index = bookings.findIndex(b => b.id == id);
        if (index !== -1) {
            bookings[index] = {id: parseInt(id), client, date, time, route, vehicle, passengers, status};
            showNotification('Reserva actualizada exitosamente', 'success');
        }
    } else {
        // Add new booking
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        bookings.push({id: newId, client, date, time, route, vehicle, passengers, status});
        showNotification('Reserva creada exitosamente', 'success');
    }
    
    saveBookings(bookings);
    loadCalendar();
    selectDate(date);
    closeModal('addBookingModal');
    this.reset();
    updateDashboard();
});

document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const clients = getClients();
    const id = document.getElementById('clientId').value;
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const address = document.getElementById('clientAddress').value;
    
    if (id) {
        // Edit existing client
        const index = clients.findIndex(c => c.id == id);
        if (index !== -1) {
            const bookings = clients[index].bookings;
            clients[index] = {id: parseInt(id), name, email, phone, address, bookings};
            showNotification('Cliente actualizado exitosamente', 'success');
        }
    } else {
        // Add new client
        const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        clients.push({id: newId, name, email, phone, address, bookings: 0});
        showNotification('Cliente agregado exitosamente', 'success');
    }
    
    saveClients(clients);
    loadClients();
    closeModal('addClientModal');
    this.reset();
});

document.getElementById('driverForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const drivers = getDrivers();
    const id = document.getElementById('driverId').value;
    const name = document.getElementById('driverName').value;
    const license = document.getElementById('driverLicense').value;
    const phone = document.getElementById('driverPhone').value;
    const experience = parseInt(document.getElementById('driverExperience').value);
    const status = document.getElementById('driverStatus').value;
    const vehicle = id ? drivers.find(d => d.id == id)?.vehicle || 'Sin asignar' : 'Sin asignar';
    
    if (id) {
        // Edit existing driver
        const index = drivers.findIndex(d => d.id == id);
        if (index !== -1) {
            drivers[index] = {id: parseInt(id), name, license, phone, experience, status, vehicle};
            showNotification('Conductor actualizado exitosamente', 'success');
        }
    } else {
        // Add new driver
        const newId = drivers.length > 0 ? Math.max(...drivers.map(d => d.id)) + 1 : 1;
        drivers.push({id: newId, name, license, phone, experience, status, vehicle});
        showNotification('Conductor agregado exitosamente', 'success');
    }
    
    saveDrivers(drivers);
    loadDrivers();
    closeModal('addDriverModal');
    this.reset();
    updateDashboard();
});

document.getElementById('routeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const routes = getRoutes();
    const id = document.getElementById('routeId').value;
    const name = document.getElementById('routeName').value;
    const origin = document.getElementById('routeOrigin').value;
    const destination = document.getElementById('routeDestination').value;
    const duration = parseFloat(document.getElementById('routeDuration').value);
    const price = parseFloat(document.getElementById('routePrice').value);
    const description = document.getElementById('routeDescription').value;
    
    if (id) {
        // Edit existing route
        const index = routes.findIndex(r => r.id == id);
        if (index !== -1) {
            routes[index] = {id: parseInt(id), name, origin, destination, duration, price, description};
            showNotification('Ruta actualizada exitosamente', 'success');
        }
    } else {
        // Add new route
        const newId = routes.length > 0 ? Math.max(...routes.map(r => r.id)) + 1 : 1;
        routes.push({id: newId, name, origin, destination, duration, price, description});
        showNotification('Ruta agregada exitosamente', 'success');
    }
    
    saveRoutes(routes);
    loadRoutes();
    closeModal('addRouteModal');
    this.reset();
});

// Initialize dashboard
function updateDashboard() {
    const vehicles = getVehicles();
    const drivers = getDrivers();
    const bookings = getBookings();
    const today = new Date().toISOString().split('T')[0];
    
    const todayBookings = bookings.filter(b => b.date === today && b.status !== 'cancelado').length;
    const availableDrivers = drivers.filter(d => d.status === 'disponible').length;
    
    document.getElementById('totalVehicles').textContent = vehicles.length;
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('totalDrivers').textContent = availableDrivers;
    
    // Calculate today's revenue
    const todayRevenue = bookings
        .filter(b => b.date === today && b.status !== 'cancelado')
        .reduce((sum, booking) => {
            const routes = getRoutes();
            const route = routes.find(r => r.name === booking.route);
            return sum + (route ? route.price * booking.passengers : 0);
        }, 0);
    
    document.getElementById('todayRevenue').textContent = `$${todayRevenue.toFixed(2)}`;
}

function clearAllData() {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los datos? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        loadFleet();
        loadCalendar();
        loadClients();
        loadDrivers();
        loadRoutes();
        updateDashboard();
        showNotification('Todos los datos han sido eliminados', 'success');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    loadFleet();
    loadClients();
    loadDrivers();
    loadRoutes();
    
    // If we're on the bookings section, load the calendar
    if (document.getElementById('bookings').classList.contains('active')) {
        loadCalendar();
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + 
                       String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(today.getDate()).padStart(2, '0');
        selectDate(todayStr);
    }
});

// Update dashboard every minute
setInterval(updateDashboard, 60000);

// Simulate real-time updates
setInterval(function() {
    // Simulate booking status changes
    if (Math.random() > 0.7) {
        const bookings = getBookings();
        const pendingBookings = bookings.filter(b => b.status === 'pendiente');
        
        if (pendingBookings.length > 0) {
            const randomBooking = pendingBookings[Math.floor(Math.random() * pendingBookings.length)];
            if (randomBooking) {
                randomBooking.status = 'confirmado';
                saveBookings(bookings);
                
                if (document.getElementById('bookings').classList.contains('active')) {
                    loadCalendar();
                    showDayBookings(selectedDate);
                }
            }
        }
    }
    
    // Simulate vehicle status changes
    if (Math.random() > 0.8) {
        const vehicles = getVehicles();
        const occupiedVehicles = vehicles.filter(v => v.status === 'ocupado');
        
        if (occupiedVehicles.length > 0) {
            const randomVehicle = occupiedVehicles[Math.floor(Math.random() * occupiedVehicles.length)];
            if (randomVehicle) {
                randomVehicle.status = 'disponible';
                saveVehicles(vehicles);
                
                if (document.getElementById('fleet').classList.contains('active')) {
                    loadFleet();
                }
            }
        }
    }
}, 30000);
