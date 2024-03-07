package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class CoursesController {
	@RequestMapping("courses")
	//@ResponseBody
	/*public String courses(@RequestParam("cname")String cname,HttpSession session) {
		//HttpSession session=req.getSession();
		//String cname=req.getParameter("cname");
		session.setAttribute("cname",cname);
		return "course";
	}*/
	
	public ModelAndView courses(@RequestParam("cname")String courcename) {
		ModelAndView mv=new ModelAndView();
		mv.addObject("cname",courcename);
		mv.setViewName("course");
		return mv;
	}

}
