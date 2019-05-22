package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Opponent;



public interface OpponentRepository extends MongoRepository<Opponent, String> {
	Opponent findFirstByuserId(String id);
	Opponent findFirstById(String id);
}
