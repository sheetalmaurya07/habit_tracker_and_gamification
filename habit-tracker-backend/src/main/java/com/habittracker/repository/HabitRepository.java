package com.habittracker.repository;

import com.habittracker.entity.Habit;
import com.habittracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Long> {

    List<Habit> findByUser(User user);

    long countByUser(User user);

    long countByUserAndCompleted(User user, boolean completed);
}