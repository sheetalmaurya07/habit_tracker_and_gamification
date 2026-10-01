package com.habittracker.controller;

import com.habittracker.entity.Habit;
import com.habittracker.entity.User;
import com.habittracker.repository.HabitRepository;
import com.habittracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitController {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    public HabitController(HabitRepository habitRepository,
                            UserRepository userRepository) {
        this.habitRepository = habitRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getHabits(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        return ResponseEntity.ok(habitRepository.findByUser(user));
    }

    @PostMapping
    public ResponseEntity<?> addHabit(@RequestParam Long userId,
                                      @RequestBody Habit habit) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        habit.setUser(user);
        if (habit.getCreatedDate() == null) {
            habit.setCreatedDate(LocalDate.now());
        }
        return ResponseEntity.ok(habitRepository.save(habit));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeHabit(@PathVariable Long id) {
        Habit habit = habitRepository.findById(id).orElse(null);
        if (habit == null) return ResponseEntity.notFound().build();

        if (!habit.isCompleted()) {
            habit.setCompleted(true);
            User user = habit.getUser();
            user.setPoints(user.getPoints() + 10);
            userRepository.save(user);
        }

        return ResponseEntity.ok(habitRepository.save(habit));
    }

    @PutMapping("/{id}/reset")
    public ResponseEntity<?> resetHabit(@PathVariable Long id) {
        Habit habit = habitRepository.findById(id).orElse(null);
        if (habit == null) return ResponseEntity.notFound().build();

        habit.setCompleted(false);
        return ResponseEntity.ok(habitRepository.save(habit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHabit(@PathVariable Long id) {
        if (!habitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        habitRepository.deleteById(id);
        return ResponseEntity.ok("Habit deleted successfully");
    }
}
