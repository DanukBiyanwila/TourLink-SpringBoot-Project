package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/cart")
public interface CartController {

    @PostMapping("/{id}")
    public ResponseEntity<Object> add(@RequestBody Map<String, String> requestMap, @PathVariable("id") String id);
    
    @GetMapping(path = "/view/{id}")
	public ResponseEntity<?> getAllCartDetail(@PathVariable("id") String id);
    
}
