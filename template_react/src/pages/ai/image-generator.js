import React, { useEffect, useState, useRef } from 'react';
import Masonry from 'masonry-layout';
import { Icon } from '@iconify/react';
import { Card } from './../../components/card/card.jsx';

function AIImageGenerator() {
	const aiContainerRef = useRef(null);
  const aiGeneratingRef = useRef(null);
  const aiGeneratedRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [dropdownRatioValue, setDropdownRatioValue] = useState("Ratio");
  const [dropdownStyleValue, setDropdownStyleValue] = useState("Style");

  const handleGenerateImage = (e) => {
    e.preventDefault();

    if (aiContainerRef.current && aiGeneratingRef.current && aiGeneratedRef.current) {
      aiContainerRef.current.classList.remove("d-none");
      aiGeneratingRef.current.classList.remove("d-none");
      aiGeneratingRef.current.classList.add("show");

      const aiContainerPosition =
        aiContainerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: aiContainerPosition - 100, behavior: "smooth" });

      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setIsGenerated(true);
      }, 3000);
    }
  };

  const handleDropdownSelection = (category, value) => {
  	if (category === 'Ratio') {
    	setDropdownRatioValue(value);
  	} else {
    	setDropdownStyleValue(value);
  	}
  };

  const handlePreviewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.getElementById("previewImage");
        if (img) {
          img.src = e.target.result;
          img.classList.remove("d-none");
        } else {
          img.classList.add("d-none");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  
	useEffect(() => {
		setTimeout(function() {
			new Masonry('[data-masonry]');
		}, 50);
    // eslint-disable-next-line
  }, []);
	
	return (
		<>
			<Card className="mb-4">
				<div className="position-relative p-3 p-md-4">
					<span className="position-absolute top-0 start-0 m-3 px-2 fw-bold fs-12px">
						AI IMAGE GENERATOR
					</span>
					
					<div className="text-center fs-1 fw-500 mt-5 pt-3 text-body">
						Describe your ideas and generate
					</div>
					
					<div className="text-center fs-5 text-body text-opacity-50 mb-4">Transform your words into visual masterpieces: Leverage AI technology to craft breathtaking images.</div>
					
					<div className="position-relative mx-auto h-100 w-100 mb-2" style={{ maxWidth: '520px'}}>
						<form onSubmit={handleGenerateImage} method="POST" data-form-submit="generate-image">
							<input type="text" className="form-control form-control-lg border-1 shadow-none rounded-3 h-60px" id="userInput" placeholder="Write a prompt to generate" />
							<div className="position-absolute end-0 top-0 bottom-0 d-flex p-10px">
								<button id="sendButton" className="d-flex align-items-center btn btn-lg btn-outline-theme rounded-3 h-auto">
									Generate <i className="fa fa-arrow-right ms-2 mt-1px"></i>
								</button>
							</div>
						</form>
					</div>
					
					<div className="position-relative h-100 w-100 mb-5 pb-3 mx-auto d-flex" style={{ maxWidth: '520px'}}>
						<div className="dropdown me-2">
							<label className="btn btn-sm bg-light bg-opacity-25 border-0 d-flex align-items-center rounded-2 py-5px px-9px">
								<input type="file" className="d-none" accept="image/*" onChange={handlePreviewImage} />
								<i id="previewIcon" className="fa fa-fw fa-plus me-4px"></i> Upload Image
								<img id="previewImage" src="" alt="" className="w-20px h-20px me-n1 ms-2 d-none my-n1" />
							</label>
						</div>
						<div className="dropdown me-2 ms-auto">
							<button type="button" data-bs-toggle="dropdown" className="btn btn-sm bg-light bg-opacity-25 border-0 d-flex align-items-center rounded-2 py-5px px-9px"><i className="fa fa-fw fa-globe me-1"></i> <span id="aiRatioText">{dropdownRatioValue}</span> <i className="fa fa-chevron-down fa-fw opacity-50 ms-1"></i></button>
							<div className="dropdown-menu dropdown-menu-end rounded-3">
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "Ratio")}>None</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "1:1 (Square)")}>1:1 (Square)</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "16:9 (Widescreen)")}>16:9 (Widescreen)</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "4:3 (Standard)")}>4:3 (Standard)</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "3:2 (Classic)")}>3:2 (Classic)</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "21:9 (Ultra Wide)")}>21:9 (Ultra Wide)</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Ratio", "9:16 (Portrait)")}>9:16 (Portrait)</a>
							</div>
						</div>
						<div className="dropdown">
							<button type="button" data-bs-toggle="dropdown" className="btn btn-sm bg-light bg-opacity-25 border-0 d-flex align-items-center rounded-2 py-5px px-9px"><i className="fa fa-fw fa-palette me-1"></i> <span id="aiStyleText">{dropdownStyleValue}</span> <i className="fa fa-chevron-down fa-fw opacity-50 ms-1"></i></button>
							<div className="dropdown-menu dropdown-menu-end rounded-3">
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Style")}>None</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Realistic")}>Realistic</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Anime")}>Anime</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Cyberpunk")}>Cyberpunk</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Pixel Art")}>Pixel Art</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Cartoon")}>Cartoon</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Sketch")}>Sketch</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Fantasy")}>Fantasy</a>
								<a className="dropdown-item" href="#/" data-select="ai-dropdown-selection" onClick={() => handleDropdownSelection("Style", "Neon")}>Neon</a>
							</div>
						</div>
					</div>
					
					<hr />
					
					<div className="fs-12px fw-bold mb-3">IMAGE GENERATION TOOLS</div>
					<div className="row g-3 g-lg-4">
						<div className="col-sm-6 col-xl-3">
							<Card className="p-2">
								<div data-bs-theme="dark">
									<img className="card-img object-fit-cover rounded-0" height="160" src="/assets/img/ai/tools-1.jpg" alt="" />
									<div className="card-img-overlay p-2 d-flex align-items-end bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div>
											<Icon icon="solar:volleyball-2-bold-duotone" className="fs-26px text-body"></Icon>
											<div className="fw-bold text-body fs-13px">Text to Image</div>
											<div className="fw-500 fs-11px lh-14 text-body text-opacity-60">Turn your words into stunning visuals with AI-generated artwork.</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-xl-3">
							<Card className="p-2">
								<div data-bs-theme="dark">
									<img className="card-img object-fit-cover rounded-0" height="160" src="/assets/img/ai/tools-2.jpg" alt="" />
									<div className="card-img-overlay p-2 d-flex align-items-end bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div>
											<Icon icon="solar:layers-minimalistic-bold-duotone" className="fs-26px text-body"></Icon>
											<div className="fw-bold text-body fs-13px">Text to PNG</div>
											<div className="fw-500 fs-11px lh-14 text-body text-opacity-60">Create high-quality PNG images from text with transparency support.</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-xl-3">
							<Card className="p-2">
								<div data-bs-theme="dark">
									<img className="card-img object-fit-cover rounded-0" height="160" src="/assets/img/ai/tools-3.jpg" alt="" />
									<div className="card-img-overlay p-2 d-flex align-items-end bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div>
											<Icon icon="solar:gallery-edit-bold-duotone" className="fs-26px text-body"></Icon>
											<div className="fw-bold text-body fs-13px">Image Editor</div>
											<div className="fw-500 fs-11px lh-14 text-body text-opacity-60">Enhance, modify, and perfect your images with powerful editing tools.</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-xl-3">
							<Card className="p-2">
								<div data-bs-theme="dark">
									<img className="card-img object-fit-cover rounded-0" height="160" src="/assets/img/ai/tools-4.jpg" alt="" />
									<div className="card-img-overlay p-2 d-flex align-items-end bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div>
											<Icon icon="solar:refresh-bold-duotone" className="fs-26px text-body"></Icon>
											<div className="fw-bold text-body fs-13px">Reimagine</div>
											<div className="fw-500 fs-11px lh-14 text-body text-opacity-60">Transform and regenerate images with fresh, AI-powered creativity.</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</Card>
			
			<div id="aiGeneratedContainer" ref={aiContainerRef} className="mb-4 pt-2 d-none">
				<div id="aiGeneratingResult" ref={aiGeneratingRef} className={(isGenerating ? "show" : "d-none") + ' fade'}>
					<h4 className="mb-2">Generating</h4>
					<div className="mb-3 fw-bold d-flex align-items-center">
						<Icon icon="solar:info-circle-bold-duotone" className="fs-4"></Icon>
						<div className="ps-1">
							This is a simulated AI-generated response. Please note that the image was not created by an actual AI model.
						</div>
					</div>
					<div className="row g-3 g-lg-4">
						<div className="col-sm-6 col-lg-3">
							<Card className="p-2">
								<div className="ratio" style={{ "--bs-aspect-ratio": "68.46%" }}>
									<div><div className="shimmer-loader h-100"></div></div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="p-2">
								<div className="ratio" style={{ "--bs-aspect-ratio": "68.46%" }}>
									<div><div className="shimmer-loader h-100"></div></div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="p-2">
								<div className="ratio" style={{ "--bs-aspect-ratio": "68.46%" }}>
									<div><div className="shimmer-loader h-100"></div></div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="p-2">
								<div className="ratio" style={{ "--bs-aspect-ratio": "68.46%" }}>
									<div><div className="shimmer-loader h-100"></div></div>
								</div>
							</Card>
						</div>
					</div>
				</div>
				<div id="aiGeneratedResult" ref={aiGeneratedRef} className={(isGenerated ? "show" : "d-none") + ' fade'}>
					<h4 className="mb-2">AI-Generated Result</h4>
					<div className="mb-3 fw-bold d-flex align-items-center">
						<Icon icon="solar:info-circle-bold-duotone" className="fs-4"></Icon>
						<div className="ps-1">
							This is a simulated AI-generated response. Please note that the image was not created by an actual AI model.
						</div>
					</div>
					<div className="row g-3 g-lg-4">
						<div className="col-sm-6 col-lg-3">
							<Card className="hover-show p-2" data-bs-theme="dark">
								<div>
									<img src="/assets/img/ai/generated-1.jpg" className="card-img rounded-0" alt="" />
									<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div className="h-100 d-flex align-items-end">
											<div className="w-100">
												<div className="text-body text-truncate fs-13px fw-bold">Variant 1</div>
												<div className="d-flex fs-11px fw-500">
													<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
													<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="hover-show p-2" data-bs-theme="dark">
								<div>
									<img src="/assets/img/ai/generated-2.jpg" className="card-img rounded-0" alt="" />
									<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div className="h-100 d-flex align-items-end">
											<div className="w-100">
												<div className="text-body text-truncate fs-13px fw-bold">Variant 2</div>
												<div className="d-flex fs-11px fw-500">
													<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
													<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="hover-show p-2" data-bs-theme="dark">
								<div>
									<img src="/assets/img/ai/generated-3.jpg" className="card-img rounded-0" alt="" />
									<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div className="h-100 d-flex align-items-end">
											<div className="w-100">
												<div className="text-body text-truncate fs-13px fw-bold">Variant 3</div>
												<div className="d-flex fs-11px fw-500">
													<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
													<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
						<div className="col-sm-6 col-lg-3">
							<Card className="hover-show p-2" data-bs-theme="dark">
								<div>
									<img src="/assets/img/ai/generated-4.jpg" className="card-img rounded-0" alt="" />
									<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
										<div className="h-100 d-flex align-items-end">
											<div className="w-100">
												<div className="text-body text-truncate fs-13px fw-bold">Variant 4</div>
												<div className="d-flex fs-11px fw-500">
													<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
													<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
			
			<div className="mb-4 pt-2">
				<h6 className="mb-3">EXPLORE IMAGINE</h6>
				<ul className="nav nav-pills mb-3 d-flex gap-1 fw-bold fs-11px text-uppercase">
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body bg-light" aria-current="page" href="#/">All</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Fantasy</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Art</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Nature</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Popculture</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Futuristic</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Architecture</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Animals</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">People</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Food</a></li>
					<li className="nav-item"><a className="nav-link rounded-5 px-4 py-7px hover-bg-light bg-opacity-50 text-body" href="#/">Horror</a></li>
				</ul>
				<div className="row g-4" data-masonry='{"percentPosition": true }' data-bs-theme="dark">
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-1.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Psychedelic girl illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-2.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Fantasy water character</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-3.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Anime character using virtual reality glasses in the metaverse</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-4.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Fantasy water character</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-5.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Space adventure artwork</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-6.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Futuristic half-robot tiger in nature</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-7.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Psychedelic girl illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-8.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">View of airplane flying through a fantasy world</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-9.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Fantasy style clouds with animal</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-10.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Psychedelic girl illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-11.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Fantasy bird illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-12.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Vibrant colored autumn trees on fiery backdrop generated by AI</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-13.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">View of rhinoceros animal with futuristic robotic parts</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-14.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Robot and human silhouettes</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-15.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Neon hologram of tiger</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-16.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Fantasy house on the moon illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-17.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">People hanging out with robot</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-18.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Off-road car in fantasy scenario</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-19.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Cyberpunk city street at night with neon lights and futuristic aesthetic</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-20.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Cartoon ai robot scene</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-21.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Blockchain technology cartoon illustration</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-22.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Cartoon ai robot scene</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
					<div className="col-sm-6 col-md-3">
						<Card className="hover-show p-2">
							<div>
								<img src="/assets/img/ai/imagine-23.jpg" className="card-img rounded-0" alt="" />
								<div className="card-img-overlay p-2 d-none hover-show-elm h-100 bg-gradient-to-t bg-gradient-from-black bg-gradient-to-transparent">
									<div className="h-100 d-flex align-items-end">
										<div className="w-100">
											<h5 className="card-title mb-0 lh-base text-truncate fs-13px text-body">Cartoon ai robot scene</h5>
											<div className="d-flex fs-11px fw-500">
												<a href="#/" className="text-decoration-none text-body text-opacity-60 me-3"><i className="fa fa-fw fa-pen opacity-75"></i> Edit</a>
												<a href="#/" className="text-decoration-none text-body text-opacity-60"><i className="fa fa-fw fa-repeat opacity-75"></i> Variation</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}

export default AIImageGenerator;