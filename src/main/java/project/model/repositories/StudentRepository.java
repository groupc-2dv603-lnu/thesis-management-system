package project.model.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import project.model.entities.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
	
}

