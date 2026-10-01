package com.habittracker.controller;

import com.habittracker.entity.User;
import com.habittracker.repository.HabitRepository;
import com.habittracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    public ProgressController(HabitRepository habitRepository,
                              UserRepository userRepository) {
        this.habitRepository = habitRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProgress(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();

        long total = habitRepository.countByUser(user);
        long completed = habitRepository.countByUserAndCompleted(user, true);

        double percentage = total > 0
                ? ((double) completed / total) * 100
                : 0;

        Map<String, Object> result = new HashMap<>();
        result.put("totalHabits", total);
        result.put("completedHabits", completed);
        result.put("pendingHabits", total - completed);
        result.put("completionPercentage", percentage);
        result.put("points", user.getPoints());

        return ResponseEntity.ok(result);
    }
}
