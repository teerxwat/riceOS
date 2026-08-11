-- DONAUS RiceOS — เพิ่มเกษตรกร (Farmer onboarding) schema
-- Run against an existing MySQL 8+ database (select the database first):
--   mysql -u <user> -p <database_name> < schema.sql

CREATE TABLE IF NOT EXISTS farmers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  national_id VARCHAR(20) NOT NULL UNIQUE,
  prefix VARCHAR(10),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_date DATE NULL,
  phone VARCHAR(20),
  line_id VARCHAR(100),
  address_on_card TEXT,
  address_current TEXT,
  plant_times_per_year TINYINT,
  planting_seasons JSON,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS farmer_plots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT NOT NULL,
  location VARCHAR(255),
  area_rai DECIMAL(10, 2),
  land_doc_type VARCHAR(50),
  rice_variety VARCHAR(100),
  prev_yield_kg_per_rai DECIMAL(10, 2),
  prev_cost_per_rai DECIMAL(10, 2),
  prev_sale_price_per_ton DECIMAL(10, 2),
  deed_no VARCHAR(100),
  survey_no VARCHAR(100),
  land_no VARCHAR(100),
  sub_district VARCHAR(100),
  district VARCHAR(100),
  province VARCHAR(100),
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6),
  CONSTRAINT fk_farmer_plots_farmer FOREIGN KEY (farmer_id)
    REFERENCES farmers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS farmer_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT NOT NULL,
  doc_type VARCHAR(50) NOT NULL, -- id_card | land_deed | plot_photo | house_photo
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_farmer_documents_farmer FOREIGN KEY (farmer_id)
    REFERENCES farmers(id) ON DELETE CASCADE
) ENGINE=InnoDB;
