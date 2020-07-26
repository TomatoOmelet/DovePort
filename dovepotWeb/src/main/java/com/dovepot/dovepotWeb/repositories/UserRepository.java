package com.dovepot.dovepotWeb.repositories;

import java.util.List;

import com.dovepot.dovepotWeb.models.User;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    @Override
    void delete(User deleted);

    User findByUsername(String username);

    @Query("{username : {$regex : ?0}}")
    List<User> getByUsernameRegexQuery(String keyword);
}