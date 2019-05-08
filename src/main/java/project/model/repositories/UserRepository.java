package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Users;

public interface UserRepository extends MongoRepository<Users, String> {
	
	Users findFirstByName(String name);
	Users findFirstById(String id);
}
