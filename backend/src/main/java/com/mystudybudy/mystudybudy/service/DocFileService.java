package com.mystudybudy.mystudybudy.service;

import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.exceptions.DocFileException;


import java.util.List;

public interface DocFileService {
    DocFile saveFile(DocFile docFile) throws DocFileException;
    void deleteDocFile(Long fileID) throws DocFileException;
    List<DocFile>  getFilesByUserID(Long userID) throws DocFileException;
    DocFile getDocFileByID(Long fileID) throws DocFileException;
}
