package com.dovepot.dovepotWeb.repositories;
import com.dovepot.dovepotWeb.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    @Override
    void delete(User deleted);

    User findByUsername(String username);
}