import React, { useEffect, useContext, useState, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AppSettings } from './../../config/app-settings.js';
import { Card } from './../../components/card/card.jsx';
import { Icon } from '@iconify/react';
import Highlight from 'react-highlight';

function AiChat() {
	const context = useContext(AppSettings);
	const [activeTab, setActiveTab] = useState("aiChatIntro");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesRef = useRef(null);

  const toggleAiTab = (e, tabActive, input) => {
    setActiveTab(tabActive);
    
    if (e && e.currentTarget && tabActive === 'aiChatPrev') {
    	const targetDiv = e.currentTarget.closest('div');
    	if (targetDiv) {
    		setTimeout(() => {
					targetDiv.classList.toggle('bg-light');
					
					let prevTabs = document.querySelectorAll('[data-toggle-ai-tab="aiChatPrev"]');
					prevTabs.forEach(el => {
						const parentDiv = el.closest('div');
						if (parentDiv && parentDiv !== targetDiv) {
							parentDiv.classList.remove('bg-light');
						}
					});
				}, 10);
    	}
    }

    if (input) {
      aiSendMessage(input);
    }

    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
    	toggleAiTab(null, 'aiChatNew', inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const aiResponses = [
    "That's an interesting question! Let me think...",
    "Good point! What else do you think about this?",
    "That makes sense. Can you clarify a bit more?",
    "Great perspective! Here’s my take on it...",
    "Good question! I believe the answer is...",
    "I appreciate your input! Let’s explore this further.",
    "That's a unique thought! Here’s another angle to consider...",
    "Nice one! Have you considered looking at it from this perspective?",
  ];

  const aiSendMessage = (input) => {
    if (!input) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: input },
      { type: "typing" }
    ]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.filter((msg) => msg.type !== "typing").concat({
          type: "ai",
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        })
      );
    }, 2000);
  };
	
	useEffect(() => {
		context.setAppContentFullHeight(true);
		context.setAppContentClass('p-3');
		
		return function cleanUp() {
			context.setAppContentFullHeight(false);
			context.setAppContentClass('');
		}
		
		// eslint-disable-next-line
	}, []);

	return (
		<Card className="h-100" style={{ zIndex: '1020' }}>
			<div className="d-flex h-100">
				<a className="d-lg-none btn btn-lg bg-inverse bg-opacity-15 bg-blur-2 text-body rounded-0 z-3 ms-1px mt-5 shadow-lg position-absolute top-0 start-0 " data-bs-toggle="offcanvas" href="#aiChatSidebar" role="button" aria-controls="offcanvasExample">
					<i className="fa fa-gear"></i>
				</a>
				<div className="w-300px offcanvas offcanvas-start bg-none position-lg-relative transform-lg-none visibility-lg-initial z-lg-3" id="aiChatSidebar">
					<div className="d-lg-none bg-blur-3 d-block position-absolute top-0 end-0 w-100 h-100"></div>
					
					<div className="position-relative h-100 d-flex flex-column">
						<div className="p-3">
							<button type="button" className="btn btn-outline-theme w-100 rounded-3 py-2 d-flex align-items-center justify-content-center" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatIntro');}}>
								New Chat
							</button>
						</div>
						
						<hr className="m-0 opacity-20" />
						
						<div className="flex-1 overflow-hidden text-body">
							<PerfectScrollbar className="p-3 h-100">
								<div className="fw-500 mb-1 d-flex align-items-center">
									<Icon icon="solar:calendar-bold-duotone" className="fs-16px me-8px mt-n1 text-theme"></Icon> 
									Today
								</div>
								<div className="px-2">
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Plan My Dream Vacation</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Craft a Winning Pitch</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Organize My Day</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Write Custom Code</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Draft a Polished Email</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Brainstorm Ideas</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
								</div>
									
								<div className="fw-500 mb-1 d-flex align-items-center mt-3">
									<Icon icon="solar:calendar-bold-duotone" className="fs-16px me-8px mt-n1 text-theme"></Icon>
									1 Week Ago
								</div>
								<div className="px-2">
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Summarize an Article</div><a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Prepare for a Speech</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Create a Business Proposal</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
								</div>
								
								<div className="fw-500 mb-1 d-flex align-items-center mt-3">
									<Icon icon="solar:calendar-bold-duotone" className="fs-16px me-8px mt-n1 text-theme"></Icon> 
									2 Weeks Ago
								</div>
								<div className="px-2">
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Organize Project Tasks</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Research Market Trends</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
									<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
										<div className="flex-1 text-body text-opacity-75">Craft Social Media Posts</div>
										<a href="#/" className="stretched-link text-decoration-none" data-toggle-ai-tab="aiChatPrev" onClick={(e) => { e.preventDefault(); toggleAiTab(e, 'aiChatPrev');}}>&nbsp;</a>
										<div className="dropdown position-relative z-3">
											<a href="#/" data-bs-toggle="dropdown" className="link-secondary opacity-50 d-none hover-show-elm"><i className="fa fa-ellipsis"></i></a>
											<div className="dropdown-menu">
												<a href="#/" className="dropdown-item">Share Chat</a>
												<a href="#/" className="dropdown-item">See Details</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Rename</a>
												<a href="#/" className="dropdown-item">Archive</a>
												<a href="#/" className="dropdown-item">Delete</a>
											</div>
										</div>
									</div>
								</div>
							</PerfectScrollbar>
						</div>
						
						<hr className="m-0 opacity-20" />
						
						<div className="fs-6 p-2">
							<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
								<i className="far fa-folder fa-lg fa-fw me-2 ms-n2"></i>
								Explore Bots
							</div>
							<div className="position-relative hover-bg-light bg-opacity-25 hover-show rounded-2 py-6px px-3 border-0 d-flex align-items-center">
								<i className="far fa-gem fa-lg fa-fw me-2 ms-n2"></i>
								Go Pro
							</div>
						</div>
						
						<hr className="m-0 opacity-20" />
						
						<div className="rounded-4 px-3 py-3 border-0">
							<div className="fw-500 flex-1 fs-13px text-body d-flex align-items-center">
								<div className="w-30px h-30px fs-20px me-2 rounded-circle text-white bg-inverse bg-opacity-50 d-flex align-items-center justify-content-center">
									S
								</div>
								support@seantheme.com
							</div>
						</div>
					</div>
				</div>
				
				<div className="flex-1 d-flex flex-column h-100 mw-100">
					<div className="flex-1 overflow-hidden w-100 h-100">
						<PerfectScrollbar className="h-100 p-2 p-lg-4 tab-content" ref={messagesRef}>
							<div id="aiChatIntro" className={((activeTab === 'aiChatIntro') ? 'show active' : 'd-none') + ' tab-pane fade px-3 px-lg-4 py-2'}>
								<div className="fs-1 lh-sm mb-0">
									<span className="text-body fw-bold">Hello, there</span>
								</div>
								<div className="fs-4 lh-sm text-body text-opacity-75 mb-4">How can I assist you today?</div>
								<div className="row g-4">
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Suggest hidden gems and must-see spots for my next trip.')}}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:calendar-date-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Plan My Adventure</div>
												<div className="">Suggest hidden gems and must-see spots for my next trip.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Create a concise and professional response for any situation.') }}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:chat-square-arrow-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Draft a Quick Reply</div>
												<div className="">Create a concise and professional response for any situation.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Break down complex ideas into simple, easy-to-understand explanations.') }}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:layers-minimalistic-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Simplify This</div>
												<div className="">Break down complex ideas into simple, easy-to-understand explanations.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Write and troubleshoot code with smart fixes for tricky errors.') }}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:code-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Code & Debug</div>
												<div className="">Write and troubleshoot code with smart fixes for tricky errors.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Generate fresh ideas for projects, names, or creative solutions.') }}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:lightbulb-bolt-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Brainstorm Anything</div>
												<div className="">Generate fresh ideas for projects, names, or creative solutions.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
									<div className="col-sm-6 col-xl-4">
										<a href="#/" className="card cursor-pointer h-100 text-decoration-none text-body text-opacity-75" onClick={(e) => { toggleAiTab(e, 'aiChatNew', 'Craft emails, reports, or social posts in a polished, clear tone.') }}>
											<div className="card-body p-4">
												<div className="mb-3 d-flex">
													<Icon icon="solar:pen-2-bold-duotone" className="fs-40px"></Icon>
												</div>
												<div className="fw-500 text-body mb-1">Write It for Me</div>
												<div className="">Craft emails, reports, or social posts in a polished, clear tone.</div>
											</div>
											
											<div className="card-arrow">
												<div className="card-arrow-top-left"></div>
												<div className="card-arrow-top-right"></div>
												<div className="card-arrow-bottom-left"></div>
												<div className="card-arrow-bottom-right"></div>
											</div>
										</a>
									</div>
								</div>
							</div>
						
							<div id="aiChatPrev" className={((activeTab === 'aiChatPrev') ? 'show active' : 'd-none') + ' tab-pane fade px-sm-3 px-lg-4 py-2'}>
								<div className="d-flex justify-content-end align-items-end mb-3">
									<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
										Can you generate some content for social media captions?
									</div>
									<div>
										<div className="w-30px h-30px my-2px ms-2 fs-20px me-2 rounded-circle text-white bg-inverse bg-opacity-50 d-flex align-items-center justify-content-center">
											S
										</div>
									</div>
								</div>
								
								<div className="mb-3">
									<div className="d-flex justify-content-start align-items-end">
										<div>
											<div className="w-30px h-30px my-2px ms-2 fs-16px me-2 rounded-circle bg-theme bg-opacity-15 text-theme d-flex align-items-center justify-content-center">
												<i className="fa fa-shekel-sign"></i>
											</div>
										</div>
										<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
											<div>Absolutely! What’s the topic or product?</div>
										</div>
									</div>
									<div className="d-flex">
										<div className="w-30px h-30px me-2 ms-2"></div>
										<div className="d-flex flex-wrap w-100 p-2 opacity-75">
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-copy"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-up"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-down"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="fa fa-fw fa-microphone"></i></a>
											<a href="#/" className="link-secondary text-decoration"><i className="fa fa-fw fa-arrow-rotate-right"></i></a>
										</div>
									</div>
								</div>
		
								<div className="d-flex justify-content-end align-items-end mb-3">
									<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
										Let’s say… a coffee shop promotion.
									</div>
									<div>
										<div className="w-30px h-30px my-2px ms-2 fs-20px me-2 rounded-circle text-white bg-inverse bg-opacity-50 d-flex align-items-center justify-content-center">
											S
										</div>
									</div>
								</div>
								
								<div className="mb-3">
									<div className="d-flex justify-content-start align-items-end">
										<div>
											<div className="w-30px h-30px my-2px ms-2 fs-16px me-2 rounded-circle bg-theme bg-opacity-15 text-theme d-flex align-items-center justify-content-center">
												<i className="fa fa-shekel-sign"></i>
											</div>
										</div>
										<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
											<div>How about these:</div>
											<ol className="my-2 ps-4">
												<li>Start your day with the perfect brew – 20% off all lattes today!</li>
												<li>Coffee first, everything else later. Grab your cup now!</li>
												<li>A little caffeine, a lot of happiness. Visit us for your daily fix!</li>
											</ol>
											<div>Need more options?</div>
										</div>
									</div>
									<div className="d-flex">
										<div className="w-30px h-30px me-2 ms-2"></div>
										<div className="d-flex flex-wrap w-100 p-2 opacity-75">
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-copy"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-up"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-down"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="fa fa-fw fa-microphone"></i></a>
											<a href="#/" className="link-secondary text-decoration"><i className="fa fa-fw fa-arrow-rotate-right"></i></a>
										</div>
									</div>
								</div>
		
								<div className="d-flex justify-content-end align-items-end mb-3">
									<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
										How can I fetch API data in Vue.js?
									</div>
									<div>
										<div className="w-30px h-30px my-2px ms-2 fs-20px me-2 rounded-circle text-white bg-inverse bg-opacity-50 d-flex align-items-center justify-content-center">
											S
										</div>
									</div>
								</div>
								
								<div className="mb-3">
									<div className="d-flex justify-content-start align-items-end">
										<div>
											<div className="w-30px h-30px my-2px ms-2 fs-16px me-2 rounded-circle bg-theme bg-opacity-15 text-theme d-flex align-items-center justify-content-center">
												<i className="fa fa-shekel-sign"></i>
											</div>
										</div>
										<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
											Here’s a simple example:
											<Card className="my-2">
												<div className="card-header d-flex border-0">
													<span className="flex-1">vue</span>
													<span><a href="#/" className="text-body text-decoration-none"><i className="far fa-copy"></i> Copy</a></span>
												</div>
												<div className="hljs-container bg-body bg-opacity-50 m-1px">
													<Highlight className='html'>&lt;script&gt;<br />
&nbsp;&nbsp;export default {"{"}<br />
&nbsp;&nbsp;&nbsp;&nbsp;async mounted() {"{"}<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const response = await fetch('https://api.example.com/data');<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const data = await response.json();<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(data);<br />
&nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br />
&nbsp;&nbsp;{"}"}<br />
&lt;/script&gt;</Highlight>
												</div>
											</Card>
											Would you like me to explain how this works?
										</div>
									</div>
									<div className="d-flex">
										<div className="w-30px h-30px me-2 ms-2"></div>
										<div className="d-flex flex-wrap w-100 p-2 opacity-75">
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-copy"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-up"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="far fa-fw fa-thumbs-down"></i></a>
											<a href="#/" className="link-secondary text-decoration me-2"><i className="fa fa-fw fa-microphone"></i></a>
											<a href="#/" className="link-secondary text-decoration"><i className="fa fa-fw fa-arrow-rotate-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						
							<div id="aiChatNew" className={((activeTab === 'aiChatNew') ? 'show active' : 'd-none') + ' tab-pane fade px-sm-3 px-lg-4 py-2'}>
								{messages.map((msg, index) => (
									<div key={index} className={((msg.type === 'user') ? ' justify-content-end ' : ' justify-content-start ') + ((msg.type === 'typing') ? 'ai-spinner ' : '') + 'd-flex align-items-end mb-3'}>
										{msg.type === "user" && (
											<>
												<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">{msg.text}</div>
												<div className="w-30px h-30px my-2px ms-2 fs-20px me-2 rounded-circle text-white bg-inverse bg-opacity-50 d-flex align-items-center justify-content-center">
													S
												</div>
											</>
										)}
				
										{msg.type === "ai" && (
											<>
												<div className="w-30px h-30px my-2px ms-2 fs-16px me-2 rounded-circle bg-theme bg-opacity-15 text-theme d-flex align-items-center justify-content-center">
													<i className="fa fa-shekel-sign"></i>
												</div>
												<div className="rounded-4 px-3 py-2 bg-inverse bg-opacity-10 text-body mw-75">
													<div className="typing-animation" style={{ animationDuration: ".5s" }}>{msg.text}</div>
												</div>
											</>
										)}
				
										{msg.type === "typing" && (
											<div className="px-2">
												<div className="spinner-grow spinner-grow-sm"></div>
											</div>
										)}
									</div>
								))}
							</div>
						</PerfectScrollbar>
					</div>
					
					<div>
						<div className="px-lg-4 px-3 pb-3">
							<div className="position-relative mx-lg-4 mx-2 h-100">
								<div className="position-absolute start-0 bottom-0 p-2">
									<button type="button" className="btn btn-lg px-1 py-1 text-body text-opacity-50"><i className="fa fa-fw fa-plus"></i></button>
									<button type="button" className="btn btn-lg px-1 py-1 text-body text-opacity-50"><i className="fa fa-fw fa-globe"></i></button>
									<button type="button" className="btn btn-lg px-1 py-1 text-body text-opacity-50"><i className="fa fa-fw fa-microphone"></i></button>
								</div>
								<input type="text" className="form-control form-control-lg shadow-none rounded-0" style={{ paddingBottom: '60px', paddingTop: '10px' }} value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} id="userInput" placeholder="Message AI Bot" />
								<div className="position-absolute end-0 bottom-0 px-2 pb-2">
									<button id="sendButton" onClick={handleSendMessage} className="btn btn-lg bg-inverse text-inverse bg-opacity-20 rounded-0">
										<i className="fa fa-arrow-right"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default AiChat;