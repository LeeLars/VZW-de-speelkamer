<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            $stmt = $conn->query("SELECT * FROM team_members ORDER BY name ASC");
            $team = $stmt->fetchAll();
            
            // Parse locationIds JSON
            foreach ($team as &$member) {
                $member['locationIds'] = json_decode($member['locationIds'], true);
            }
            
            sendJSON($team);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'POST':
        $data = getJSONInput();
        
        try {
            $stmt = $conn->prepare("
                INSERT INTO team_members (id, name, role, locationIds, imageUrl)
                VALUES (:id, :name, :role, :locationIds, :imageUrl)
            ");
            
            $stmt->execute([
                ':id' => $data['id'] ?? uniqid(),
                ':name' => $data['name'],
                ':role' => $data['role'],
                ':locationIds' => json_encode($data['locationIds']),
                ':imageUrl' => $data['imageUrl'] ?? null
            ]);
            
            sendJSON(['success' => true, 'id' => $data['id'] ?? uniqid()], 201);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        $data = getJSONInput();
        
        try {
            $stmt = $conn->prepare("
                UPDATE team_members 
                SET name = :name, role = :role, locationIds = :locationIds, imageUrl = :imageUrl
                WHERE id = :id
            ");
            
            $stmt->execute([
                ':id' => $data['id'],
                ':name' => $data['name'],
                ':role' => $data['role'],
                ':locationIds' => json_encode($data['locationIds']),
                ':imageUrl' => $data['imageUrl'] ?? null
            ]);
            
            sendJSON(['success' => true]);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            sendJSON(['error' => 'ID required'], 400);
        }
        
        try {
            $stmt = $conn->prepare("DELETE FROM team_members WHERE id = :id");
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
