package project.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Feedback;
import project.model.entities.InitialReport;
import project.model.entities.User;
import project.model.repositories.FeedbackRepository;
import project.model.repositories.InitialReportRepository;
import project.model.repositories.UserRepository;

@RestController
public class ReaderController {
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final UserRepository repository;
	
	ReaderController(UserRepository repository, FeedbackRepository feedbackRepository, InitialReportRepository initialReportRepository) {
		this.repository = repository;
		this.feedbackRepository = feedbackRepository;
		this.initialReportRepository = initialReportRepository;
	}
	
	@PostMapping("/reader/feedback")
	Feedback newFeedback(@RequestBody Feedback feedback) {
		return feedbackRepository.save(feedback);
	}
	
	@PutMapping("/reader/requestBidding")
	InitialReport replaceEmployee(@RequestParam String initialReportId) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		
		InitialReport report = initialReportRepository.findFirstById(initialReportId);
		for(int i=0; i < report.getBids().size(); i++) {
			if(report.getBids().get(i).equals(user.getId())) {
				return report;
			}
		}
		report.getBids().add(user.getId());
		return initialReportRepository.save(report);
	}

}
