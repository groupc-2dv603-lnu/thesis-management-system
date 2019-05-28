package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.entities.DataFile;

public interface DataFileRepository extends MongoRepository<DataFile, String> {
    DataFile findFirstById(String id);
}


