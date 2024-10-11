"use client";
import { categories } from "@/categories";
import { Button } from "@/components/ui/button";
import { createPrompt, generateQuestion } from "@/lib/ai";
import { string_between_strings } from "@/lib/common";
import { Crown, Frown, RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Home() {
	const [categoriesData, setCategoriesData] = useState(categories);
	const [search, setSearch] = useState("");
	const [hasError, setHasError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [correctAns, setCorrectAns] = useState(false);
	const [result, setResult] = useState(false);
	const [currentCate, setCurrentCate] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [time, setTime] = useState(10);
	const [quizData, setQuizData] = useState({
		question: "",
		options: {
			a: "",
			b: "",
			c: "",
			d: "",
		},
		correctAnswer: "",
		currentQuestion: 1,
		totalCorrectAnswers: 0,
	});

	const searchCategory = () => {
		let searchedCate = categories.filter((cate) => {
			return cate.name.toLowerCase().includes(search.toLowerCase());
		});
		setCategoriesData(searchedCate);
		searchedCate.length == 0 ? setHasError(true) : setHasError(false);
	};

	const startTimer = () => {
		if (time > 0) {
			setTime(time - 1);
		}
	}

  useEffect(() => {
    setTimeout(() => {
      startTimer()
    }, 1000)
  }, [time])

	const createQuiz = async (title: string, currentQuestion: number) => {
    setSelectedOption("");
		setIsLoading(true);
		setCurrentCate(title);
		setIsOpen(true);
		setCorrectAns(false);
		setCurrentQuestion(currentQuestion);
		let res: any = await createQuestion(title);
		let question = string_between_strings("[[", "]]", res);
		let opt1 = string_between_strings("$$", "$$", res);
		let opt2 = string_between_strings("@@", "@@", res);
		let opt3 = string_between_strings("##", "##", res);
		let opt4 = string_between_strings("&&", "&&", res);
		let correctAns = string_between_strings("~~~", "~~~", res);

		setQuizData({
			...quizData,
			question,
			options: { a: opt1, b: opt2, c: opt3, d: opt4 },
			correctAnswer: correctAns,
			currentQuestion: currentQuestion,
		});
		setIsLoading(false);
    setTime(10)
    startTimer();
	};

	const createQuestion = async (title: string) => {
		let prompt: any = await createPrompt(title);
		if (prompt.status) {
			let exactPrompt = string_between_strings(
				"[[",
				"]]",
				prompt.generatedPrompt
			);
			let res = await generateQuestion(exactPrompt);
			if (res.status) {
				return res.question;
			} else {
				toast.error(
					"Question Can't be generated. Something went wrong."
				);
			}
		} else {
			toast.error("Question Can't be generated. Something went wrong.");
		}
	};

	const checkAnswer = (ans: string, option: string) => {
		if (ans == quizData.correctAnswer) {
			setQuizData({
				...quizData,
				totalCorrectAnswers: quizData.totalCorrectAnswers + 1,
			});
			setSelectedOption(option);
			if (quizData.currentQuestion == 10) {
				setResult(true);
			}
		} else {
			document.querySelectorAll(".optionsBox .option").forEach((opt) => {
				if (!opt.classList.contains("correct")) {
					opt.classList.add("wrong");
				}
			});
			setCorrectAns(true);
			if (quizData.currentQuestion == 10) {
				setResult(true);
			}
		}
	};

	return (
		<>
			<div className="quizAppWrapper">
				<div className="bottomOverlay">
					<span></span>
				</div>
				<h4 className="title">Quiz Application</h4>
				<div className="searchWraper">
					<p className="categories">Categories:</p>
					<div className="search-box">
						<button className="btn-search">
							<Search />
						</button>
						<input
							type="text"
							className="input-search"
							placeholder="Type to Search..."
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							onKeyUp={(e) => {
								searchCategory();
							}}
						/>
					</div>
				</div>

				{hasError ? (
					<>
						<div className="notFound mt-8">
							<Frown className="h-[8rem] w-[8rem] text-[#5b4c6b]" />
							<div className="message text-[2rem] font-semibold text-[#5b4c6b]">
								Category Not Found
							</div>
						</div>
					</>
				) : (
					<div className="quizCategories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-8">
						{categoriesData.map((cate, i) => {
							return (
								<>
									<figure
										key={i}
										onClick={() => {
											createQuiz(cate.name, 1);
										}}
									>
										<img
											src={`${cate.imageURL}`}
											alt={`${cate.name}`}
										/>
										<figcaption>
											Category: {cate.name}
										</figcaption>
									</figure>
								</>
							);
						})}
					</div>
				)}

				<div className={`quizDailog ${isOpen ? "block" : "hidden"}`}>
					<header>
						<h5>GenQuiz</h5>
						<div className="rightOptions">
							{/* <Button className="timeLeft sm:w-auto bg-[#ff7676]">
								Time Left{" "}
								<p className="rounded-sm bg-[#6d508e] ml-2 px-1">
									{time}s
								</p>
							</Button> */}
							<Button
								className="bg-[#ff7676] ml-3"
								onClick={() => {
									setIsLoading(true);
									createQuiz(currentCate, currentQuestion);
								}}
							>
								Change Question
							</Button>
						</div>
					</header>
					<main>
						{isLoading ? (
							<>
								<div className="h-[5rem] my-8 animate-pulse bg-purple-200 rounded-2xl"></div>
								<div className="options">
									<div className="h-[3.6rem] mb-6 animate-pulse bg-purple-200 rounded-2xl"></div>
									<div className="h-[3.6rem] mb-6 animate-pulse bg-purple-200 rounded-2xl"></div>
									<div className="h-[3.6rem] mb-6 animate-pulse bg-purple-200 rounded-2xl"></div>
									<div className="h-[3.6rem] mb-6 animate-pulse bg-purple-200 rounded-2xl"></div>
								</div>
							</>
						) : (
							<>
								<h1>
									<b>Question:</b> {quizData.question}
								</h1>

								<div className="optionsBox">
									<div
										className={`option ${
											selectedOption == "a"
												? "correct"
												: ""
										}`}
										onClick={() =>
											checkAnswer(quizData.options.a, "a")
										}
									>
										<b>A)</b>&nbsp; {quizData.options.a}
									</div>
									<div
										className={`option ${
											selectedOption == "b"
												? "correct"
												: ""
										}`}
										onClick={() =>
											checkAnswer(quizData.options.b, "b")
										}
									>
										<b>B)</b>&nbsp; {quizData.options.b}
									</div>
									<div
										className={`option ${
											selectedOption == "c"
												? "correct"
												: ""
										}`}
										onClick={() =>
											checkAnswer(quizData.options.c, "c")
										}
									>
										<b>C)</b>&nbsp; {quizData.options.c}
									</div>
									<div
										className={`option ${
											selectedOption == "d"
												? "correct"
												: ""
										}`}
										onClick={() =>
											checkAnswer(quizData.options.d, "d")
										}
									>
										<b>D)</b>&nbsp; {quizData.options.d}
									</div>
								</div>
								<div
									className={`${
										correctAns ? "block" : "hidden"
									}`}
								>
									<b>Correct Answer: </b>
									{quizData.correctAnswer}
								</div>
							</>
						)}
					</main>
					<footer>
						<div className="left">
							<p>
								<span>{quizData.currentQuestion}</span> out of{" "}
								<span>10</span>
							</p>
						</div>
						<div className="right">
							<Button
								className="mr-3 bg-transparent border-[#6d508e] border-[2px] hover:text-white text-[#6d508e] hover:bg-[#6d508e]"
								onClick={() => {
									setIsOpen(false);
									setQuizData({
										question: "",
										options: {
											a: "",
											b: "",
											c: "",
											d: "",
										},
										correctAnswer: "",
										currentQuestion: 1,
										totalCorrectAnswers: 0,
									});
									setCurrentCate("");
									setIsLoading(true);
									setSelectedOption("");
									setCurrentQuestion(0);
								}}
							>
								Exit Game
							</Button>
							<Button
								disabled={
									isLoading || quizData.currentQuestion == 10
								}
								className="bg-[#ff7676] hover:bg-[#6d508e]"
								onClick={() =>
									createQuiz(currentCate, currentQuestion + 1)
								}
							>
								Continue
							</Button>
						</div>
					</footer>
				</div>

				<div className={`result ${result ? "flex" : "hidden"}`}>
					<Crown className="h-[7rem] w-[7rem] !text-[#ff7676]" />
					<h2 className="text-center">
						<b className="text-[3rem]">Congrats!</b>
						<br /> You have answered {
							quizData.totalCorrectAnswers
						}{" "}
						/ 10 right!
					</h2>
					<Button
						className="mr-3 bg-[#6d508e] text-white"
						onClick={() => {
							setResult(false);
							setIsOpen(false);
							setQuizData({
								question: "",
								options: {
									a: "",
									b: "",
									c: "",
									d: "",
								},
								correctAnswer: "",
								currentQuestion: 1,
								totalCorrectAnswers: 0,
							});
							setCurrentCate("");
							setIsLoading(true);
							setSelectedOption("");
							setCurrentQuestion(0);
						}}
					>
						Play Again{" "}
						<RotateCcw className="h-[1.2rem] ml-2 w-[1.2rem]" />
					</Button>
				</div>
			</div>
		</>
	);
}
