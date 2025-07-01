const WhtWeoffer = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">AI-Powered Idea Generation</h3>
            <p className="text-gray-600">
              Our AI technology is capable of generating unique and relevant business ideas based on a wide range of
              industries, markets, and trends. You can use our AI to generate ideas for your startup, or to explore new
              markets and opportunities.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">AI-Driven Market Research</h3>
            <p className="text-gray-600">
              Our AI technology can help you conduct market research quickly and accurately. You can use our AI to
              analyze large amounts of data, identify trends and patterns, and gain insights into your target market.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhtWeoffer
