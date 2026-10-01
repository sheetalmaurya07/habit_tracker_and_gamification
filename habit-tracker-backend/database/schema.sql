-- ============================================
-- Habit Tracker Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS habit_tracker;

USE habit_tracker;


-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- HABITS
-- ============================================

CREATE TABLE habits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,

    name VARCHAR(150) NOT NULL,
    description VARCHAR(500),

    frequency VARCHAR(50) NOT NULL DEFAULT 'DAILY',

    target_count INT DEFAULT 1,

    current_streak INT NOT NULL DEFAULT 0,
    longest_streak INT NOT NULL DEFAULT 0,

    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    start_date DATE NOT NULL,
    end_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_habit_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================
-- PROGRESS
-- ============================================

CREATE TABLE progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    habit_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    progress_date DATE NOT NULL,

    completed BOOLEAN NOT NULL DEFAULT FALSE,

    completion_count INT NOT NULL DEFAULT 0,

    notes VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_progress_habit
        FOREIGN KEY (habit_id)
        REFERENCES habits(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_habit_progress_date
        UNIQUE (habit_id, progress_date)
);


-- ============================================
-- ACHIEVEMENTS
-- ============================================

CREATE TABLE achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    description VARCHAR(500),

    icon VARCHAR(255),

    requirement INT DEFAULT 0,

    achievement_type VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- USER ACHIEVEMENTS
-- ============================================

CREATE TABLE user_achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,
    achievement_id BIGINT NOT NULL,

    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_achievement_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_achievement_achievement
        FOREIGN KEY (achievement_id)
        REFERENCES achievements(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_achievement
        UNIQUE (user_id, achievement_id)
);


-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_habits_user_id
ON habits(user_id);

CREATE INDEX idx_progress_habit_id
ON progress(habit_id);

CREATE INDEX idx_progress_user_id
ON progress(user_id);

CREATE INDEX idx_progress_date
ON progress(progress_date);

CREATE INDEX idx_user_achievements_user_id
ON user_achievements(user_id);


-- ============================================
-- DEFAULT ACHIEVEMENTS
-- ============================================

INSERT INTO achievements
    (name, description, icon, requirement, achievement_type)
VALUES
    (
        'First Step',
        'Complete your first habit',
        'first-step',
        1,
        'COMPLETION'
    ),
    (
        '7 Day Streak',
        'Maintain a habit for 7 consecutive days',
        'seven-day-streak',
        7,
        'STREAK'
    ),
    (
        '30 Day Streak',
        'Maintain a habit for 30 consecutive days',
        'thirty-day-streak',
        30,
        'STREAK'
    ),
    (
        '100 Completions',
        'Complete habits 100 times',
        'hundred-completions',
        100,
        'COMPLETION'
    );

