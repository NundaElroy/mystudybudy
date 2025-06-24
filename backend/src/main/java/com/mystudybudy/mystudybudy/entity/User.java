package com.mystudybudy.mystudybudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
    private String name;
    private String picture;

    @JsonIgnore
    @CreationTimestamp
    private LocalDateTime createdAt;

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<DocFile> listOfDocFiles = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<Folder> listOfFolders = new ArrayList<>();

    public User(String email, String name, String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }

    public User() {
    }

    public void addFolder(Folder folder){
        folder.addUser(this);
        this.listOfFolders.add(folder);
    }





}

