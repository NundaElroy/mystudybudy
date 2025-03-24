package com.mystudybudy.mystudybudy.service;

import com.mystudybudy.mystudybudy.entity.User;

public interface UserService {
    User save(User user);
    User findByEmail(String email);

}
