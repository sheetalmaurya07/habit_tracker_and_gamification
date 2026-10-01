package com.habittracker.controller;

import com.habittracker.entity.User;
import com.habittracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {
    private final UserRepository userRepository;

    public AchievementController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAchievements(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();

        int points = user.getPoints();
        List<Map<String, Object>> achievements = new ArrayList<>();

        achievements.add(createAchievement(
                "First Step", "Earn 10 points", points >= 10));
        achievements.add(createAchievement(
                "Habit Starter", "Earn 50 points", points >= 50));
        achievements.add(createAchievement(
                "Habit Master", "Earn 100 points", points >= 100));
        achievements.add(createAchievement(
                "Habit Champion", "Earn 500 points", points >= 500));

        return ResponseEntity.ok(achievements);
    }

    private Map<String, Object> createAchievement(
            String title, String description, boolean unlocked) {
        Map<String, Object> achievement = new HashMap<>();
        achievement.put("title", title);
        achievement.put("description", description);
        achievement.put("unlocked", unlocked);
        return achievement;
    }
}
