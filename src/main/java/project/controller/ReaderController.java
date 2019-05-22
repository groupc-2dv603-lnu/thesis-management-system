package project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Feedback;
import project.model.repositories.FeedbackRepository;

@RestController
public class ReaderController {
	private final FeedbackRepository feedbackRepository;
	
	ReaderController(FeedbackRepository feedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}
	
	@PostMapping("/reader/feedback")
	Feedback newFeedback(@RequestBody Feedback feedback) {
		return feedbackRepository.save(feedback);
	}
}
