package com.mystudybudy.mystudybudy.controller;

import com.mystudybudy.mystudybudy.dtos.ResponseDTO;
import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.service.DocFileService;
import com.mystudybudy.mystudybudy.service.FolderService;
import com.mystudybudy.mystudybudy.service.UserService;
import com.mystudybudy.mystudybudy.servicesimp.FileHandlerService;
import com.mystudybudy.mystudybudy.servicesimp.JwtTokenProvider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final FileHandlerService fileHandlerService;


    public FileController(UserService userService, JwtTokenProvider jwtTokenProvider, FileHandlerService fileHandlerService) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.fileHandlerService = fileHandlerService;

    }

    @PostMapping("/api/file")
    public ResponseDTO<?> addAndSaveFile(@RequestParam("file") MultipartFile file,
                                         @RequestParam("filename") String filename,
                                         @RequestParam("folderId") Long folderId,
                                         @RequestHeader("Authorization") String token) throws IOException {

        if ((file.getBytes().length > 5 * 1024 * 1024) && (folderId) == null) {
            return new ResponseDTO<>("error", "File size exceeds the 5 MB limit or no folder id", null, null, "/api/file", 400);
        }

        if (token == null ) {
            return new ResponseDTO<>("error", "Token is missing", null, null, "/api/file", 401);
        }

        String email = jwtTokenProvider.getEmail(token);
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseDTO<>("error", "User not found", null, null, "/api/file", 404);
        }

        try {
            DocFile docFile = fileHandlerService.saveFile(file, filename, user,folderId);
            return new ResponseDTO<>("success", docFile, null, "File uploaded successfully", "/api/file", 200);
        } catch (Exception e) {
            return new ResponseDTO<>("error", "An unexpected error occurred", null, null, "/api/file", 500);
        }
    }

}
