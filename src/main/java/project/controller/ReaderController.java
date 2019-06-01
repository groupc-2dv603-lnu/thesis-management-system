package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Feedback;
import project.model.entities.FinalReport;
import project.model.entities.InitialReport;
import project.model.entities.Reader;
import project.model.entities.User;
import project.model.enums.Role;
import project.model.repositories.FeedbackRepository;
import project.model.repositories.FinalReportRepository;
import project.model.repositories.InitialReportRepository;
import project.model.repositories.ReaderRepository;
import project.model.repositories.UserRepository;

@RestController
public class ReaderController {
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	private final UserRepository repository;
	private final ReaderRepository readerRepository;
	
	ReaderController(UserRepository repository, FeedbackRepository feedbackRepository, InitialReportRepository initialReportRepository,FinalReportRepository finalReportRepository,
			ReaderRepository readerRepository) {
		this.repository = repository;
		this.feedbackRepository = feedbackRepository;
		this.initialReportRepository = initialReportRepository;
		this.finalReportRepository = finalReportRepository;
		this.readerRepository = readerRepository;
	}
	
	@PostMapping("/reader/feedbackInitialReport")
	Feedback newFeedback(@RequestParam String text) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Reader reader = readerRepository.findFirstByuserId(user.getId());
		
		Date date = new Date();
		Feedback feedback = new Feedback(user.getId(), reader.getInitialReportId(), text, Role.READER, date);
		InitialReport report = initialReportRepository.findFirstById(feedback.getDocumentId());
		
		Boolean doesFeedBackExist = false;
		for(int i=0; i < report.getFeedBackIds().size(); i++) {
			Feedback oldFeedback = feedbackRepository.findFirstById(report.getFeedBackIds().get(i));
			if(oldFeedback.getRole().equals(Role.READER)) {
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
	@PostMapping("/reader/feedbackFinalReport")
	Feedback newFeedback2(@RequestParam String text) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Reader reader = readerRepository.findFirstByuserId(user.getId());
		Date date = new Date();
		Feedback feedback = new Feedback(user.getId(), reader.getFinalReportId(), text, Role.READER, date);
		
		FinalReport report = finalReportRepository.findFirstById(feedback.getDocumentId());

		Boolean doesFeedBackExist = false;
		for(int i=0; i < report.getFeedBackIds().size(); i++) {
			Feedback oldFeedback = feedbackRepository.findFirstById(report.getFeedBackIds().get(i));
			if(oldFeedback.getRole().equals(Role.READER)) {
				doesFeedBackExist = true;
			}
		}
		if(doesFeedBackExist.equals(false)) {
			feedbackRepository.save(feedback);
			report.getFeedBackIds().add(feedback.getId());
			finalReportRepository.save(report);
		}
		return feedback;
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
	
	@GetMapping(value = "/reader/initialReport/{id}", produces = "application/json; charset=UTF-8")
	Resource<InitialReport> one(@PathVariable String id) {
		InitialReport initialReport = initialReportRepository.findFirstById(id);
		return new Resource<>(initialReport,
				linkTo(methodOn(ReaderController.class).one(id)).withSelfRel(),
				linkTo(methodOn(ReaderController.class).all()).withRel("initialReport"));
	}
	
	@GetMapping(value = "/reader/initialReport", produces = "application/json; charset=UTF-8")
	Resources<Resource<InitialReport>> all() {
		List<Resource<InitialReport>> initialReports = initialReportRepository.findAll().stream()
			    .map(initialReport -> new Resource<>(initialReport,
			    		linkTo(methodOn(ReaderController.class).one(initialReport.getId())).withSelfRel(),
			    		linkTo(methodOn(ReaderController.class).all()).withRel("initialReports")))
			    	    .collect(Collectors.toList());

		return new Resources<>(initialReports,
				linkTo(methodOn(ReaderController.class).all()).withSelfRel());
	}

}
