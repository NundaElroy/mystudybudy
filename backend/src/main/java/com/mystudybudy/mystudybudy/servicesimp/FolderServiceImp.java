package com.mystudybudy.mystudybudy.servicesimp;

import com.mystudybudy.mystudybudy.entity.Folder;
import com.mystudybudy.mystudybudy.exceptions.FolderException;
import com.mystudybudy.mystudybudy.repo.FolderRepo;
import com.mystudybudy.mystudybudy.service.FolderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImp implements FolderService {

    private final FolderRepo folderRepo;

    public FolderServiceImp(FolderRepo folderRepo) {
        this.folderRepo = folderRepo;
    }

    @Override
    public Folder saveFolder(Folder folder) throws FolderException {
        return folderRepo.save(folder);
    }

    @Override
    public void deleteFolder(Long folderID) throws FolderException {
          folderRepo.deleteById(folderID);
    }

    @Override
    public List<Folder> getFilesByFoldersID(Long userID) throws FolderException {
        return List.of();
    }

    @Override
    public Folder getFolderByID(Long folderId) throws FolderException {
        return folderRepo.findById(folderId)
                .orElseThrow(() -> new FolderException("Folder not found with id: " + folderId));
    }

}
