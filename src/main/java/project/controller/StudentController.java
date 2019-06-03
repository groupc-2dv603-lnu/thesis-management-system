package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import project.model.entities.*;
import project.model.enums.PendingSupervisor;
import project.model.enums.SubmissionType;
import project.model.repositories.*;
import project.payload.UploadFileResponse;

@RestController
public class StudentController {
	private final UserRepository repository;
	private final SupervisorRepository supervisorRepository;
	private final ProjectPlanRepository projectPlanRepository;
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	private final ProjectDescriptionRepository projectDescriptionRepository;
	private final StudentRepository studentRepository;
	private final SubmissionRepository submissionRepository;
	private final DataFileRepository dataFileRepository;
	private final ReaderRepository readerRepository;
	
	StudentController(UserRepository repository,SupervisorRepository supervisorRepository, ProjectPlanRepository projectPlanRepository, FeedbackRepository feebackRepository,
			InitialReportRepository initialReportRepository, FinalReportRepository finalReportRepository, ProjectDescriptionRepository projectDescriptionRepository,
			StudentRepository studentRepository, SubmissionRepository submissionRepository, DataFileRepository dataFileRepository, ReaderRepository readerRepository) {
		this.repository = repository;
		this.supervisorRepository = supervisorRepository;
		this.projectPlanRepository = projectPlanRepository;
		this.feedbackRepository = feebackRepository;
		this.initialReportRepository = initialReportRepository;
		this.finalReportRepository = finalReportRepository;
		this.projectDescriptionRepository = projectDescriptionRepository;
		this.studentRepository = studentRepository;
		this.submissionRepository = submissionRepository;
		this.dataFileRepository = dataFileRepository;
		this.readerRepository = readerRepository;
	}
	
	@GetMapping(value = "/student/getAvailableSupervisors", produces = "application/json; charset=UTF-8")
	Resources<Resource<Supervisor>> all() {
		List<Resource<Supervisor>> supervisors = supervisorRepository.findByAvailableForSupervisorTrue().stream()
			    .map(supervisor -> new Resource<>(supervisor,
			    		linkTo(methodOn(StudentController.class).all()).withRel("getAvailableSupervisors")))
			    	    .collect(Collectors.toList());
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		
		for(int i=0; i < supervisors.size(); i++) {
			if(supervisors.get(i).getContent().getUserId().equals(user.getId())) {
				supervisors.remove(i);
			}
		}
		return new Resources<>(supervisors,
				linkTo(methodOn(StudentController.class).all()).withSelfRel());
	}
	@PutMapping("/student/requestSupervisor")
	Supervisor updateSupervisor(@RequestParam String supervisorUserId) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		
		User user = repository.findFirstByEmailAdress(name);
		Student student = studentRepository.findFirstByuserId(user.getId());
		Supervisor supervisor = supervisorRepository.findFirstByuserId(supervisorUserId);
		
