package project.model.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
	Student findFirstByuserId(String id);
	Student deleteFirstByuserId(String id);
}

