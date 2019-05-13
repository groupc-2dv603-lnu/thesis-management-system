package project.model.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import project.model.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findFirstByName(String name);
	User findFirstById(String id);
	
    @Query("{address:'?0'}")
    List<User> findCustomByname(String name);
	User findByName(String name);

}
