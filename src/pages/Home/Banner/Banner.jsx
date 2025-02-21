import bannerImg from "../../../assets/bannerfortodo.png";
const Banner = () => {
  return (
    <section className="mx-2">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 max-w-7xl mx-auto my-10 rounded-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Effortless Task Management
            </h1>
            <p className="text-lg md:text-xl opacity-90 w-full md:w-11/12">
              Organize your work seamlessly with drag-and-drop functionality.
              Stay productive, stay ahead!
            </p>
            {/* <button className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
              Get Started
            </button> */}
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={bannerImg}
              alt="Task Management"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
