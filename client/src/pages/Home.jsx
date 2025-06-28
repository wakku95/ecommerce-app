import ProductList from "../components/ProductList";

function Home() {
	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
				My Ecommerce Store
			</h1>
			<ProductList />
		</div>
	);
}

export default Home;
