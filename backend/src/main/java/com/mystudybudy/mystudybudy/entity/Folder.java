package com.mystudybudy.mystudybudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;


    @JsonIgnore
    @OneToMany(mappedBy = "folder",cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<DocFile> filesInFolder = new ArrayList<>();


    public void addUser(User user ){
        this.user = user;
    }

    public void addFile(DocFile file){
        file.addFolder(this);
        this.filesInFolder.add(file);
    }
}
