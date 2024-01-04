document.addEventListener("DOMContentLoaded", function () {
	let mute = false;

	const gift = document.querySelector("#preload-svg");
	const click = document.querySelector("#click-svg");
	const muteBtn = document.querySelector(".mute-btn");
	const preload = document.querySelector(".preload");
	const confetti = document.querySelector("#confetti");
	const wishText = document.querySelector(".wish-text");
	const rose = document.querySelector("#rose");

	const happyBirthdayTune = new Audio("./assets/audio/happy-birthday.mp3");
	happyBirthdayTune.loop = true;
	const clickSound = new Audio("./assets/audio/click.mp3");
	const popSound = new Audio("./assets/audio/pop.mp3");

	const preloadAnim = bodymovin.loadAnimation({
		container: gift,
		renderer: "svg",
		loop: false,
		autoplay: false,
		path: "./assets/lottiefiles/gift.json",
	});

	bodymovin.loadAnimation({
		container: click,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: "./assets/lottiefiles/click.json",
	});

	const confettiAnim = bodymovin.loadAnimation({
		container: confetti,
		renderer: "svg",
		loop: false,
		autoplay: false,
		path: "./assets/lottiefiles/confetti.json",
	});

	const birthdayCardAnim = bodymovin.loadAnimation({
		container: document.querySelector("#birthday-card"),
		renderer: "svg",
		loop: false,
		autoplay: false,
		path: "./assets/lottiefiles/birthday-card.json",
	});

	bodymovin.loadAnimation({
		container: rose,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: "./assets/lottiefiles/rose.json",
	});

	let preloadAnimPlayed = false;
	preloadAnim.addEventListener("enterFrame", function () {
		if (preloadAnim.currentFrame >= 180 && !preloadAnimPlayed) {
			popSound.play();
			preloadAnimPlayed = true;
		}
	});

	preloadAnim.addEventListener("complete", function () {
		happyBirthdayTune.play();
		preload.classList.add("fade--out");
	});

	gift.addEventListener("click", function () {
		preloadAnim.play();
		click.classList.add("hidden");
	});

	preload.addEventListener("animationend", function () {
		preload.classList.add("hidden");
		birthdayCardAnim.play();
	});

	let birthdayCardAnimPlayed = false;
	birthdayCardAnim.addEventListener("enterFrame", function () {
		if (birthdayCardAnim.currentFrame >= 180 && !birthdayCardAnimPlayed) {
			confetti.classList.add("show");
			confettiAnim.play();
			popSound.volume = 1;
			popSound.play();
			wishText.classList.add("show");
			birthdayCardAnimPlayed = true;
		}
	});

	muteBtn.addEventListener("click", function () {
		if (mute) {
			clickSound.play();
			playAll();
			muteBtn.classList.remove("active");
		} else {
			clickSound.play();
			muteAll();
			muteBtn.classList.add("active");
		}
		mute = !mute;
	});

	function muteAll() {
		happyBirthdayTune.pause();
	}

	function playAll() {
		happyBirthdayTune.play();
	}

	gsap.registerPlugin(ScrollTrigger);

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".second-sec",
			start: "top center",
			end: "bottom top",
			scrub: false,
			pin: false,
			toggleActions: "play none none none",
		},
	});

	tl.to(".wish-text-2 > span", {
		opacity: 1,
		stagger: 0.3,
		duration: 2,
	}).to(
		".displacement",
		{
			attr: {
				r: 450,
			},
			duration: 1,
		},
		"-=2"
	);
});
