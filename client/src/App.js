
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Spinner = () => (
	<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
		<div className="spinner-border text-primary" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	</div>
);

function App() {
	const [keyword, setKeyword] = useState('');
	const [results, setResults] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchResults = async (pageNum = 1) => {
		setLoading(true);
		setError('');
		try {
			const res = await axios.get(`/api/results?page=${pageNum}`);
			setResults(res.data.results);
			setTotalPages(res.data.totalPages);
			setPage(res.data.currentPage);
		} catch (err) {
			setError('Failed to fetch results');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchResults();
	}, []);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!keyword.trim()) return;
		setLoading(true);
		setError('');
		try {
			await axios.post('/api/search', { keyword });
			fetchResults(1);
			setKeyword('');
		} catch (err) {
			setError(err.response?.data?.error || 'API error');
		}
		setLoading(false);
	};

		return (
			<div className="bg-light min-vh-100 d-flex flex-column">
				<header className="bg-primary text-white py-3 shadow-sm">
					<div className="container d-flex justify-content-between align-items-center">
						<h1 className="h3 mb-0">🔎 GitHub Repo Search Dashboard</h1>
						<span className="fw-light">Powered by React & MongoDB</span>
					</div>
				</header>

				<main className="container flex-grow-1 py-4">
					<form onSubmit={handleSearch} className="mb-4">
						<div className="input-group input-group-lg">
							<input
								type="text"
								className="form-control border-primary"
								placeholder="Enter keyword..."
								value={keyword}
								onChange={e => setKeyword(e.target.value)}
								style={{ borderRight: 0 }}
							/>
							<button className="btn btn-primary px-4" type="submit" disabled={loading}>
								Search
							</button>
						</div>
					</form>

					{error && (
						<div className="alert alert-danger shadow-sm text-center fw-bold">
							{error}
						</div>
					)}

					{loading ? (
						<Spinner />
					) : (
						<div>
							{results.length === 0 ? (
								<div className="text-center text-muted py-5">
									<img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No results" style={{width:60,opacity:0.5}} />
									<div className="mt-3">No results found. Try a different keyword!</div>
								</div>
							) : (
								<div className="row g-4">
									{results.map((result, idx) => (
										<div key={result._id || idx} className="col-md-6 col-lg-4">
											<div className="card h-100 shadow-sm border-0 repo-card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
												<div className="card-header bg-white border-bottom">
													<strong className="text-primary">Keyword:</strong> {result.keyword}
												</div>
												<ul className="list-group list-group-flush">
													{result.items.map((repo, i) => (
														<li key={repo.html_url} className="list-group-item">
															<a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="fw-bold text-decoration-none text-dark">
																{repo.name}
															</a>
															<span className="ms-2 text-warning">⭐ {repo.stargazers_count}</span>
															<div className="text-muted small mt-1">{repo.description}</div>
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							)}
							{totalPages > 1 && (
								<nav className="d-flex justify-content-center mt-4">
									<ul className="pagination pagination-lg">
										{[...Array(totalPages)].map((_, i) => (
											<li key={i} className={`page-item${page === i + 1 ? ' active' : ''}`}>
												<button className="page-link" onClick={() => fetchResults(i + 1)}>{i + 1}</button>
											</li>
										))}
									</ul>
								</nav>
							)}
						</div>
					)}
				</main>

				<footer className="bg-white border-top py-3 mt-auto shadow-sm">
					<div className="container text-center text-muted">
						&copy; {new Date().getFullYear()} GitHub Repo Search | Made with <span style={{color:'#e25555'}}>♥</span> by Vishw
					</div>
				</footer>

				<style>{`
					.repo-card:hover {
						transform: translateY(-4px) scale(1.02);
						box-shadow: 0 8px 24px rgba(0,0,0,0.08);
					}
				`}</style>
			</div>
		);
}

export default App;
