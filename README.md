## To-Do:
	1) logic for moving home
	2) undo moves (push positions object onto positions history array and revert to past object (have to credit back roll as well, don't let it revert too far))
	3) DEPLOY & PRESENTATION
	4) Account for situation where one move is possible but won't make it possible for you to use other move and there is another situation where you are able to use both moves.
	5) integrate usernames
	-separate restart game/page load or removing new game dispatch from initialization page for user integration so refresh keeps game status
	-two people connected to same game at same time; server notifies you to update your board states.
		*anything global is visible to all users
		*cur_pos global would need to become per user/per game storage
	6) doubling cube

/*----------------------------- PRESENTATION GUIDELINES ---------------------------------*/
	Prepare a presentation to teach the rest of the class what you learned in 10 minutes. Underneath those specific deliverables, you'll be aiming to learn something efficiently, and observe yourself doing so, building your understanding of the learning process. 
		How much time should you spend on tutorials when something is new? 
		Is it worth the time to complete a video course? 
		How should you use the documentation (and does that vary if the docs are well written vs. poorly written)? 
		Is blogging or some form of note-taking valuable? 
		How about teaching the concept? 
	By the end of the week, you should have answers to each of these questions.

	First, find 1-3 tutorials or courses you'd like to start with. We have a bias towards text-first tutorials that include actually writing code to follow along
		With each tutorial, you're going to go beyond just following the directions step-by-step. Instead, use the practices we've enforced so far in the course – follow along, and then at each break in the tutorial after a concept was demonstrated, pick a feature that extends what you just did and implement it. After you've done so, stop and explain what you just implemented.

	While you're building, keep a running log of what you're experiencing. What challenge are you working on? How are you approaching it? Is it working?

	Now that you're two days in, compare this to two recent experiences: 
		first, compare it to your initial experience learning coding.
		Second, compare it to learning Node + React in the first half of the course. While that probably felt faster than when you first started, this should be yet faster.

		Across languages and frameworks, the fundamental concepts remain mostly consistent, but you're now building on a broader knowledge set, so you can focus on learning fewer, specific things when you use a new technology. 

		compare how this learning experience is similar to and different from your earlier attempts.

	Begin preparing your presentation today. Let's be clear upfront about the purpose of presentations: watching a 10 minute presentation on a large topic is not going to help the class master a topic. As a watcher, you'll gain a small amount of familiarity with a set of tools that will let you speak to them with some familiarity if they come up as you meet developers. But giving a 10-minute presentation is an excellent way to learn something.
	1) Pick a concept and learn it however you choose. 
	2) Teach it to a student, or do something similar such as building a presentation to prepare your lesson, and do this without your notes and supporting materials. 
	3) Identify the spots you can't teach and review what you're missing. Then go back to step 2 and prepare your lesson on that topic.

MAKE SURE you cover the following topics in your presentation:
	Why did you choose the technology you did? 
	How did you decide to learn it and why? Which parts of the learning experience were most productive? 
	What did you ultimately build (make sure to actually demo it at this point)? When talking about the challenges in building your project, make sure to call out at least one thing you tried that didn't end up working.

/* GETTING PYTHON SETUP */
# INSTALL FLASK MODULE
	# python3 -m pip install flask
# RUN SERVER
	# `python3 server.py`
# VISIT FRONTEND ENDPOINT
	http://localhost:5000/static/index.html
