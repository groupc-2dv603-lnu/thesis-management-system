package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.*;
import project.model.enums.Role;
import project.model.repositories.*;

import javax.validation.Valid;

@RestController
public class ReaderController {
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	private final UserRepository repository;
	private final ReaderRepository readerRepository;
	private final SubmissionRepository submissionRepository;
	@Autowired
	private final ObjectMapper mapper;
	
	ReaderController(UserRepository repository, FeedbackRepository feedbackRepository, InitialReportRepository initialReportRepository,FinalReportRepository finalReportRepository,
			ReaderRepository readerRepository, SubmissionRepository submissionRepository, ObjectMapper mapper) {
		this.repository = repository;
		this.feedbackRepository = feedbackRepository;
		this.initialReportRepository = initialReportRepository;
		this.finalReportRepository = finalReportRepository;
		this.readerRepository = readerRepository;
		this.submissionRepository = submissionRepository;
		this.mapper = mapper;
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
	InitialReport requestBidding(@RequestParam String initialReportId) {
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
	
	@GetMapping(value = "/reader/readerInfo", produces = "application/json; charset=UTF-8")
	Resource<Reader> one6() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Reader reader = readerRepository.findFirstByuserId(user.getId());
		return new Resource<>(reader,
				linkTo(methodOn(ReaderController.class).one6()).withSelfRel());
	}
	
	@GetMapping(value = "/reader/initailReportSubmission", produces = "application/json; charset=UTF-8")
	Resource<Submission> getintialReportSubmission() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Reader reader = readerRepository.findFirstByuserId(user.getId());
		
		InitialReport initialReport = initialReportRepository.findFirstById(reader.getInitialReportId());
		Submission submission = submissionRepository.findFirstById(initialReport.getSubmissionId());
		return new Resource<>(submission,
				linkTo(methodOn(ReaderController.class).one6()).withSelfRel());
	}
	
	@GetMapping(value = "/reader/finalReportSubmission", produces = "application/json; charset=UTF-8")
	Resource<Submission> getfinalReportSubmission() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Reader reader = readerRepository.findFirstByuserId(user.getId());
		
		FinalReport finalReport = finalReportRepository.findFirstById(reader.getInitialReportId());
		Submission submission = submissionRepository.findFirstById(finalReport.getSubmissionId());
		return new Resource<>(submission,
				linkTo(methodOn(ReaderController.class).one6()).withSelfRel());
	}


	@GetMapping(value = "/reader/initialReports", produces = "application/json; charset=UTF-8")
	Resources<Resource<ObjectNode>> getAllInitialReports(){
		List<InitialReport> fetchedReports = initialReportRepository.findAll();
        ArrayList<Resource<ObjectNode>> initialReports = new ArrayList<>();

		for (InitialReport report : fetchedReports){
			Submission submission = submissionRepository.findFirstById(report.getSubmissionId());

			if (submission != null){
				ObjectNode obj = mapper.createObjectNode();
				obj.put("id", report.getId());
				obj.put("filename", submission.getFilename());
				obj.put("author", submission.getAuthor());
				obj.put("fileUrl", submission.getFileUrl());

				initialReports.add(new Resource<>(obj));
			}
        }
		return new Resources<>(initialReports);
	}
	

	/* TA INTE BORT KOMMENTERADE METODER NEDANFÖR, ANVÄNDS VID TESTNING OCH FELSÖKNING */

//	@GetMapping(value = "/reader/initialReport/{id}", produces = "application/json; charset=UTF-8")
//	Resource<InitialReport> one(@PathVariable String id) {
//		InitialReport initialReport = initialReportRepository.findFirstById(id);
//		return new Resource<>(initialReport,
//				linkTo(methodOn(ReaderController.class).one(id)).withSelfRel(),
//				linkTo(methodOn(ReaderController.class).all()).withRel("initialReport"));
//	}
//
//	@GetMapping(value = "/reader/initialReports/all", produces = "application/json; charset=UTF-8")
//	Resources<Resource<InitialReport>> all() {
//		List<Resource<InitialReport>> initialReports = initialReportRepository.findAll().stream()
//			    .map(initialReport -> new Resource<>(initialReport,
//			    		linkTo(methodOn(ReaderController.class).one(initialReport.getId())).withSelfRel(),
//			    		linkTo(methodOn(ReaderController.class).all()).withRel("initialReports")))
//			    	    .collect(Collectors.toList());
//
//		return new Resources<>(initialReports,
//				linkTo(methodOn(ReaderController.class).all()).withSelfRel());
//	}

}