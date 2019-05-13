package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Student;

public interface supervisorRepository extends MongoRepository<Student, String>  {

}
