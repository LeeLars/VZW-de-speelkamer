<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            $stmt = $conn->query("SELECT * FROM pricing LIMIT 1");
            $pricing = $stmt->fetch();
            
            if (!$pricing) {
                // Return default pricing if none exists
                sendJSON(['standardRate' => 1.20, 'noonRate' => 1.60]);
            } else {
                sendJSON($pricing);
            }
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        $data = getJSONInput();
        
        try {
            // Check if pricing exists
            $stmt = $conn->query("SELECT COUNT(*) as count FROM pricing");
            $result = $stmt->fetch();
            
            if ($result['count'] > 0) {
                // Update existing
                $stmt = $conn->prepare("
                    UPDATE pricing 
                    SET standardRate = :standardRate, noonRate = :noonRate
                    WHERE id = 1
                ");
            } else {
                // Insert new
                $stmt = $conn->prepare("
                    INSERT INTO pricing (id, standardRate, noonRate)
                    VALUES (1, :standardRate, :noonRate)
                ");
            }
            
            $stmt->execute([
                ':standardRate' => $data['standardRate'],
                ':noonRate' => $data['noonRate']
            ]);
            
            sendJSON(['success' => true]);
        } catch(PDOException $e) {
            sendJSON(['error' => $e->getMessage()], 500);
        }
        break;
        
    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
?>