		if(PendingSupervisor.AWAITING.equals(student.getPendingSupervisor()) || PendingSupervisor.ACCEPTED.equals(student.getPendingSupervisor()) || user.getId().equals(supervisorUserId)) {
			return supervisor;
		} else {
			supervisor.getAwaitingResponse().add(user.getId());
			student.setPendingSupervisor(PendingSupervisor.AWAITING);
			student.setAssignedSupervisorId(supervisor.getUserId());

			
			studentRepository.save(student);
			return supervisorRepository.save(supervisor);
		}

	}
	
	@GetMapping(value = "/student/projectPlan", produces = "application/json; charset=UTF-8")
	Resource<ProjectPlan> one1() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		ProjectPlan projectplan = projectPlanRepository.findFirstByuserId(user.getId());
		return new Resource<>(projectplan,
				linkTo(methodOn(StudentController.class).one1()).withSelfRel());
	}
	@GetMapping(value = "/student/initialReport", produces = "application/json; charset=UTF-8")
	Resource<InitialReport> one3() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		InitialReport initialReport = initialReportRepository.findFirstByuserId(user.getId());
		return new Resource<>(initialReport,
				linkTo(methodOn(StudentController.class).one3()).withSelfRel());
	}
	
	@GetMapping(value = "/student/finalReport", produces = "application/json; charset=UTF-8")
	Resource<FinalReport> one4() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		FinalReport finalReport = finalReportRepository.findFirstByuserId(user.getId());
		return new Resource<>(finalReport,
				linkTo(methodOn(StudentController.class).one4()).withSelfRel());
	}
	@GetMapping(value = "/student/projectDescription", produces = "application/json; charset=UTF-8")
	Resource<ProjectDescription> one5() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		ProjectDescription projectDescription = projectDescriptionRepository.findFirstByuserId(user.getId());
		return new Resource<>(projectDescription,
				linkTo(methodOn(StudentController.class).one5()).withSelfRel());
	}
	@GetMapping(value = "/student/feedback/{id}", produces = "application/json; charset=UTF-8")
	Resource<Feedback> one2(@PathVariable String id) {
		Feedback feedback = feedbackRepository.findFirstById(id);
		
		return new Resource<>(feedback,
				linkTo(methodOn(StudentController.class).one2(id)).withSelfRel(),
				linkTo(methodOn(StudentController.class).all2(id)).withRel("feedback"));
	}
	@GetMapping(value = "/student/feedback", produces = "application/json; charset=UTF-8")
	Resources<Resource<Feedback>> all2(@RequestParam String documentId) {
		List<Resource<Feedback>> feedbacks = feedbackRepository.findBydocumentId(documentId).stream()
			    .map(feedback -> new Resource<>(feedback,
			    		linkTo(methodOn(StudentController.class).all2(documentId)).withRel("feedback")))
			    	    .collect(Collectors.toList());				
		return new Resources<>(feedbacks,
				linkTo(methodOn(StudentController.class).all2(documentId)).withSelfRel());
	}
	@GetMapping(value = "/student/studentInfo", produces = "application/json; charset=UTF-8")
	Resource<Student> one6() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Student student = studentRepository.findFirstByuserId(user.getId());
		return new Resource<>(student,
				linkTo(methodOn(StudentController.class).one6()).withSelfRel());
	}

	// Returns all of a students' submissions //
	@GetMapping(value = "/student/mySubmissions", produces = "application/json; charset=UTF-8")
	Resources<Resource<Submission>> getAllMySubmissions() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = repository.findFirstByEmailAdress(auth.getName());

		List<Resource<Submission>> submissions = submissionRepository.findAllByUserId(user.getId()).stream()
				.map(submission -> new Resource<>(submission,
						linkTo(methodOn(StudentController.class).getSubmission(submission.getId())).withSelfRel(),
						linkTo(methodOn(StudentController.class).getAllMySubmissions()).withRel("submissions")))
				.collect(Collectors.toList());

		return new Resources<>(submissions,
				linkTo(methodOn(StudentController.class).getAllMySubmissions()).withSelfRel());
	}

	/* Get specific submission based on id */
	@GetMapping(value = "/student/mySubmissions/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	Resource<Submission> getSubmission(@PathVariable String id) {
		Submission submission = submissionRepository.findFirstById(id);

		return new Resource<>(submission,
				linkTo(methodOn(StudentController.class).getSubmission(id)).withSelfRel(),
				linkTo(methodOn(StudentController.class).getAllMySubmissions()).withRel("submissions"));

	}
	/* Upload submission and corresponding datafile */
	@PostMapping("/student/newSubmission")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("subType") SubmissionType type) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = repository.findFirstByEmailAdress(auth.getName());

		if (submissionAlreadyExist(user.getId(), type)){
			System.out.println("Sub exists");
			deleteSubmission(getAlreadyUploadedSubmission(user.getId(), type).getId());
		}

		 /* Upload new datafile */
		DataFile df;
		try {
			df = new DataFile(file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();	//TODO: Make 2 different responses depending on outcome (success/fail)
			return new UploadFileResponse(null, null, "Error: Unable to create DataFile", null, 0);
		}
		dataFileRepository.save(df);
		
		/* Upload new submission */
		Submission newSubmission = new Submission();
		newSubmission.setSubmissionType(type);
		newSubmission.setFilename(StringUtils.cleanPath(file.getOriginalFilename()));
        newSubmission.setUserId(user.getId());
        newSubmission.setAuthor(user.getName());
        if(newSubmission.getSubmissionType().equals(SubmissionType.FINAL_REPORT)) {
        	InitialReport report = initialReportRepository.findFirstByuserId(user.getId());
    		Reader reader = readerRepository.findFirstByinitialReportId(report.getId());
    		FinalReport finalReport = finalReportRepository.findFirstByuserId(user.getId());
    		reader.setFinalReportId(finalReport.getId());
        	readerRepository.save(reader);
        }
        submissionRepository.save(newSubmission);
		newSubmission.setFileUrl("/submissions/datafiles/" + newSubmission.getId() +"+" + df.getId());
		submissionRepository.save(newSubmission);		//Saved twice since setFileUrl requires submission id which is created at first save

        updateSubmissionIds(type, newSubmission.getId(), user.getId());


        //TODO: remove system.out
		System.out.println("Successfully uploaded submission and datafile." +
				"\nSubmission ID: " + newSubmission.getId() +
				"\nDatafile ID: " + df.getId() +
				"\nFilename: " + newSubmission.getFilename() +
				"\nAuthor: " + newSubmission.getAuthor());
		return new UploadFileResponse(newSubmission.getId(), newSubmission.getFilename(), newSubmission.getFileUrl(),
				file.getContentType(), file.getSize());
	}



	 /* PRIVATE HELP METHODS */
	private boolean submissionAlreadyExist(String userId, SubmissionType type){
		List<Submission> submissions = submissionRepository.findAllByUserId(userId);

		for (Submission sub : submissions){
			if (sub.getSubmissionType() == type){
				return true;
			}
		}
		return false;
	}

	private Submission getAlreadyUploadedSubmission(String userId, SubmissionType type){
		List<Submission> submissions = submissionRepository.findAllByUserId(userId);

		for (Submission sub : submissions){
			if (sub.getSubmissionType() == type){
				return sub;
			}
		}
		return null;
	}

	private void updateSubmissionIds(SubmissionType type, String submissionId, String userId){
	    switch(type){
            case PRJ_DESCRIPTION:
                ProjectDescription description = projectDescriptionRepository.findFirstByuserId(userId);
                description.setSubmissionId(submissionId);
                projectDescriptionRepository.save(description);
                break;
            case PRJ_PLAN:
                ProjectPlan plan = projectPlanRepository.findFirstByuserId(userId);
                plan.setSubmissionId(submissionId);
                projectPlanRepository.save(plan);
                break;
            case INITIAL_REPORT:
                InitialReport initialReport = initialReportRepository.findFirstByuserId(userId);
                initialReport.setSubmissionId(submissionId);
                initialReportRepository.save(initialReport);
                break;
            case FINAL_REPORT:
                FinalReport finalReport = finalReportRepository.findFirstByuserId(userId);
                finalReport.setSubmissionId(submissionId);
                finalReportRepository.save(finalReport);
                break;

        }
    }

    private String getDataFileIdFromSubmissionFileUrl(Submission submission){
		String[] parts = submission.getFileUrl().split("\\+");	//get id out of string "/submissions/datafiles/{subId}+{dataFileId}"
		String fileId = parts[1];
		return fileId;
	}






	/* TEMPORARY DELETE METHODS*/

	@DeleteMapping("/student/mySubmissions/delete/{id}")
	String deleteSubmission(@PathVariable String id) {
		Submission submission = submissionRepository.findFirstById(id);
		String fileId = getDataFileIdFromSubmissionFileUrl(submission);
		updateSubmissionIds(submission.getSubmissionType(), "", submission.getUserId());

		dataFileRepository.delete(dataFileRepository.findFirstById(fileId));
		submissionRepository.delete(submissionRepository.findFirstById(id));

		return "\nSubmission deleted: " + submission.getId()
				+ "\nDatafile deleted: " + fileId + "\n";
	}


	//TODO: ska vara deletemapping men använder get under utveckling
	@GetMapping("student/mySubmissions/deleteAll")
	void deleteMySubmissions() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = repository.findFirstByEmailAdress(auth.getName());

		List<Submission> submissions = submissionRepository.findAllByUserId(user.getId());
		for (Submission sub : submissions){
			updateSubmissionIds(sub.getSubmissionType(), "", user.getId());
			dataFileRepository.deleteById(getDataFileIdFromSubmissionFileUrl(sub));
			submissionRepository.deleteById(sub.getId());
		}
	}


}
