package com.mystudybudy.mystudybudy.repo;

import com.mystudybudy.mystudybudy.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepo extends JpaRepository<Folder,Long> {
}
