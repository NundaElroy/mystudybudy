package com.mystudybudy.mystudybudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class DocFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;
    private Double size;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder ;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


    public void addUser(User user ){
        this.user = user;
    }

    public void addFolder(Folder folder){
        this.folder = folder;
    }
}
