package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findFirstByName(String name);
	User findFirstById(String id);
}
