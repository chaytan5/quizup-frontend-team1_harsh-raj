import Sidebar from "../components/Sidebar";
import { Flex } from "../components/styled/Flex.styled";
import { Container } from "../components/styled/Container.styled";
import Searchbar from "../components/Searchbar";
import TestCard from "../components/TestCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, getAllTests } from "../features/exams/examSlice";
import { useEffect } from "react";

function MockTests() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const { tests, isError, isLoading, message } = useSelector(
		(state) => state.exams
	);

	const MockTests = tests.tests;

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getAllTests(id));

		return () => {
			dispatch(reset());
		};
	}, [dispatch, id, isError, message]);

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	return (
		<>
			<Flex>
				<Sidebar />
				<Container>
					<Flex searchbar>
						<h1>Explore tests from {tests.title}</h1>
						<Searchbar />
					</Flex>
					<Flex wrap="true">
						{MockTests ? (
							MockTests.map((test) => <TestCard key={test._id} test={test} />)
						) : (
							<p className="error">
								This exam does not have any tests currently.
							</p>
						)}
					</Flex>
				</Container>
			</Flex>
		</>
	);
}

export default MockTests;
