package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Reader;

public interface ReaderRepository extends MongoRepository<Reader, String> {

	Reader findFirstByuserId(String id);

}
