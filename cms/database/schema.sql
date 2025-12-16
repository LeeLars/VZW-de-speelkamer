-- VZW De Speelkamer CMS Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    hours VARCHAR(100) NOT NULL,
    price VARCHAR(255) NOT NULL,
    description TEXT,
    google_form_url TEXT NOT NULL,
    practical_info_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing table
CREATE TABLE IF NOT EXISTS pricing (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) UNIQUE NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    intro TEXT,
    bio TEXT,
    phone VARCHAR(50),
    phone2 VARCHAR(50),
    email VARCHAR(255),
    email2 VARCHAR(255),
    image_url TEXT,
    location_ids TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    phone VARCHAR(50),
    phone2 VARCHAR(50),
    email VARCHAR(255),
    email2 VARCHAR(255),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact page settings (single row)
CREATE TABLE IF NOT EXISTS contact_info (
    id INTEGER PRIMARY KEY DEFAULT 1,
    email VARCHAR(255),
    email2 VARCHAR(255),
    phone VARCHAR(50),
    phone2 VARCHAR(50),
    gsm VARCHAR(50),
    gsm2 VARCHAR(50),
    facebook TEXT,
    address TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site images table (hero & homepage visuals)
CREATE TABLE IF NOT EXISTS site_images (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    image_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_start_date ON activities(start_date);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_pricing_category ON pricing(category);
CREATE INDEX IF NOT EXISTS idx_site_images_section ON site_images(section);
