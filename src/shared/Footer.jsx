const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <div className="max-w-7xl px-2 mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Task Management App. All Rights
          Reserved.
        </p>
        <p className="mt-2">
          Built with ❤️ using React, Tailwind CSS, and MongoDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
