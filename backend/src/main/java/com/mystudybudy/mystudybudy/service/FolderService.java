package com.mystudybudy.mystudybudy.service;



import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.entity.Folder;
import com.mystudybudy.mystudybudy.exceptions.FolderException;

import java.util.List;

public interface FolderService {

    Folder saveFolder(Folder folder) throws FolderException;
    void deleteFolder(Long folderID) throws FolderException;
    List<Folder> getFilesByFoldersID(Long userID) throws FolderException;
    Folder getFolderByID(Long fileID) throws FolderException;
//    void addFileToFolder(DocFile docfile)throws f;
}
