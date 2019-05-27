package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.ProjectDescription;

import java.util.List;

public interface ProjectDescriptionRepository extends MongoRepository<ProjectDescription, String> {
	List<ProjectDescription> findAllByuserId(String id);
	ProjectDescription findFirstByuserId(String id);
}
