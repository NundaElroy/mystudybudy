package com.mystudybudy.mystudybudy.servicesimp;

import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.repo.UserRepository;
import com.mystudybudy.mystudybudy.service.UserService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return  userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow
                  (() ->  new BadCredentialsException("User not found"));
    }
}
