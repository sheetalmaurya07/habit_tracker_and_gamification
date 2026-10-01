<<<<<<< HEAD
package com.habittracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Habit Tracker Backend is running successfully!";
    }
=======
package com.habittracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Habit Tracker Backend is running successfully!";
    }
>>>>>>> 70ba1d47eb28022f4bd2780e9238e7593273f389
}