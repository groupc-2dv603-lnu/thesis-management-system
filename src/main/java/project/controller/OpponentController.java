package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;


import org.springframework.hateoas.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Feedback;
import project.model.entities.InitialReport;
import project.model.entities.Opponent;
import project.model.entities.User;
import project.model.repositories.FeedbackRepository;
import project.model.repositories.InitialReportRepository;
import project.model.repositories.OpponentRepository;
import project.model.repositories.UserRepository;

@RestController
public class OpponentController {
	private final UserRepository repository;
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final OpponentRepository opponentRepository;
	
	
	OpponentController(UserRepository repository, FeedbackRepository feedbackRepository, InitialReportRepository initialReportRepository, OpponentRepository opponentRepository) {
		this.feedbackRepository = feedbackRepository;
		this.initialReportRepository = initialReportRepository;
		this.repository = repository;
		this.opponentRepository = opponentRepository;
	}
	
	@PostMapping("/opponent/feedback")
	Feedback newFeedback(@RequestParam String text) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Opponent opponent = opponentRepository.findFirstByuserId(user.getId());
		
		Feedback feedback = new Feedback(user.getId(),opponent.getInitialReportId(), text);
		InitialReport report = initialReportRepository.findFirstById(feedback.getDocumentId());
		Boolean doesFeedBackExist = false;
		for(int i=0; i < report.getFeedBackIds().size(); i++) {
			Feedback oldFeedback = feedbackRepository.findFirstById(report.getFeedBackIds().get(i));
			if(oldFeedback != null) {
				doesFeedBackExist = true;
			}
		}
		if(doesFeedBackExist.equals(false)) {
			feedbackRepository.save(feedback);
			report.getFeedBackIds().add(feedback.getId());
			initialReportRepository.save(report);
		}
		return feedback;
	}
	
//	@GetMapping(value = "/initialReportOpponent", produces = "application/json; charset=UTF-8")
//	Resource<InitialReport> one3() {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		String name = auth.getName();
//		User user = repository.findFirstByEmailAdress(name);
//		Opponent opponent = opponentRepository.findFirstByuserId(user.getId());
//		InitialReport initialReport = initialReportRepository.findFirstById(opponent.getInitialReportId());
//		return new Resource<>(initialReport,
//				linkTo(methodOn(StudentController.class).one3()).withSelfRel());
//	}
}
