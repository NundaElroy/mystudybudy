package com.mystudybudy.mystudybudy.servicesimp;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.exceptions.DocFileException;
import com.mystudybudy.mystudybudy.service.DocFileService;
import com.mystudybudy.mystudybudy.service.FolderService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
public class FileHandlerService {

    private final Cloudinary cloudinary;
    private final DocFileService docFileService;
    private final FolderService folderService;


    public FileHandlerService(DocFileService docFileService, FolderService folderService) {
        this.docFileService = docFileService;
        this.folderService = folderService;
        Dotenv dotenv = Dotenv.load();
        this.cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
    }

    public DocFile saveFile(MultipartFile file, String name, User user, Long folderId) throws IOException {
        log.info("Starting to save file: {}", name);

        // Validate input
        if (file.isEmpty()) {
            throw new DocFileException("Please upload a file");
        }

        if (!file.getContentType().equals("application/pdf")) {
            throw new DocFileException("Only PDF files are allowed");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && !originalFilename.toLowerCase().endsWith(".pdf")) {
            throw new DocFileException("Only PDF files are allowed");
        }

        // Upload to Cloudinary (memory-based)
        Map uploadResult = uploadToCloudinary(file, name);

        // Map response to DocFile entity
        DocFile docFile = new DocFile();
        docFile.setName(name);
        docFile.setUrl(uploadResult.get("secure_url").toString());
        docFile.setSize(((Integer) uploadResult.get("bytes")) / 1024.0); // KB
        docFile.addUser(user);
        docFile.addFolder(folderService.getFolderByID(folderId));



        log.info("File uploaded to Cloudinary as: {}", docFile.getName());
        return docFileService.saveFile(docFile);
    }

    private Map uploadToCloudinary(MultipartFile multipartFile, String name) throws IOException {
        log.info("Uploading PDF file to Cloudinary from memory...");

        Map params = ObjectUtils.asMap(
                "resource_type", "raw", // PDF is not an image
                "use_filename", true,
                "unique_filename", false,
                "overwrite", true,
                "public_id", name
        );

        Map result = cloudinary.uploader().upload(multipartFile.getBytes(), params);
        log.debug("Cloudinary response: {}", result);
        return result;
    }
}
