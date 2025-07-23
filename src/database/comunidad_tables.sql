-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    bio TEXT,
    location VARCHAR(255),
    website VARCHAR(255),
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de recursos
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document', 'video', 'audio', 'link')),
    access_level VARCHAR(50) NOT NULL CHECK (access_level IN ('free', 'paid')),
    thumbnail_url VARCHAR(255),
    file_url VARCHAR(255),
    file_size INTEGER,
    download_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías del foro
CREATE TABLE forum_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3b82f6',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de temas del foro
CREATE TABLE forum_topics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INTEGER REFERENCES forum_categories(id),
    author_id INTEGER REFERENCES users(id),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    last_reply_at TIMESTAMP,
    last_reply_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de respuestas del foro
CREATE TABLE forum_replies (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    topic_id INTEGER REFERENCES forum_topics(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES users(id),
    parent_reply_id INTEGER REFERENCES forum_replies(id),
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de acceso a recursos
CREATE TABLE user_resource_access (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id),
    access_granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(user_id, resource_id)
);

-- Tabla de suscripciones
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('free', 'premium', 'pro')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de actividad de usuarios
CREATE TABLE user_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,
    activity_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimización
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_access_level ON resources(access_level);
CREATE INDEX idx_forum_topics_category ON forum_topics(category_id);
CREATE INDEX idx_forum_replies_topic ON forum_replies(topic_id);
CREATE INDEX idx_user_activity_user ON user_activity(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);

-- Datos iniciales
INSERT INTO forum_categories (name, description, color, sort_order) VALUES
('General', 'Discusiones generales sobre la comunidad', '#3b82f6', 1),
('Recursos', 'Comparte y discute recursos educativos', '#10b981', 2),
('Ayuda', 'Obtén ayuda de otros miembros de la comunidad', '#f59e0b', 3),
('Anuncios', 'Anuncios oficiales y noticias importantes', '#8b5cf6', 4);

-- Usuario administrador por defecto
INSERT INTO users (name, email, password_hash, is_admin, email_verified) VALUES
('Administrador', 'admin@eduardoescalante.com', '$2b$10$dummy.hash.for.development', TRUE, TRUE);
