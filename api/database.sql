-- VZW De Speelkamer Database Schema
-- Import this file in phpMyAdmin on Hostinger

-- Create activities table
CREATE TABLE IF NOT EXISTS `activities` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE DEFAULT NULL,
  `locationId` VARCHAR(50) NOT NULL,
  `hours` VARCHAR(50) NOT NULL,
  `price` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `googleFormUrl` VARCHAR(500) NOT NULL,
  `imageUrl` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create team_members table
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `locationIds` JSON NOT NULL,
  `imageUrl` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create pricing table
CREATE TABLE IF NOT EXISTS `pricing` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `standardRate` DECIMAL(10,2) NOT NULL DEFAULT 1.20,
  `noonRate` DECIMAL(10,2) NOT NULL DEFAULT 1.60,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default pricing
INSERT INTO `pricing` (`id`, `standardRate`, `noonRate`) 
VALUES (1, 1.20, 1.60)
ON DUPLICATE KEY UPDATE id=id;

-- Create indexes for better performance
CREATE INDEX idx_activities_date ON activities(startDate);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_team_name ON team_members(name);
