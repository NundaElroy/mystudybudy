package com.mystudybudy.mystudybudy.servicesimp;

import com.mystudybudy.mystudybudy.entity.DocFile;
import com.mystudybudy.mystudybudy.exceptions.DocFileException;
import com.mystudybudy.mystudybudy.repo.DocFileRepo;
import com.mystudybudy.mystudybudy.service.DocFileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocFileServiceImpl implements DocFileService {

    private final DocFileRepo docFileRepo;

    public DocFileServiceImpl(DocFileRepo docFileRepo) {
        this.docFileRepo = docFileRepo;
    }

    @Override
    public DocFile saveFile(DocFile docFile) throws DocFileException {
        return  docFileRepo.save(docFile);
    }

    @Override
    public void deleteDocFile(Long fileID) throws DocFileException {
        DocFile docFile = this.getDocFileByID(fileID);
        docFileRepo.delete(docFile);
    }

    @Override
    public List<DocFile> getFilesByUserID(Long userID) throws DocFileException {
        return List.of();
    }

    @Override
    public DocFile getDocFileByID(Long fileID) throws DocFileException {
        return docFileRepo.findById(fileID).orElseThrow(() ->
                new DocFileException("file not found"));
    }
}
