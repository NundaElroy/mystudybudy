package com.mystudybudy.mystudybudy.controller;

import com.mystudybudy.mystudybudy.dtos.ResponseDTO;
import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.entity.Folder;
import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.service.FolderService;
import com.mystudybudy.mystudybudy.service.UserService;
import com.mystudybudy.mystudybudy.servicesimp.FileHandlerService;
import com.mystudybudy.mystudybudy.servicesimp.JwtTokenProvider;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FolderController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final FolderService  folderService;


    public FolderController(UserService userService, JwtTokenProvider jwtTokenProvider, FolderService folderService) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;

        this.folderService = folderService;
    }

    @PostMapping("/api/folder")
    public ResponseDTO<?> addFolder(@RequestParam String name,@RequestHeader("Authorization") String token ){

        if (token == null) {
            return new ResponseDTO<>("error", "Token is missing", null, null, "/api/folder", 401);
        }

        String email = jwtTokenProvider.getEmail(token);
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseDTO<>("error", "User not found", null, null, "/api/folder", 404);
        }

        Folder folder = new Folder();
        folder.addUser(user);
        folder.setName(name);

        try {
            Folder savedFolder= folderService.saveFolder(folder);
            return new ResponseDTO<>("success", savedFolder, null, "Folder added successfully", "/api/folder", 200);
        } catch (Exception e) {
            return new ResponseDTO<>("error", "An unexpected error occurred", null, null, "/api/folder", 500);
        }

    }

    @GetMapping("/api/folder/{id}")
    public ResponseDTO<?> getFolderById(@PathVariable Long id) {
        Folder folder = folderService.getFolderByID(id);
        return new ResponseDTO<>("success", folder, null, null, "/api/folder", 200);
    }

    @GetMapping("/api/folder")
    public ResponseDTO<?> getAllFolder(@RequestHeader("Authorization") String token) {
        if (token == null) {
            return new ResponseDTO<>("error", "Token is missing", null, null, "/api/folder", 401);
        }

        String email = jwtTokenProvider.getEmail(token);
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseDTO<>("error", "User not found", null, null, "/api/folder", 404);
        }

        List<Folder> folders = user.getListOfFolders();

        return new ResponseDTO<>("success", folders, null, null, "/api/folder", 200);


    }

}
