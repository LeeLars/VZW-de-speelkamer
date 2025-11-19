<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all activities
        try {
            $stmt = $conn->query("SELECT * FROM activities ORDER BY startDate ASC");
            $activities = $stmt->fetchAll();
            sendJSON($activities);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'POST':
        // Create new activity
        $data = getJSONInput();
        
        try {
            $stmt = $conn->prepare("
                INSERT INTO activities (id, title, type, category, startDate, endDate, locationId, hours, price, description, googleFormUrl, imageUrl)
                VALUES (:id, :title, :type, :category, :startDate, :endDate, :locationId, :hours, :price, :description, :googleFormUrl, :imageUrl)
            ");
            
            $stmt->execute([
                ':id' => $data['id'] ?? uniqid(),
                ':title' => $data['title'],
                ':type' => $data['type'],
                ':category' => $data['category'] ?? null,
                ':startDate' => $data['startDate'],
                ':endDate' => $data['endDate'] ?? null,
                ':locationId' => $data['locationId'],
                ':hours' => $data['hours'],
                ':price' => $data['price'],
                ':description' => $data['description'],
                ':googleFormUrl' => $data['googleFormUrl'],
                ':imageUrl' => $data['imageUrl'] ?? null
            ]);
            
            sendJSON(['success' => true, 'id' => $data['id'] ?? uniqid()], 201);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        // Update activity
        $data = getJSONInput();
        
        try {
            $stmt = $conn->prepare("
                UPDATE activities 
                SET title = :title, type = :type, category = :category, startDate = :startDate, 
                    endDate = :endDate, locationId = :locationId, hours = :hours, 
                    price = :price, description = :description, googleFormUrl = :googleFormUrl, 
                    imageUrl = :imageUrl
                WHERE id = :id
            ");
            
            $stmt->execute([
                ':id' => $data['id'],
                ':title' => $data['title'],
                ':type' => $data['type'],
                ':category' => $data['category'] ?? null,
                ':startDate' => $data['startDate'],
                ':endDate' => $data['endDate'] ?? null,
                ':locationId' => $data['locationId'],
                ':hours' => $data['hours'],
                ':price' => $data['price'],
                ':description' => $data['description'],
                ':googleFormUrl' => $data['googleFormUrl'],
                ':imageUrl' => $data['imageUrl'] ?? null
            ]);
            
            sendJSON(['success' => true]);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        // Delete activity
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            sendJSON(['error' => 'ID required'], 400);
        }
        
        try {
            $stmt = $conn->prepare("DELETE FROM activities WHERE id = :id");
            $stmt->execute([':id' => $id]);
            sendJSON(['success' => true]);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
?>
