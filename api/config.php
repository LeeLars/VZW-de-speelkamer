<?php
// Database configuration for Hostinger MySQL
// Update these values with your Hostinger database credentials

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database credentials - UPDATE THESE WITH YOUR HOSTINGER VALUES
define('DB_HOST', 'localhost');  // Usually 'localhost' on Hostinger
define('DB_NAME', 'your_database_name');  // Your database name from Hostinger
define('DB_USER', 'your_database_user');  // Your database username
define('DB_PASS', 'your_database_password');  // Your database password

// Create database connection
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit();
    }
}

// Helper function to send JSON response
function sendJSON($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Helper function to get JSON input
function getJSONInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}
?>
