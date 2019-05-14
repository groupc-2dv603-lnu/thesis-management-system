package project.model.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import project.model.entities.Student;
import project.model.entities.Supervisor;
import project.model.entities.User;

public interface SupervisorRepository extends MongoRepository<Supervisor, String>  {
	Supervisor findFirstById(String id);
	
	@Query("{availableForSupervisor:'?0'}")
	List<Supervisor> findByAvailable(String availableForSupervisor);
}
